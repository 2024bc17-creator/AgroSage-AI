import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from datetime import datetime, timedelta
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from PIL import Image
import numpy as np
import mysql.connector
from flask_cors import CORS
from google import genai
import os
import json
import joblib
load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
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
    email = request.form["email"]
    
    from PIL import Image
    img = Image.open(file.stream).convert("RGB")
    img = img.resize((224, 224))

    img_array = image.img_to_array(img)
    img_array = img_array / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)

    predicted_class = class_names[np.argmax(prediction)]
    confidence = float(np.max(prediction) * 100)
        
    cursor.execute(
        "SELECT phone FROM users WHERE email=%s",
        (email,)
    )

    user = cursor.fetchone()

    print(user)
    phone = user[0]
    first_time = datetime.now()
    second_time = first_time + timedelta(minutes=10)
    third_time = first_time + timedelta(minutes=20)
    fourth_time = first_time + timedelta(minutes=30)
    fith_time = first_time + timedelta(minutes=40)
    cursor.execute(
        """
        INSERT INTO notifications
        (user_email, phone, disease, message, send_time)
        VALUES (%s, %s, %s, %s, %s)
        """,
        (
    email,
    phone,
    predicted_class,
    "Disease detected successfully.",
    first_time
      )
    )
    cursor.execute(
    """
    INSERT INTO notifications
    (user_email, phone, disease, message, send_time)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (
        email,
        phone,
        predicted_class,
        "Reminder: Please start the treatment for your crop.",
        second_time
    )
)
    cursor.execute(
    """
    INSERT INTO notifications
    (user_email, phone, disease, message, send_time)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (
        email,
        phone,
        predicted_class,
        "Reminder: Check your crop condition.",
        third_time
    )
)
    cursor.execute(
    """
    INSERT INTO notifications
    (user_email, phone, disease, message, send_time)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (
        email,
        phone,
        predicted_class,
        "Reminder: Apply the recommended fertilizer if needed.",
        fourth_time
    )
)
    cursor.execute(
    """
    INSERT INTO notifications
    (user_email, phone, disease, message, send_time)
    VALUES (%s, %s, %s, %s, %s)
    """,
    (
        email,
        phone,
        predicted_class,
        "Final reminder: Continue monitoring your crop and follow the treatment advice.",
        fith_time
    )
)

    db.commit()

    return jsonify({
        "disease": predicted_class,
        "confidence": round(confidence, 2)
    })
@app.route("/ask-ai", methods=["POST"])
@app.route("/ask-ai", methods=["POST"])
def ask_ai():

    data = request.json
    question = data["question"]

    try:
        response = client.models.generate_content(
            model="gemini-2.5-flash",
            contents=question
        )

        return jsonify({
            "answer": response.text
        })

    except Exception as e:
        print("Gemini Error:", e)

        return jsonify({
            "answer": str(e)
        }), 500
@app.route("/signup", methods=["POST"])
def signup():

    data = request.json

    name = data["name"]
    email = data["email"]
    phone = data["phone"]
    address = data["address"]
    crop_type = data["cropType"]
    password = data["password"]

    cursor.execute(
        "SELECT * FROM users WHERE email=%s",
        (email,)
    )

    existing_user = cursor.fetchone()

    if existing_user:
        return jsonify({
            "message": "Email already exists"
        }), 400

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
@app.route("/add-disease", methods=["POST"])
def add_disease():
    data = request.json

    sql = """
    INSERT INTO diseases
    (name, crop, image, definition, treatment,
     prevention, severity, yield_loss)
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    """

    values = (
        data["name"],
        data["crop"],
        data["image"],
        data["definition"],
        data["treatment"],
        data["prevention"],
        data["severity"],
        data["yield_loss"]
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Disease Added Successfully"
    })
@app.route("/diseases", methods=["GET"])
def get_diseases():
    cursor.execute("SELECT * FROM diseases")
    rows = cursor.fetchall()

    diseases = []

    for row in rows:
        diseases.append({
            "id": row[0],
            "name": row[1],
            "crop": row[2],
            "image": row[3],
            "definition": row[4],
            "treatment": row[5],
            "prevention": row[6],
            "severity": row[7],
            "yield_loss": row[8]
        })

    return jsonify(diseases)

@app.route("/market-prices", methods=["GET"])
def market_prices():

    cursor.execute("""
        SELECT crop, price, image
        FROM market_prices
    """)

    rows = cursor.fetchall()

    prices = []

    for row in rows:
        prices.append({
            "crop": row[0],
            "price": row[1],
            "image": row[2]
        })

    return jsonify(prices)

@app.route("/add-market-price", methods=["POST"])
def add_market_price():

    data = request.json

    sql = """
    INSERT INTO market_prices
    (crop, price, image)
    VALUES (%s,%s,%s)
    """

    values = (
        data["crop"],
        data["price"],
        data["image"]
    )

    cursor.execute(sql, values)
    db.commit()

    return jsonify({
        "message": "Market Price Added Successfully"
    })
@app.route("/add-fertilizer", methods=["POST"])
def add_fertilizer():

    data = request.json

    cursor.execute("""
        INSERT INTO fertilizers
        (
            name,
            name_tamil,
            description,
            description_tamil,
            crop,
            crop_tamil,
            usage_info,
            usage_info_tamil,
            precautions,
            precautions_tamil,
            image
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """,
    (
        data["name"],
        data["name_tamil"],
        data["description"],
        data["description_tamil"],
        data["crop"],
        data["crop_tamil"],
        data["usage_info"],
        data["usage_info_tamil"],
        data["precautions"],
        data["precautions_tamil"],
        data["image"]
    ))

    db.commit()

    return jsonify({
        "message": "Fertilizer Added Successfully"
    })

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)