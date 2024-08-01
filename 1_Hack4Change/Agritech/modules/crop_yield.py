import pandas as pd
from sklearn.linear_model import LinearRegression
import joblib

# Example training script for Crop Yield Prediction
def train_crop_yield_model():
    # Load dataset
    data = pd.read_csv('data/crop_yield.csv')
    data = data.dropna()
    X = data[['Rain Fall (mm)', 'Fertilizer', 'Temperatue']]  # Example features
    y = data['Yield (Q/acre)']

    
    # Train model
    model = LinearRegression()
    model.fit(X, y)
    print(model.predict(X))
    
    
    # Save model
    joblib.dump(model, 'models/crop_yield_model.pkl')

def predict_crop_yield(features):
    model = joblib.load('models/crop_yield_model.pkl')
    return model.predict([features])

train_crop_yield_model()