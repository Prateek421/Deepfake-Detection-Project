# DeepFake Detection using ResNet50

## Overview
This project is a deepfake detection system built using ResNet50, a powerful deep learning model for image classification. The system is integrated with a Flask backend and a React-based frontend to provide a seamless user experience.

This project was developed during my third year (5th semester) as a deep dive into AI model development and web technologies. The goal was to train a model to detect deepfake images and deploy it as a functional web application.

## Features
- **Deep Learning Model**: Uses ResNet50 for deepfake detection.
- **Flask Backend**: Handles model inference and API requests.
- **React Frontend**: Provides an interactive UI for users.

## Installation and Setup

### **1️⃣ Set Up the Backend**
#### Install Python Virtual Environment:
```sh
cd backend
conda create -p venv python==3.12
conda activate ./venv
```
#### Install Dependencies:
```sh
pip install -r requirements.txt
```
#### Run the Backend:
```sh
python app.py
```

### **2️⃣ Set Up the Frontend**
#### Install Node Modules:
```sh
cd frontend
npm install
```
#### Run the Frontend:
```sh
npm start
```

## Conclusion
This project was an incredible learning experience, covering deep learning, backend development with Flask, frontend development with React, and deploying AI models in production. Future improvements could involve enhancing model accuracy, optimizing performance, and integrating additional features for real-world applications.

