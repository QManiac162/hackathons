import pandas as pd
from sklearn.svm import SVC
import joblib

def train_crop_health_model():
    data = pd.read_csv('data/crop_health.csv')
    X = data[['temperature', 'humidity', 'ph']]
    y = data['label']
    
    model = SVC()
    model.fit(X, y)
    print(model.predict(X))

    joblib.dump(model, 'models/crop_health_model.pkl')

def predict_crop_health(features):
    model = joblib.load('models/crop_health_model.pkl')
    return model.predict([features])

train_crop_health_model()