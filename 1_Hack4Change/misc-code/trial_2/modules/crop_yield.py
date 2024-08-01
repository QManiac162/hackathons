import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Example training script for Crop Yield Prediction
def train_crop_yield_model():
    # Load dataset
    data = pd.read_csv('data/crop_yield.csv')
    X = data[['feature1', 'feature2', 'feature3']]  # Example features
    y = data['yield']
    
    # Train model
    model = LinearRegression()
    model.fit(X, y)
    
    # Save model
    joblib.dump(model, 'models/crop_yield_model.pkl')

def predict_crop_yield(features):
    model = joblib.load('models/crop_yield_model.pkl')
    return model.predict([features])
