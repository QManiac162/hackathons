import pandas as pd
from sklearn.ensemble import RandomForestRegressor
import joblib

def train_iot_model():
    data = pd.read_csv('data/farm_monitoring.csv')
    X = data[['soil_moisture', 'temperature', 'humidity']]
    y = data['crop_health_index']
    
    model = RandomForestRegressor()
    model.fit(X, y)
    
    joblib.dump(model, 'models/iot_model.pkl')

def predict_iot(features):
    model = joblib.load('models/iot_model.pkl')
    return model.predict([features])
