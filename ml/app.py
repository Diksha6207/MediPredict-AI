from flask import Flask, request, jsonify
from flask_cors import CORS
from predict import predict_disease

app = Flask(__name__)
CORS(app)

# --------------------------------
# Home Route
# --------------------------------

@app.route("/")
def home():
    return jsonify({
        "success": True,
        "message": "MediPredict ML API Running"
    })

# --------------------------------
# Prediction Route
# --------------------------------

@app.route("/predict", methods=["POST"])
def predict():

    data = request.get_json()

    symptoms = data.get("symptoms", [])

    if len(symptoms) == 0:
        return jsonify({
            "success": False,
            "message": "No symptoms provided."
        }), 400

    result = predict_disease(symptoms)

    return jsonify({
        "success": True,
        "prediction": result
    })

# --------------------------------

if __name__ == "__main__":
    app.run(
    host="0.0.0.0",
    port=8000,
    debug=False
)