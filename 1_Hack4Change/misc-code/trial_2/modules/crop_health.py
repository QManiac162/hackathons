import pandas as pd
from sklearn.svm import SVC
import joblib

def train_crop_health_model():
    data = pd.read_csv('data/crop_health.csv')
    X = data[['feature1', 'feature2', 'feature3']]
    y = data['health_status']
    
    model = SVC()
    model.fit(X, y)
    
    joblib.dump(model, 'models/crop_health_model.pkl')

def predict_crop_health(features):
    model = joblib.load('models/crop_health_model.pkl')
    return model.predict([features])
