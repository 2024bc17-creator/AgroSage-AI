import os
from dotenv import load_dotenv
import google.generativeai as genai
from flask import Flask, request, jsonify
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import mysql.connector
from flask_cors import CORS
import json
import joblib
load_dotenv()

genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
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
crop_model = joblib.load(
    "/home/ubuntu/my-react-app/crop_recommendation_model.pkl"
)

with open("/home/ubuntu/my-react-app/class_names.json", "r") as f:
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
    img = Image.open(file.stream).convert("RGB")
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


@app.route("/login", methods=["POST"])
def login():
    data = request.json

    email = data["email"]
    password = data["password"]

    cursor.execute(
        "SELECT * FROM users WHERE email=%s AND password=%s",
        (email, password)
    )

    user = cursor.fetchone()

    if user:
        cursor.execute(
            "UPDATE users SET last_login = NOW() WHERE email=%s",
            (email,)
        )
        db.commit()

        return jsonify({
            "message": "Login Successful"
        })
    else:
       return jsonify({
        "message": "Invalid Email or Password"
    }), 401


@app.route("/admin/users", methods=["GET"])
def admin_users():

    cursor.execute("""
        SELECT
        id,
        name,
        email,
        phone,
        address,
        crop_type,
        created_at,
        last_login
        FROM users
    """)

    users = cursor.fetchall()

    return jsonify(users)
    
@app.route("/admin/login", methods=["POST"])
def admin_login():

    data = request.json

    username = data["username"]
    password = data["password"]

    cursor.execute(
        "SELECT * FROM admins WHERE username=%s AND password=%s",
        (username, password)
    )

    admin = cursor.fetchone()

    if admin:
        return jsonify({
            "message": "Admin Login Successful"
        })
    else:
        return jsonify({
            "message": "Invalid Admin Credentials"
        }), 401
       
        
@app.route("/ask-ai", methods=["POST"])
def ask_ai():


    data = request.json
    question = data["question"]

    model_ai = genai.GenerativeModel("gemini-2.5-flash")

    response = model_ai.generate_content(
        f"You are an agriculture expert. Answer this farming question clearly: {question}"
    )

    return jsonify({
        "answer": response.text
    })
@app.route("/crop-recommend", methods=["POST"])
def crop_recommend():

    data = request.json

    N = data["N"]
    P = data["P"]
    K = data["K"]
    temperature = data["temperature"]
    humidity = data["humidity"]
    ph = data["ph"]
    rainfall = data["rainfall"]

    prediction = crop_model.predict([[
        N,
        P,
        K,
        temperature,
        humidity,
        ph,
        rainfall
    ]])

    return jsonify({
        "recommended_crop": prediction[0]
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)