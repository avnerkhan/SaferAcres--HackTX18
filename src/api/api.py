
from flask import Flask, request, abort, jsonify
from flask_cors import CORS
from azure_db import SQLDatabase

app = Flask(__name__)
CORS(app)

azureDB = SQLDatabase()

allcrimes = azureDB.query_all_crimes()
recentcrimes = azureDB.query_recent_crimes()
westcampuscrimes = azureDB.query_westcampus_crimes()

@app.route("/")
def init():
    return "Home page"

@app.route("/allcrimes")
def all_crimes():
    print("COUNT ALL CRIMES: ", len(allcrimes))
    return jsonify(allcrimes)

@app.route("/recentcrimes")
def most_recent_crimes():
    print("COUNT RECENT CRIMES: ", len(recentcrimes))
    return jsonify(recentcrimes)

@app.route("/westcampuscrimes")
def west_campus_crimes():
    print("COUNT WESTCAMPUS CRIMES: ", len(westcampuscrimes))
    return jsonify(westcampuscrimes)


def predicted_crimes():
    pass


if __name__ == "__main__":
    app.run(host = "0.0.0.0", debug=False)
