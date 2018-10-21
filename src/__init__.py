import requests, json
from functools import wraps
from flask import Flask, render_template, request, url_for, redirect, session, jsonify, abort
# from api.crimes_api import crimes_api
from api.azure_db import SQLDatabase
from flask_cors import CORS

azureDB = SQLDatabase()

allcrimes = azureDB.query_all_crimes()
recentcrimes = azureDB.query_recent_crimes()
westcampuscrimes = azureDB.query_westcampus_crimes()
predicted_alc_crimes = azureDB.query_predicted_alc_crimes()

app = Flask(__name__)
CORS(app)

# app.register_blueprint(crimes_api)

@app.route("/")
def index_page():
    return redirect(url_for('login_page'))

@app.route('/login/', methods=['GET', 'POST'])
def login_page():
    return redirect(url_for('home_page'))

@app.route('/home')
def home_page():
    return render_template('home.html')

@app.route('/map')
def map_page():
    return render_template('map.html')

@app.route('/today')
def today_page():
    return render_template('today.html')

@app.route("/allcrimes")
def all_crimes():
    print("COUNT ALL CRIMES: ", len(allcrimes))
    return jsonify(allcrimes)

@app.route("/recentcrimes")
def most_recent_crimes():
    print("COUNT RECENT CRIMES: ", len(recentcrimes))
    return jsonify(recentcrimes)

@app.route("/westcampuscrimes", methods=["GET"])
def west_campus_crimes():
    print("COUNT WESTCAMPUS CRIMES: ", len(westcampuscrimes))
    return jsonify(westcampuscrimes)

@app.route("/predictalccrimes")
def predict_alc_crimes():
    print("COUNT PREDICTED CRIMES: ", len(predicted_alc_crimes))
    return jsonify(predicted_alc_crimes)

# @app.route("/sentimentapi")
# def sentiment_api():
#     text = request.get_json().get("text")
#     apm_key = "c241970bc9844ce88b6c61eb909ec335"
#     url = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment"
#
#     headers = {
#     "Ocp-Apim-Subscription-Key": apm_key
#     }
#     data = {
#         "documents": [
#         {
#           "language": "en",
#           "id": "1",
#           "text": text
#         }
#       ]
#     }
#     response = requests.post(url, data = data, headers = headers)
#     return jsonify(response)

@app.errorhandler(404)
def not_found_page(e):
    return '404: page not found'

@app.errorhandler(405)
def method_not_allowed_page(e):
    return '405: method not allowed'
