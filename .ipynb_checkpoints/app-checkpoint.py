from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import mysql.connector
from flask_cors import CORS
import json
app = Flask(__name__)
CORS(app)
db = mysql.connector.connect(
    host="localhost",
    user="cropuser",
    password="crop123",
    database="cropdb"
)

cursor = db.cursor()

model = load_model("/home/ubuntu/crop_disease_model.keras")

with open("/home/ubuntu/class_names.json", "r") as f:
    class_names = json.load(f)

@app.route("/")
def home():
    return "Crop Disease Detection API Running"

@app.route("/predict", methods=["POST"])
def predict():

    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"})

    file = request.files["file"]

    from PIL import Image

    img = Image.open(file.stream)
    img = img.resize((224, 224))

    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction) * 100)

    return jsonify({
        "disease": predicted_class,
        "confidence": round(confidence, 2)
    })

@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    address = data["address"]
    crop_type = data["cropType"]
    password = data["password"]

    sql = """
    INSERT INTO users
    (name,email,phone,address,crop_type,password)
    VALUES (%s,%s,%s,%s,%s,%s)
    """

    values = (
        name,
        email,
        phone,
        address,
        crop_type,
        password
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "User Registered Successfully"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)