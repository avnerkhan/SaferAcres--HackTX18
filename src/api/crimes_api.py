from flask import Blueprint, Flask, request, abort, jsonify
from flask_cors import CORS
from api.azure_db import SQLDatabase

# app = Flask(__name__)
CORS(app)

azureDB = SQLDatabase()

allcrimes = azureDB.query_all_crimes()
recentcrimes = azureDB.query_recent_crimes()
westcampuscrimes = azureDB.query_westcampus_crimes()
predicted_alc_crimes = azureDB.query_predicted_alc_crimes()

crimes_api = Blueprint('crimes_api', __name__)

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


if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug=False)
