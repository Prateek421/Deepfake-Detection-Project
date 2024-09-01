import os
from flask_cors import CORS
from flask import Flask, request, render_template, redirect, url_for, jsonify
from werkzeug.utils import secure_filename
from deepfake_detection import detect_deepfake

app = Flask(__name__)

CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:3000"}})

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect_deepfake', methods=['POST'])
def detect_deepfake_route():
    if 'video' not in request.files:
        return jsonify({"error": "No file part"}), 400
    file = request.files['video']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    if file:
        filename = secure_filename(file.filename)
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(video_path)
        
        # Call the deepfake detection function
        result = detect_deepfake(video_path)
        
        print(f'Deepfake Detection Result: {result}')  # Debugging output
        # Return "real" or "fake" based on detection result
        if result.lower() == "fake":
            return jsonify({"result": "fake"})
        else:
            return jsonify({"result": "real"})
    
    return redirect(url_for('index'))

if __name__ == '__main__':
    app.run(debug=True)
