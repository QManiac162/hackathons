import pandas as pd
from sklearn.linear_model import LogisticRegression
import joblib

def train_insurance_model():
    data = pd.read_csv('data/insurance.csv')
    X = data[['temperature', 'rainfall', 'humidity']]
    y = data['payout']
    
    model = LogisticRegression()
    model.fit(X, y)
    
    joblib.dump(model, 'models/insurance_model.pkl')

def predict_insurance_payout(features):
    model = joblib.load('models/insurance_model.pkl')
    return model.predict([features])
