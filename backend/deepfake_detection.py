import os
import cv2
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array

# Load the trained deepfake detection model
model_path = './deepfake_resnet50_model.h5'

if not os.path.exists(model_path):
    print("Error: Model file not found!")
    exit(1)  # Stop execution if model is missing

model = load_model(model_path)

def preprocess_frame(frame, img_size=(224, 224)):
    """Resize, normalize, and preprocess a frame to match the model's input requirements."""
    frame = cv2.resize(frame, img_size)
    frame = img_to_array(frame) / 255.0  # Normalize to [0, 1]
    frame = np.expand_dims(frame, axis=0)  # Add batch dimension
    return frame

def detect_deepfake(video_path, frame_rate=30):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    predictions = []
    
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break
        
        if frame_count % frame_rate == 0:  # Process one frame per second
            preprocessed_frame = preprocess_frame(frame)
            
            # Predict using the model
            prediction = model.predict(preprocessed_frame)
            print("Model output:", prediction)  # Debugging
            
            # Check if prediction output is valid
            if prediction.shape == (1, 1):
                prediction_value = float(prediction[0][0])  # Extract value safely
                predictions.append(prediction_value)
            else:
                print("Warning: Unexpected model output shape", prediction.shape)

        frame_count += 1

    cap.release()
    
    # Check if any frames were processed
    if not predictions:
        return "Error: No frames were processed"
    
    # Aggregate predictions to determine if the video is fake or real
    avg_prediction = np.mean(predictions)
    result = 'Fake' if avg_prediction >= 0.5 else 'Real'
    
    return result