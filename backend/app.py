import os
from flask_cors import CORS
from flask import Flask, request, render_template, jsonify
from werkzeug.utils import secure_filename
from deepfake_detection import detect_deepfake

app = Flask(__name__, static_folder='../frontend/src', template_folder='../frontend/public')
CORS(app, resources={r"/*": {"origins": "*"}})  # Allow all origins

UPLOAD_FOLDER = 'uploads/'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Ensure the upload folder exists
os.makedirs(UPLOAD_FOLDER, exist_ok=True)
@app.route('/')
def index():
    return render_template('index.html')

@app.route('/detect_deepfake', methods=['POST'])
def detect_deepfake_route():
    if 'video' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['video']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file:
        filename = secure_filename(file.filename)
        video_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(video_path)

        # Call deepfake detection
        result = detect_deepfake(video_path)

        print(f'Deepfake Detection Result: {result}')  # Debugging Output

        return jsonify({"result": result})  # No `lower()`, since `result` is already correct

    return jsonify({"error": "Unknown error occurred"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)