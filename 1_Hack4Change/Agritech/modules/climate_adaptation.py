import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import joblib

def train_climate_adaptation_model():
    data = pd.read_csv('data/climate_adaptation.csv')
    X = data[[' ANNUAL RAINFALL']]
    y = data['FLOODS']
    
    model = DecisionTreeClassifier()
    model.fit(X, y)
    print(model.predict(X))
    
    joblib.dump(model, 'models/climate_adaptation_model.pkl')

def predict_climate_action(features):
    model = joblib.load('models/climate_adaptation_model.pkl')
    return model.predict([features])


train_climate_adaptation_model()