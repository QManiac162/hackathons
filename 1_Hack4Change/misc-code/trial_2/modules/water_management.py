import pandas as pd
from sklearn.neighbors import KNeighborsRegressor
import joblib

def train_water_model():
    data = pd.read_csv('data/water_usage.csv')
    X = data[['soil_moisture', 'temperature', 'humidity']]
    y = data['water_needed']
    
    model = KNeighborsRegressor(n_neighbors=5)
    model.fit(X, y)
    
    joblib.dump(model, 'models/water_model.pkl')

def predict_water_usage(features):
    model = joblib.load('models/water_model.pkl')
    return model.predict([features])
