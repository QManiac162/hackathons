from flask import Flask, render_template, request, jsonify
from flask_oauthlib.client import OAuth
import pandas as pd
import joblib

app = Flask(__name__)
app.secret_key = 'your_secret_key'
oauth = OAuth(app)

google = oauth.remote_app(
    'google',
    consumer_key='YOUR_GOOGLE_CLIENT_ID',
    consumer_secret='YOUR_GOOGLE_CLIENT_SECRET',
    request_token_params={
        'scope': 'email',
    },
    base_url='https://www.googleapis.com/oauth2/v1/',
    request_token_url=None,
    access_token_method='POST',
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login():
    return google.authorize(callback=url_for('authorized', _external=True))

@app.route('/logout')
def logout():
    session.pop('google_token')
    return redirect(url_for('index'))

@app.route('/login/authorized')
def authorized():
    response = google.authorized_response()
    if response is None or response.get('access_token') is None:
        return 'Access denied: reason={} error={}'.format(
            request.args['error_reason'],
            request.args['error_description']
        )
    session['google_token'] = (response['access_token'], '')
    user_info = google.get('userinfo')
    return render_template('dashboard.html', user=user_info.data)

@google.tokengetter
def get_google_oauth_token():
    return session.get('google_token')

@app.route('/scenario/<int:id>')
def scenario(id):
    return render_template(f'scenario_{id}.html')

@app.route('/api/crop_yield', methods=['POST'])
def api_crop_yield():
    features = request.json['features']
    model = joblib.load('models/crop_yield_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

@app.route('/api/iot_monitoring', methods=['POST'])
def api_iot_monitoring():
    features = request.json['features']
    model = joblib.load('models/iot_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

@app.route('/api/water_management', methods=['POST'])
def api_water_management():
    features = request.json['features']
    model = joblib.load('models/water_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

@app.route('/api/crop_health', methods=['POST'])
def api_crop_health():
    features = request.json['features']
    model = joblib.load('models/crop_health_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

@app.route('/api/climate_adaptation', methods=['POST'])
def api_climate_adaptation():
    features = request.json['features']
    model = joblib.load('models/climate_adaptation_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

@app.route('/api/insurance', methods=['POST'])
def api_insurance():
    features = request.json['features']
    model = joblib.load('models/insurance_model.pkl')
    prediction = model.predict([features])
    return jsonify({'prediction': prediction.tolist()})

if __name__ == '__main__':
    app.run(debug=True)
