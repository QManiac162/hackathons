import pandas as pd
from sklearn.neighbors import KNeighborsRegressor
import joblib

def train_water_model():
    data = pd.read_csv('data/water_usage.csv')
    X = data[['Soil_Moisture', 'Temperature', 'Humidity']]
    y = data['Water_needed']
    
    model = KNeighborsRegressor(n_neighbors=5)
    model.fit(X, y)
    print(model.predict(X))
    
    joblib.dump(model, 'models/water_model.pkl')

def predict_water_usage(features):
    model = joblib.load('models/water_model.pkl')
    return model.predict([features])

train_water_model()
