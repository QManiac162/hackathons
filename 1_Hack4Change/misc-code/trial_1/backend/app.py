from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import joblib

app = Flask(__name__)
CORS(app)

# Load pre-trained model (example: a simple regression model)
model = tf.keras.models.load_model('models/crop_yield_prediction.h5')
scaler = joblib.load('models/scaler.pkl')

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    scaled_features = scaler.transform(features)
    prediction = model.predict(scaled_features)
    return jsonify({'prediction': prediction[0][0]})

@app.route('/health', methods=['GET'])
def health_check():
    return "Server is running", 200

if __name__ == '__main__':
    app.run(debug=True)
