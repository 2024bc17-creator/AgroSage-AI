import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";

export default function App() {
  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [users, setUsers] = useState([]);
    
  const [diseaseName, setDiseaseName] = useState("");
  const [cropName, setCropName] = useState("");
  const [diseaseImage, setDiseaseImage] = useState("");
  const [definition, setDefinition] = useState("");
  const [treatment, setTreatment] = useState("");
  const [prevention, setPrevention] = useState("");
  const [severity, setSeverity] = useState("");
  const [yieldLoss, setYieldLoss] = useState("");
  const [marketCrop, setMarketCrop] = useState("");
  const [marketPrice, setMarketPrice] = useState("");
  const [marketImage, setMarketImage] = useState("");

  // APP
  const [page, setPage] = useState("home");
  const [language, setLanguage] = useState("en");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageBase64, setImageBase64] = useState("");
  const [prediction, setPrediction] = useState(null);
    
  // AI CHAT
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  // LOGIN FORM
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  // NEW STATES
  const [address, setAddress] = useState("");
  const [cropType, setCropType] = useState("");

  // MARKET API STATE
  const [marketPrices, setMarketPrices] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  // WEATHER STATE  
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [N, setN] = useState("");
  const [P, setP] = useState("");
  const [K, setK] = useState("");
  const [ph, setPh] = useState("");
  const [rainfall, setRainfall] = useState("");
  const [recommendedCrop, setRecommendedCrop] = useState("");
  // SLIDER IMAGES
  const sliderImages = [
    "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg",
    "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg",
    "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [sliderImages.length]);

  useEffect(() => {
  axios
    .get("http://16.16.75.9:5000/diseases")
    .then((response) => {
      setDiseases(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
}, []);

  // MARKET PRICE MOCK API
  // MARKET PRICE API
useEffect(() => {
  if (page === "market") {
    setIsLoadingPrices(true);

    axios
      .get("http://16.16.75.9:5000/market-prices")
      .then((response) => {
        setMarketPrices(response.data);
        setIsLoadingPrices(false);
      })
      .catch((error) => {
        console.error(error);
        setIsLoadingPrices(false);
      });
  }
}, [page]);
    
    useEffect(() => {
  if (isAdmin) {
    axios
      .get("http://16.16.75.9:5000/admin/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }
}, [isAdmin]);
         
  // AI ANSWER
  const handleAskAI = () => {
    if (question.toLowerCase().includes("rice")) {
      setAiAnswer("🌾 Rice crops require good water supply and fungal protection.");
    } else if (question.toLowerCase().includes("tomato")) {
      setAiAnswer("🍅 Tomato crops grow better in warm weather and need disease monitoring.");
    } else if (question.toLowerCase().includes("fertilizer")) {
      setAiAnswer("🌱 Organic compost and nitrogen fertilizers improve crop growth.");
    } else {
      setAiAnswer("🤖 AgroSage AI Suggestion: Monitor crops regularly and maintain healthy soil.");
    }
  };

  // 20 DISEASE DATA ENTRIES
  const diseaseData = [
    { name: "Rice Blast", crop: "Rice", image: "/Diseases/Rice-Blast.png", definition: "A highly destructive fungal disease causing lesions on leaves and stems.", region: "Humid and wet regions", treatment: [
    "Apply Tricyclazole fungicide",
    "Avoid excess nitrogen fertilizer",
    "Improve field drainage"
  ]},
    { name: "Leaf Spot", crop: "Rice / Wheat", image: "/Diseases/leaf-spot.jpg", definition: "Causes brown or black spots on leaves, stunting plant growth and yield.", region: "Global, common in damp conditions", treatment: [
    "Remove infected plants",
    "Use disease-resistant varieties",
    "Improve soil drainage"
  ] },
    { name: "Tomato Wilt", crop: "Tomato", image: "/Diseases/Tomato-Wilt.jpg", definition: "Soil-borne pathogens block water vessels, causing sudden drying of the plant.", region: "Warm, tropical climates", treatment: [
    "Remove infected ears",
    "Rotate crops",
    "Use certified seeds"
  ] },
    { name: "Corn Smut", crop: "Corn", image: "/Diseases/Corn-Smut.jpg", definition: "Fungal disease creating large, grayish galls on the ears of the corn.", region: "Dry, hot agricultural zones", treatment: [
    "Remove infected ears",
    "Rotate crops",
    "Use certified seeds"
  ] },
    { name: "Wheat Rust", crop: "Wheat", image: "/Diseases/Wheat-Rust.jpg", definition: "Appears as rust-colored powdery pustules on the stems and leaves.", region: "Temperate farming belts",  treatment: [
    "Apply fungicides early",
    "Plant resistant varieties",
    "Remove infected plant debris"
  ] },
    { name: "Powdery Mildew", crop: "Grapes / Apples", image: "/Diseases/Powdery-Mildew.jpg", definition: "Forms a white powdery fungal growth on the surface of leaves.", region: "High humidity areas", treatment: [
    "Apply sulfur fungicide",
    "Improve air circulation",
    "Avoid overhead watering"
  ] },
    { name: "Downy Mildew", crop: "Cucumbers", image: "/Diseases/downy-mildew.webp", definition: "Creates yellow angular spots on upper leaves and gray fuzz underneath.", region: "Cool, moist environments", treatment: [
    "Use copper fungicide",
    "Remove infected leaves",
    "Improve drainage"] },
    { name: "Early Blight", crop: "Potato / Tomato", image: "/Diseases/Early-Blight.jpg", definition: "Causes dark, concentric rings on older foliage, reducing crop lifespan.", region: "Sub-tropical regions", treatment: [
    "Apply fungicides",
    "Rotate crops",
    "Remove infected leaves"
  ] },
    { name: "Late Blight", crop: "Potato", image: "/Diseases/Late-Blight.jpg", definition: "Notorious for the Irish Potato Famine, rots foliage and tubers rapidly.", region: "Cool, wet areas", treatment: [
    "Destroy infected plants",
    "Apply protective fungicides",
    "Avoid excess moisture"
  ] },
    { name: "Citrus Canker", crop: "Citrus Fruits", image: "/Diseases/Citrus-Canker.jpg", definition: "Bacterial disease causing raised, corky lesions on fruit and leaves.", region: "Tropical and subtropical zones", treatment: [
    "Prune infected branches",
    "Apply copper sprays",
    "Use disease-free seedlings"
  ] },
    { name: "Apple Scab", crop: "Apple", image: "/Diseases/Apple-Scab.jpg", definition: "Fungal disease leaving dark, scabby lesions on the fruit surface.", region: "Regions with rainy springs", treatment: [
    "Apply fungicides",
    "Remove fallen leaves",
    "Plant resistant varieties"
  ] },
    { name: "Root Rot", crop: "Various", image: "/Diseases/Root-Rot.jpg", definition: "Caused by poor drainage, attacking the root system and killing the plant.", region: "Waterlogged soils globally",  treatment: [
    "Improve soil drainage",
    "Avoid overwatering",
    "Remove affected plants"
  ] },
    { name: "Anthracnose", crop: "Beans / Mango", image: "/Diseases/Anthracnose.jpg", definition: "Creates dark, sunken lesions on stems, leaves, and fruits.", region: "Warm and humid climates", treatment: [
    "Apply fungicides",
    "Prune infected parts",
    "Maintain field sanitation"
  ] },
    { name: "Black Stem Rust", crop: "Wheat", image: "/Diseases/Black-Stem.jpg", definition: "A severe rust disease causing massive crop lodging and yield loss.", region: "Global wheat-growing areas", treatment: [
    "Grow resistant varieties",
    "Apply fungicides",
    "Remove alternate hosts"
  ] },
    { name: "Fusarium Wilt", crop: "Banana / Tomato", image: "/Diseases/fusarium-wilt.webp", definition: "A fungus entering through roots, turning leaves yellow and wilting them.", region: "Tropical soils",  treatment: [
    "Use resistant varieties",
    "Rotate crops",
    "Improve soil health"
  ] },
    { name: "Bacterial Blight", crop: "Cotton / Rice", image: "/Diseases/Bacterial-Blight.jpg", definition: "Water-soaked streaks appear on leaves, eventually killing the foliage.", region: "Monsoon regions",  treatment: [
    "Use certified seeds",
    "Avoid field overcrowding",
    "Apply recommended bactericides"
  ] },
    { name: "Fire Blight", crop: "Pear / Apple", image: "/Diseases/Fire-Blight.jpg", definition: "Bacterial infection making branches look blackened and scorched by fire.", region: "Temperate orchards",  treatment: [
    "Prune infected branches",
    "Disinfect tools",
    "Apply copper sprays"
  ] },
    { name: "Mosaic Virus", crop: "Tobacco / Tomato", image: "/Diseases/Mosaic-Virus.jpg", definition: "Causes a mottled, mosaic-like pattern on leaves, stunting growth.", region: "Widespread, spread by aphids",  treatment: [
    "Remove infected plants",
    "Control aphids",
    "Use virus-free seeds"
  ] },
    { name: "Clubroot", crop: "Cabbage", image: "/Diseases/Clubroot.jpg", definition: "Causes roots to swell and distort, preventing nutrient absorption.", region: "Acidic soil regions", treatment: [
    "Increase soil pH with lime",
    "Improve drainage",
    "Rotate crops"
  ] },
    { name: "Soybean Rust", crop: "Soybean", image: "/Diseases/Soybean-Rust.jpg", definition: "Aggressive fungal disease causing rapid defoliation of soybean plants.", region: "South America and Southern US",  treatment: [
    "Apply fungicides",
    "Monitor fields regularly",
    "Use resistant varieties"
  ] }
  ];

const diseaseInfo = {
  "Rice Blast": {
    treatment: [
      "Apply Tricyclazole fungicide",
      "Improve drainage"
    ],
    prevention: [
      "Use resistant varieties",
      "Avoid excess nitrogen"
    ],
    severity: "High",
    yieldLoss: "20-40%"
  },

  "Tomato Wilt": {
    treatment: [
      "Remove infected plants",
      "Improve soil drainage"
    ],
    prevention: [
      "Use resistant varieties",
      "Rotate crops"
    ],
    severity: "Medium",
    yieldLoss: "15-30%"
  },

  "Corn Smut": {
    treatment: [
      "Remove infected ears",
      "Rotate crops"
    ],
    prevention: [
      "Use certified seeds",
      "Field sanitation"
    ],
    severity: "Low",
    yieldLoss: "5-15%"
  },
"Apple___Apple_scab": {
  treatment: [
    "Apply fungicides regularly",
    "Remove infected leaves"
  ],
  prevention: [
    "Prune trees for airflow",
    "Avoid overhead irrigation"
  ],
  severity: "Medium",
  yieldLoss: "10-30%"
},

"Tomato___Septoria_leaf_spot": {
  treatment: [
    "Apply chlorothalonil fungicide",
    "Remove infected leaves"
  ],
  prevention: [
    "Maintain proper spacing",
    "Avoid overhead watering"
  ],
  severity: "Medium",
  yieldLoss: "20-50%"
},

"Tomato___Late_blight": {
  treatment: [
    "Apply copper fungicide",
    "Destroy infected plants"
  ],
  prevention: [
    "Improve air circulation",
    "Avoid excess moisture"
  ],
  severity: "High",
  yieldLoss: "40-80%"
},

"Tomato___Early_blight": {
  treatment: [
    "Use fungicides regularly",
    "Remove infected leaves"
  ],
  prevention: [
    "Rotate crops",
    "Use healthy seeds"
  ],
  severity: "Medium",
  yieldLoss: "20-40%"
},

"Pepper,_bell___Bacterial_spot": {
  treatment: [
    "Apply copper-based bactericides",
    "Remove infected leaves"
  ],
  prevention: [
    "Use disease-free seeds",
    "Avoid working with wet plants"
  ],
  severity: "Medium",
  yieldLoss: "15-40%"
}
};

  // 20 FERTILIZER DATA ENTRIES
  const fertilizerData = [
    { name: "Organic Compost", image: "/Fertilizers/Organic-Compost.jpg", definition: "Natural decomposed matter improving soil fertility and water retention." },
    { name: "Nitrogen Fertilizer (Urea)", image: "/Fertilizers/Nitrogen-Fertilizer.webp", definition: "High nitrogen content to rapidly boost green leaf growth in early stages." },
    { name: "Potassium Mix (Potash)", image: "/Fertilizers/Potassium Mix.webp", definition: "Improves overall plant strength, root health, and drought resistance." },
    { name: "Bio Fertilizer", image: "/Fertilizers/Bio Fertilizer.jpg", definition: "Contains living microbes that naturally fix atmospheric nitrogen into the soil." },
    { name: "Phosphorus (DAP)", image: "/Fertilizers/Phosphorus (DAP).webp", definition: "Crucial for flower formation, seed production, and strong root systems." },
    { name: "Bone Meal", image: "/Fertilizers/Bone Meal.webp", definition: "An organic slow-release source of phosphorus and calcium for flowering plants." },
    { name: "Blood Meal", image: "/Fertilizers/Blood Meal.webp", definition: "A highly concentrated organic nitrogen source, perfect for heavy feeders like corn." },
    { name: "Seaweed Extract", image: "/Fertilizers/Seaweed Extract.webp", definition: "Provides trace minerals and natural growth hormones to boost plant immunity." },
    { name: "Fish Emulsion", image: "/Fertilizers/Fish Emulsion.jpg", definition: "Fast-acting organic liquid fertilizer rich in nitrogen and micronutrients." },
    { name: "Worm Castings", image: "/Fertilizers/Worm Castings.jpeg", definition: "Earthworm waste that gently conditions the soil and adds rich, accessible nutrients." },
    { name: "Green Manure", image: "/Fertilizers/Green Manure.jpg", definition: "Cover crops grown specifically to be tilled back into the soil to improve fertility." },
    { name: "Calcium Nitrate", image: "/Fertilizers/Calcium Nitrate.jpg", definition: "Helps prevent blossom end rot in tomatoes and strengthens plant cell walls." },
    { name: "Epsom Salt (Magnesium)", image: "/Fertilizers/Epsom Salt.webp", definition: "Provides magnesium to help plants absorb phosphorus and create chlorophyll." },
    { name: "Ammonium Sulfate", image: "/Fertilizers/Ammonium Sulfate.webp", definition: "Excellent for lowering soil pH while delivering a heavy dose of nitrogen." },
    { name: "Zinc Sulfate", image: "/Fertilizers/Zinc Sulfate.jpg", definition: "Vital for leaf sizing and managing zinc deficiencies in pecan trees and corn." },
    { name: "Peat Moss", image: "/Fertilizers/Peat Moss.jpg", definition: "A soil amendment that helps acidic-loving crops and drastically improves water retention." },
    { name: "Guano Fertilizer", image: "/Fertilizers/Guano Fertilizer.jpg", definition: "Bat droppings providing a rich, organic blend of NPK and trace minerals." },
    { name: "Liquid Kelp", image: "/Fertilizers/Liquid Kelp.jpg", definition: "Used as a foliar spray to rapidly deliver micro-nutrients directly to the leaves." },
    { name: "Rock Phosphate", image: "/Fertilizers/Rock Phosphate.jpg", definition: "A long-term organic phosphorus source that breaks down slowly over years." },
    { name: "NPK 10-10-10", image: "/Fertilizers/NPK 10-10-10.jpg", definition: "A perfectly balanced synthetic fertilizer suitable for general-purpose gardening." }
  ];

    const handleImageUpload = (e) => {
    const file = e.target.files[0];

  if (file) {
    setSelectedFile(file);

    const reader = new FileReader();

    reader.onloadend = () => {
      setUploadedImage(reader.result);
      setImageBase64(reader.result);
    };

    reader.readAsDataURL(file);
  }
};
   const downloadReport = () => {
   const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("AgroSage AI - Disease Report", 20, 20);

  // Crop Image
  if (imageBase64) {
    doc.addImage(imageBase64, "JPEG", 20, 30, 60, 60);
  }

  // Disease Details
  doc.setFontSize(12);
  doc.text(`Disease: ${prediction.disease}`, 90, 40);
  doc.text(`Confidence: ${prediction.confidence}%`, 90, 50);

  if (diseaseInfo[prediction.disease]) {
    doc.text(
      `Severity: ${diseaseInfo[prediction.disease].severity}`,
      90,
      60
    );

    doc.text(
      `Yield Loss: ${diseaseInfo[prediction.disease].yieldLoss}`,
      90,
      70
    );

    doc.text("Treatment Suggestions:", 20, 110);

    diseaseInfo[prediction.disease].treatment.forEach((item, index) => {
      doc.text(`• ${item}`, 25, 120 + index * 10);
    });

    const treatmentEnd =
      120 + diseaseInfo[prediction.disease].treatment.length * 10 + 10;

    doc.text("Prevention Tips:", 20, treatmentEnd);

    diseaseInfo[prediction.disease].prevention.forEach((item, index) => {
      doc.text(`• ${item}`, 25, treatmentEnd + 10 + index * 10);
    });
  }

  doc.save("AgroSage_Disease_Report.pdf");
};

    
  const handlePredict = async () => {
  if (!selectedFile) {
    alert("Please select an image first");
    return;
  }
  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
  const response = await axios.post(
       "http://16.16.75.9:5000/predict",
      formData
    );

    setPrediction(response.data);
  } catch (error) {
    console.error(error);
    alert("Prediction failed");
  }
};
  const handleAddDisease = async () => {
  try {
    await axios.post(
      "http://16.16.75.9:5000/add-disease",
      {
        name: diseaseName,
        crop: cropName,
        image: diseaseImage,
        definition: definition,
        treatment: treatment,
        prevention: prevention,
        severity: severity,
        yield_loss: yieldLoss
      }
    );

    alert("Disease Added Successfully!");

    setDiseaseName("");
    setCropName("");
    setDiseaseImage("");
    setDefinition("");
    setTreatment("");
    setPrevention("");
    setSeverity("");
    setYieldLoss("");

  } catch (error) {
    console.error(error);
    alert("Error adding disease");
  }
};
  
   
  const handleLogin = async () => {
  if (!email || !password) {
    alert("Please enter email and password");
    return;
  }

  try {
    const response = await axios.post(
      "http://16.16.75.9:5000/login",
      {
        email,
        password
      }
    );

    alert(response.data.message);
    setIsLoggedIn(true);

  } catch (error) {
    alert(
      error.response?.data?.message ||
      "Invalid Email or Password"
    );
  }
};
    const handleAdminLogin = async () => {
  try {
    const response = await axios.post(
      "http://16.16.75.9:5000/admin/login",
      {
        username: email,
        password: password
      }
    );

    alert(response.data.message);

    setIsAdmin(true);
    setIsLoggedIn(true);

  } catch (error) {
    alert("Invalid Admin Credentials");
  }
};
    
  const handleAddMarketPrice = async () => {
  try {
    await axios.post(
      "http://16.16.75.9:5000/add-market-price",
      {
        crop: marketCrop,
        price: marketPrice,
        image: marketImage
      }
    );

    alert("Market Price Added Successfully!");

    setMarketCrop("");
    setMarketPrice("");
    setMarketImage("");

  } catch (error) {
    console.error(error);
    alert("Error adding market price");
  }
};
  
  const getWeather = async () => {
  try {
   const response = await axios.get(
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.REACT_APP_WEATHER_API_KEY}&units=metric`
);
    setWeatherData(response.data);
  } catch (error) {
    alert("City not found");
    console.error(error);
  }
};
     const getCropRecommendation = async () => {
  try {
    const response = await axios.post(
      "http://16.16.75.9:5000/crop-recommend",
      {
        N: Number(N),
        P: Number(P),
        K: Number(K),
        temperature: 25,
        humidity: 80,
        ph: Number(ph),
        rainfall: Number(rainfall)
      }
    );

    setRecommendedCrop(
      response.data.recommended_crop
    );

  } catch (error) {
    console.error(error);
    alert("Crop recommendation failed");
  }
};
 
  // AUTHENTICATION
  const handleSignup = async () => {
  if (!name || !address || !cropType || !email || !phone || !password) {
    alert("Please fill all fields");
    return;
  }

  try {
    const response = await axios.post(
     "http://16.16.75.9:5000/signup",
      {
        name,
        email,
        phone,
        address,
        cropType,
        password
      }
    );

    alert(response.data.message);

    setIsAccountCreated(true);
    setIsLogin(true);

  } catch (error) {
    console.error("Signup Error:", error);
    alert(
      "Signup failed: " +
      (error.response?.data?.message || error.message)
    );
  }
};
  // LOGIN PAGE WITH VIDEO BACKGROUND
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          style={{
            position: "absolute", top: 0, left: 0, width: "100%", height: "100%", objectFit: "cover", zIndex: 1,
          }}
        >
          <source src="/display/vedio.webm" type="video/mp4" />
        </video>

        <div style={{ position: "absolute", inset: 0, background: "rgba(17, 153, 142, 0.75)", zIndex: 2 }}></div>

        <div style={{ ...farmerLeft, zIndex: 3 }}>👨‍🌾</div>
        <div style={{ ...farmerRight, zIndex: 3 }}>🚜</div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", padding: "40px", borderRadius: "30px",
            width: "400px", color: "white", boxShadow: "0 10px 30px rgba(0,0,0,0.3)", zIndex: 10, position: "relative",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "45px", margin: "0 0 10px 0" }}>🌿 AgroSage AI</h1>
            <div>
  <button
    onClick={() =>
      setLanguage(language === "en" ? "ta" : "en")
    }
    style={{
      background: "white",
      color: "green",
      border: "none",
      padding: "10px 15px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold"
    }}
  >
    {language === "en" ? "தமிழ்" : "English"}
  </button>
</div>
            <p style={{ marginBottom: "30px" }}>Smart Agriculture Platform</p>
          </div>

          {!isLogin && (
  <>
    <input
      type="text"
      placeholder={
        language === "en"
          ? "Full Name"
          : "முழு பெயர்"
      }
      value={name}
      onChange={(e) => setName(e.target.value)}
      style={inputStyle}
    />

    <input
      type="text"
      placeholder={
        language === "en"
          ? "Address"
          : "முகவரி"
      }
      value={address}
      onChange={(e) => setAddress(e.target.value)}
      style={inputStyle}
    />

    <input
      type="text"
      placeholder={
        language === "en"
          ? "What crop do you grow? (e.g. Rice)"
          : "நீங்கள் வளர்க்கும் பயிர் என்ன? (உதா: நெல்)"
      }
      value={cropType}
      onChange={(e) => setCropType(e.target.value)}
      style={inputStyle}
    />
  </>
)}

          <input
  type="email"
  placeholder={
    language === "en"
      ? "Email"
      : "மின்னஞ்சல்"
  }
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  style={inputStyle}
/>
          <input
  type="password"
  placeholder={
    language === "en"
      ? "Password"
      : "கடவுச்சொல்"
  }
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  style={inputStyle}
/>
      <input
  type="text"
  placeholder={
    language === "en"
      ? "Phone Number"
      : "தொலைபேசி எண்"
  }
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  style={inputStyle}
/>

          <button onClick={isLogin ? handleLogin : handleSignup} style={loginBtn}>
  {isLogin
    ? (language === "en" ? "Login" : "உள்நுழை")
    : (language === "en" ? "Create Account" : "கணக்கு உருவாக்கு")}
</button>
              {isLogin && (
  <button
    onClick={handleAdminLogin}
    style={{
      ...loginBtn,
      marginTop: "10px",
      background: "#222",
      color: "white"
    }}
  >
    {language === "en" ? "Admin Login" : "நிர்வாகி உள்நுழைவு"}
  </button>
)}

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            {isLogin
  ? (language === "en"
      ? "Don't have an account?"
      : "கணக்கு இல்லையா?")
  : (language === "en"
      ? "Already have an account?"
      : "ஏற்கனவே கணக்கு உள்ளதா?")}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: "none", border: "none", color: "white", width: "100%", marginTop: "10px", cursor: "pointer", fontWeight: "bold" }}
          >
           {isLogin
  ? (language === "en" ? "Sign Up" : "பதிவு செய்க")
  : (language === "en" ? "Login" : "உள்நுழை")}
          </button>
         </div>
      </div>
    );
  }
if (isAdmin) {
  return (
    <div style={{ padding: "30px" }}>
      <h1>Admin Dashboard</h1>

      <h2>Total Users: {users.length}</h2>
    <h2 style={{ marginTop: "40px" }}>➕ Add Disease</h2>

<input
  type="text"
  placeholder="Disease Name"
  value={diseaseName}
  onChange={(e) => setDiseaseName(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Crop Name"
  value={cropName}
  onChange={(e) => setCropName(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Image URL"
  value={diseaseImage}
  onChange={(e) => setDiseaseImage(e.target.value)}
  style={inputStyle}
/>

<textarea
  placeholder="Definition"
  value={definition}
  onChange={(e) => setDefinition(e.target.value)}
  style={inputStyle}
/>

<textarea
  placeholder="Treatment"
  value={treatment}
  onChange={(e) => setTreatment(e.target.value)}
  style={inputStyle}
/>

<textarea
  placeholder="Prevention"
  value={prevention}
  onChange={(e) => setPrevention(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Severity"
  value={severity}
  onChange={(e) => setSeverity(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Yield Loss"
  value={yieldLoss}
  onChange={(e) => setYieldLoss(e.target.value)}
  style={inputStyle}
/>

<button
  onClick={handleAddDisease}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  ➕ Add Disease
</button>
      <h2 style={{ marginTop: "40px" }}>
  📈 Add Market Price
</h2>

<input
  type="text"
  placeholder="Crop Name"
  value={marketCrop}
  onChange={(e) => setMarketCrop(e.target.value)}
  style={inputStyle}
/>

<input
  type="number"
  placeholder="Price"
  value={marketPrice}
  onChange={(e) => setMarketPrice(e.target.value)}
  style={inputStyle}
/>

<input
  type="text"
  placeholder="Image URL"
  value={marketImage}
  onChange={(e) => setMarketImage(e.target.value)}
  style={inputStyle}
/>

<button
  onClick={handleAddMarketPrice}
  style={{
    marginTop: "20px",
    padding: "12px 25px",
    background: "green",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer"
  }}
>
  📈 Add Market Price
</button>

      <table
        border="1"
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginTop: "20px"
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Address</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user[0]}>
              <td>{user[0]}</td>
              <td>{user[1]}</td>
              <td>{user[2]}</td>
              <td>{user[3]}</td>
              <td>{user[4]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


  // MAIN WEBSITE
  return (
    <div style={{ minHeight: "100vh", background: "#f4fff4", fontFamily: "Arial" }}>
      {/* NAVBAR */}
      <div
        style={{
          background: "linear-gradient(90deg,#0f9b0f,#38ef7d)", padding: "18px 40px", display: "flex", justifyContent: "space-between",
          alignItems: "center", color: "white", position: "sticky", top: 0, zIndex: 1000, boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "32px", margin: 0 }}>🌿 AgroSage AI</h1>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <button style={navBtn} onClick={() => setPage("home")}>
  {language === "en" ? "Home" : "முகப்பு"}
</button>
          <button style={navBtn} onClick={() => setPage("upload")}>{language === "en" ? "Upload" : "பதிவேற்று"}</button>
          <button style={navBtn} onClick={() => setPage("fertilizers")}>{language === "en" ? "Fertilizers" : "உரங்கள்"}</button>
          <button style={navBtn} onClick={() => setPage("diseases")}>
  {language === "en" ? "Diseases" : "நோய்கள்"}
</button>
          <button style={navBtn} onClick={() => setPage("market")}>{language === "en" ? "Market Price" : "சந்தை விலை"}</button>
          <button style={navBtn} onClick={() => setPage("croprec")}>
  Crop Recommendation
</button>
          <button
  style={navBtn}
  onClick={() => setPage("weather")}
>
 {language === "en" ? "Weather" : "வானிலை"}
</button>
          <button
  style={navBtn}
  onClick={() => setPage("schemes")}
>
 {language === "en" ? "Schemes" : "திட்டங்கள்"}
</button>
          <button style={navBtn} onClick={() => setPage("profile")}>{language === "en" ? "Profile" : "சுயவிவரம்"}</button>
          <button style={navBtn} onClick={() => setIsLoggedIn(false)}>Logout</button>
        </div>
      </div>

      {/* HOME PAGE WITH AI AND DISEASES */}
      {page === "home" && (
        <div>
          <div style={{ position: "relative", height: "700px", overflow: "hidden" }}>
            <div style={leaf1}>🌿</div>
            <div style={leaf2}>🍃</div>
            <div style={leaf3}>🌾</div>

            <img src={sliderImages[currentSlide]} alt="slider" style={{ width: "100%", height: "100%", objectFit: "cover", animation: "zoomBg 8s infinite alternate" }} />

            <div style={heroOverlay}>
              <h1 style={heroTitle}>
  {language === "en"
    ? "Smart Farming Future"
    : "நவீன விவசாயத்தின் எதிர்காலம்"}
</h1>

<p style={heroText}>
  {language === "en"
    ? "AI Crop Disease Detection & Fertilizer Guidance"
    : "AI மூலம் பயிர் நோய் கண்டறிதல் மற்றும் உர வழிகாட்டுதல்"}
</p>

<button style={heroBtn} onClick={() => setPage("upload")}>
  {language === "en"
    ? "Explore Now"
    : "இப்போது தொடங்கு"}
</button>

<h2 style={{ margin: 0 }}>
  {language === "en"
    ? "🤖 Ask AgroSage AI"
    : "🤖 AgroSage AI-யிடம் கேளுங்கள்"}
</h2>

<input
  type="text"
  placeholder={
    language === "en"
      ? "Ask farming questions..."
      : "விவசாய கேள்விகளை கேளுங்கள்..."
  }
  value={question}
  onChange={(e) => setQuestion(e.target.value)}
  style={aiInput}
/>

<button
  style={{ ...heroBtn, marginTop: "15px" }}
  onClick={handleAskAI}
>
  {language === "en"
    ? "Ask AI"
    : "AI-யிடம் கேள்"}
</button>

{aiAnswer && <div style={aiAnswerBox}>{aiAnswer}</div>}
                      </div>
          </div>
        </div>
      )}
      {/* UPLOAD */}
      {page === "upload" && (
        <div style={{ padding: "50px", position: "relative", minHeight: "100vh", background: "linear-gradient(135deg,#d4fc79,#96e6a1,#38ef7d)" }}>
       <h1 style={pageTitle}>
  {language === "en"
    ? "🌾 Upload Crop Image"
    : "🌾 பயிர் படத்தை பதிவேற்று"}
</h1>
          <div style={uploadPageBox}>
            <h2 style={{ color: "green" }}>
  {language === "en"
    ? "AI Crop Detection Upload"
    : "AI பயிர் நோய் கண்டறிதல்"}
</h2>
            <input type="file" onChange={handleImageUpload} />
            {uploadedImage && <img src={uploadedImage} alt="upload" style={{ width: "350px", marginTop: "20px", borderRadius: "20px", border: "6px solid #38ef7d", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} />}
            <br />
            <button style={heroBtn} onClick={handlePredict}>
  {language === "en"
    ? "Predict Disease"
    : "நோயை கண்டறி"}
</button>
  {prediction && (
  <>
    <div
      style={{
        marginTop: "20px",
        background: "white",
        padding: "20px",
        borderRadius: "15px",
        color: "black"
      }}
    >
      <h2>
  {language === "en" ? "Disease" : "நோய்"}:
  {prediction.disease}
</h2>

<h3>
  {language === "en"
    ? "Confidence"
    : "நம்பகத்தன்மை"}:
  {prediction.confidence}%
</h3>
    </div>

    {diseaseInfo[prediction.disease] && (
      <div
        style={{
          marginTop: "20px",
          background: "#e8f5e9",
          padding: "20px",
          borderRadius: "15px"
        }}
      >
        <h3> {language === "en"
    ? "🩺 Treatment Suggestions"
    : "🩺 சிகிச்சை பரிந்துரைகள்"}</h3>

        <ul>
          {diseaseInfo[prediction.disease].prevention.map(
  (item, i) => (
    <li key={i}>
      {language === "en"
        ? item
        : item === "Prune trees for airflow"
        ? "காற்றோட்டத்திற்காக கிளைகளை வெட்டவும்"
        : item === "Avoid overhead irrigation"
        ? "மேலிருந்து நீர் பாய்ச்சுவதை தவிர்க்கவும்"
        : item}
    </li>
  )
)}
      {language === "en"
        ? item
        : item === "Apply fungicides regularly"
        ? "பூஞ்சைநாசினியை முறையாக தெளிக்கவும்"
        : item === "Remove infected leaves"
        ? "பாதிக்கப்பட்ட இலைகளை அகற்றவும்"
        : item}
  )
)}
        </ul>

        <h3>  {language === "en"
    ? "🛡️ Prevention Tips"
    : "🛡️ தடுப்பு வழிமுறைகள்"}</h3>

        <ul>
          {diseaseInfo[prediction.disease].prevention.map(
            (item, i) => (
              <li key={i}>{item}</li>
            )
          )}
        </ul>
<h3>
{language === "en"
 ? "🔴 Severity"
 : "🔴 தீவிரம்"}: {language === "en"
  ? diseaseInfo[prediction.disease].severity
  : diseaseInfo[prediction.disease].severity === "High"
    ? "அதிகம்"
    : diseaseInfo[prediction.disease].severity === "Medium"
    ? "நடுத்தரம்"
    : "குறைவு"}
</h3>

<h3>
   {language === "en"
 ? "📉 Yield Loss"
 : "📉 விளைச்சல் இழப்பு"}: {diseaseInfo[prediction.disease].yieldLoss}
</h3>
</div>
)}

{!diseaseInfo[prediction.disease] && (
  <div
    style={{
      marginTop: "20px",
      background: "#fff3cd",
      padding: "20px",
      borderRadius: "15px",
      color: "black"
    }}
  >
    <h3>ℹ️ Disease Advisory</h3>
    <p>
      Treatment information for this disease will be updated soon.
      Please consult a local agricultural expert for detailed guidance.
    </p>
  </div>
)}
<button
  style={{
    marginTop: "20px",
    background: "#1976d2",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold"
  }}
  onClick={downloadReport}
>
  {language === "en"
 ? "📄 Download Report"
 : "📄 அறிக்கையை பதிவிறக்கு"}
</button>
</>
)}
          </div>
        </div>
      )}

      {/* FERTILIZERS (20 ITEMS - ALTERNATING) */}
      {page === "fertilizers" && (
        <div style={{ padding: "60px 40px" }}>
          <h1 style={pageTitle}>🌱 Fertilizers Guide</h1>
          <div style={{ display: "flex", flexDirection: "column", gap: "50px", maxWidth: "1000px", margin: "0 auto" }}>
            {fertilizerData.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={index} style={{
                  display: "flex", flexDirection: isEven ? "row" : "row-reverse", alignItems: "center", gap: "40px", 
                  background: "white", padding: "30px", borderRadius: "20px", boxShadow: "0 10px 25px rgba(0,0,0,0.08)"
                }}>
                  <div style={{ flex: 1, textAlign: isEven ? "left" : "right" }}>
                    <h2 style={{ color: "green", fontSize: "36px", marginBottom: "15px", marginTop: 0 }}>{index + 1}. {item.name}</h2>
                    <p style={{ fontSize: "18px", color: "#555", lineHeight: "1.7" }}>{item.definition}</p>
                  </div>
                  <div style={{ flex: "0 0 350px" }}>
                    <img src={item.image} alt={item.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "20px", border: "4px solid #38ef7d" }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

{page === "diseases" && (
  <div style={{ padding: "40px" }}>
    <h1 style={pageTitle}>🌾 Disease Library</h1>

    <div style={gridStyle}>
      {diseases.map((disease) => (
        <div key={disease.id} style={card}>
          <img
            src={disease.image}
            alt={disease.name}
            style={cardImage}
          />

          <h2 style={cardTitle}>
            {disease.name}
          </h2>

          <div style={{ padding: "15px" }}>
            <p><b>Crop:</b> {disease.crop}</p>
            <p><b>Definition:</b> {disease.definition}</p>
            <p><b>Treatment:</b> {disease.treatment}</p>
            <p><b>Prevention:</b> {disease.prevention}</p>
            <p><b>Severity:</b> {disease.severity}</p>
            <p><b>Yield Loss:</b> {disease.yield_loss}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
)}
      {/* MARKET API WITH GRAPH */}
      {page === "market" && (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={pageTitle}>📈  Market Prices </h1>
          {isLoadingPrices ? (
            <div style={{ textAlign: "center", fontSize: "24px", color: "green", padding: "50px" }}>⏳ Loading market data...</div>
          ) : (
            <>
              <div style={{ background: "white", padding: "40px", borderRadius: "20px", marginBottom: "50px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                <h2 style={{ color: "green", marginBottom: "30px", textAlign: "center" }}>📊 Price Trends (₹ / Quintal)</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
                  {marketPrices.map((item, index) => {
                    const barWidth = `${(item.price / 3000) * 100}%`;
                    return (
                      <div key={index} style={{ display: "flex", alignItems: "center" }}>
                        <span style={{ width: "100px", fontWeight: "bold", fontSize: "18px", color: "#444" }}>{item.crop}</span>
                        <div style={{ flex: 1, background: "#e0f2f1", height: "25px", borderRadius: "12px", overflow: "hidden", position: "relative" }}>
                          <div style={{ width: barWidth, background: "linear-gradient(90deg, #11998e, #38ef7d)", height: "100%", borderRadius: "12px", transition: "width 1.5s ease-in-out" }}></div>
                        </div>
                        <span style={{ width: "80px", textAlign: "right", fontWeight: "bold", color: "green", fontSize: "18px" }}>₹{item.price}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div style={gridStyle}>
                {marketPrices.map((item, index) => (
                  <div key={index} style={card}>
                    <img src={item.image} alt={item.crop} style={cardImage} />
                    <h2 style={cardTitle}>{item.crop}</h2>
                    <h3 style={{ color: "white", background: "green", padding: "15px", textAlign: "center", margin: 0 }}>₹{item.price} / Quintal</h3>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}
{/* CROP RECOMMENDATION */}
{page === "croprec" && (
  <div style={{ padding: "40px" }}>
    <h1 style={pageTitle}>🌾 Crop Recommendation</h1>

    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        maxWidth: "700px",
        margin: "auto"
      }}
    >
      <input
        type="number"
        placeholder="Nitrogen (N)"
        value={N}
        onChange={(e) => setN(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        type="number"
        placeholder="Phosphorus (P)"
        value={P}
        onChange={(e) => setP(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        type="number"
        placeholder="Potassium (K)"
        value={K}
        onChange={(e) => setK(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        type="number"
        placeholder="pH"
        value={ph}
        onChange={(e) => setPh(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "15px"
        }}
      />

      <input
        type="number"
        placeholder="Rainfall"
        value={rainfall}
        onChange={(e) => setRainfall(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          marginBottom: "20px"
        }}
      />

      <button
        style={loginBtn}
        onClick={getCropRecommendation}
      >
        Recommend Crop
      </button>

      {recommendedCrop && (
        <div style={{ marginTop: "25px", textAlign: "center" }}>
          <h2>🌾 Recommended Crop</h2>
          <h1 style={{ color: "green" }}>
            {recommendedCrop}
          </h1>
        </div>
      )}
    </div>
  </div>
)}
{/* WEATHER */}
{page === "weather" && (
  <div style={{ padding: "40px" }}>
    <h1 style={pageTitle}>🌦️ Weather Forecast</h1>

    <div
      style={{
        background: "white",
        padding: "30px",
        borderRadius: "20px",
        maxWidth: "600px",
        margin: "auto",
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}
    >
      <input
        type="text"
        placeholder="Enter City Name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        style={{
          width: "100%",
          padding: "15px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          marginBottom: "20px"
        }}
      />

      <button
  style={loginBtn}
  onClick={getWeather}
>
  Get Weather
</button>

      {weatherData && (
        <div style={{ marginTop: "30px" }}>
          <h2>📍 {weatherData.name}</h2>
<h3>🌡️ Temperature: {weatherData.main.temp}°C</h3>
<h3>💧 Humidity: {weatherData.main.humidity}%</h3>
<h3>☁️ Condition: {weatherData.weather[0].main}</h3>
<h3>🌬️ Wind Speed: {weatherData.wind.speed} m/s</h3>
</div>
      )}
         
    </div>
  </div>
)}
          {/* GOVERNMENT SCHEMES */}
      {page === "schemes" && (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={pageTitle}>🏛️ Government Schemes for Farmers</h1>

          <div style={gridStyle}>

            <div style={card}>
  <img
    src="/schemes/pm kisan.png"
    alt="PM Kisan"
    style={{
      width: "100%",
      height: "180px",
      objectFit: "contain",
      marginTop: "15px"
    }}
  />

  <h2 style={cardTitle}>PM Kisan</h2>

  <p style={{ padding: "15px" }}>
    Provides ₹6000 per year financial assistance to eligible farmers.
  </p>

  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
      onClick={() =>
        window.open("https://pmkisan.gov.in/", "_blank")
      }
      style={{
        padding: "12px 20px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      Apply Now
    </button>
  </div>
</div>
<div style={card}>
  <img
    src="/schemes/PM Surya Ghar.webp"
    alt="PM Surya Ghar"
    style={{
      width: "100%",
      height: "180px",
      objectFit: "contain",
      marginTop: "15px"
    }}
  />

  <h2 style={cardTitle}>PM Surya Ghar</h2>

  <p style={{ padding: "15px" }}>
    Solar rooftop subsidy scheme helping farmers reduce electricity costs.
  </p>

  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
      onClick={() =>
        window.open("https://pmsuryaghar.gov.in/", "_blank")
      }
      style={{
        padding: "12px 20px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      Apply Now
    </button>
  </div>
</div>

            <div style={card}>
  <img
    src="/schemes/Crop Insurance.png"
    alt="Crop Insurance"
    style={{
      width: "100%",
      height: "180px",
      objectFit: "contain",
      marginTop: "15px"
    }}
  />

  <h2 style={cardTitle}>Crop Insurance Scheme</h2>

  <p style={{ padding: "15px" }}>
    Protection against crop loss due to natural disasters and climate risks.
  </p>

  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
      onClick={() =>
        window.open("https://pmfby.gov.in/", "_blank")
      }
      style={{
        padding: "12px 20px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      Apply Now
    </button>
  </div>
</div>

            <div style={card}>
  <img
    src="/schemes/Kisan Credit Card.jpg"
    alt="Kisan Credit Card"
    style={{
      width: "100%",
      height: "180px",
      objectFit: "contain",
      marginTop: "15px"
    }}
  />

  <h2 style={cardTitle}>Kisan Credit Card</h2>

  <p style={{ padding: "15px" }}>
    Provides agricultural loans at subsidized interest rates for farmers.
  </p>

  <div style={{ textAlign: "center", marginBottom: "20px" }}>
    <button
      onClick={() =>
        window.open("https://www.myscheme.gov.in/schemes/kcc", "_blank")
      }
      style={{
        padding: "12px 20px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "10px",
        cursor: "pointer"
      }}
    >
      Apply Now
    </button>
  </div>
</div>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <div style={{ padding: "50px" }}>
          <h1 style={pageTitle}>👨‍🌾 Farmer Profile</h1>
          <div style={profileBox}>
            <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="profile" style={profileImageStyle} />
            <h2 style={{ marginTop: "20px" }}>{name || "Farmer Name"}</h2>
            <h3 style={{ color: "green" }}>📍 {address || "No Address Provided"}</h3>
            <h3 style={{ color: "#444" }}>🌾 Crops: {cropType || "Not Specified"}</h3>
            <h3 style={{ color: "#444" }}>📧 {email || "No Email Provided"}</h3>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes floatLeaf { 0% { transform: translateY(0px); } 50% { transform: translateY(-20px); } 100% { transform: translateY(0px); } }
          @keyframes moveFarmer { 0% { transform: translateX(0px); } 50% { transform: translateX(20px); } 100% { transform: translateX(0px); } }
          @keyframes zoomBg { 0% { transform: scale(1); } 100% { transform: scale(1.08); } }
          @keyframes cardFloat { 0% { transform: translateY(0px); } 50% { transform: translateY(-10px); } 100% { transform: translateY(0px); } }
        `}
      </style>
    </div>
  );
}

// STYLES
const inputStyle = { width: "100%", padding: "15px", marginTop: "15px", borderRadius: "15px", border: "none", fontSize: "16px", boxSizing: "border-box" };
const loginBtn = { width: "100%", marginTop: "25px", padding: "15px", borderRadius: "15px", border: "none", background: "white", color: "green", fontSize: "18px", fontWeight: "bold", cursor: "pointer" };
const navBtn = { background: "white", color: "green", border: "none", padding: "10px 18px", borderRadius: "10px", cursor: "pointer", fontWeight: "bold" };
const heroBtn = { marginTop: "25px", background: "#38ef7d", color: "white", border: "none", padding: "15px 35px", borderRadius: "30px", fontSize: "18px", cursor: "pointer", fontWeight: "bold" };
const pageTitle = { textAlign: "center", fontSize: "50px", color: "green", marginBottom: "40px", marginTop: 0 };
const gridStyle = { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "30px" };
const card = { background: "white", borderRadius: "25px", overflow: "hidden", boxShadow: "0 10px 25px rgba(0,0,0,0.12)", animation: "cardFloat 4s ease-in-out infinite", cursor: "pointer" };
const cardImage = { width: "100%", height: "250px", objectFit: "cover" };
const cardTitle = { padding: "20px", color: "green", textAlign: "center", margin: 0 };
const uploadPageBox = { background: "rgba(255,255,255,0.9)", padding: "40px", borderRadius: "30px", maxWidth: "700px", margin: "auto", textAlign: "center", position: "relative", zIndex: 2, boxShadow: "0 10px 30px rgba(0,0,0,0.2)" };
const profileBox = { background: "white", padding: "40px", borderRadius: "30px", textAlign: "center", maxWidth: "500px", margin: "auto", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" };
const profileImageStyle = { width: "180px", height: "180px", borderRadius: "50%", objectFit: "cover", border: "6px solid #38ef7d" };
const heroOverlay = { position: "absolute", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", color: "white", textAlign: "center" };
const heroTitle = { fontSize: "70px", fontWeight: "bold", margin: 0 };
const heroText = { fontSize: "24px", marginTop: "15px" };
const farmerLeft = { position: "absolute", left: "50px", bottom: "50px", fontSize: "120px", animation: "moveFarmer 4s infinite" };
const farmerRight = { position: "absolute", right: "50px", bottom: "50px", fontSize: "120px", animation: "moveFarmer 5s infinite" };
const leaf1 = { position: "absolute", top: "80px", left: "40px", fontSize: "45px", animation: "floatLeaf 4s infinite ease-in-out", zIndex: 5 };
const leaf2 = { position: "absolute", top: "200px", right: "60px", fontSize: "55px", animation: "floatLeaf 5s infinite ease-in-out", zIndex: 5 };
const leaf3 = { position: "absolute", bottom: "100px", left: "200px", fontSize: "50px", animation: "floatLeaf 6s infinite ease-in-out", zIndex: 5 };
const aiBox = { marginTop: "40px", background: "rgba(255,255,255,0.2)", padding: "30px", borderRadius: "25px", backdropFilter: "blur(10px)", width: "500px", border: "1px solid rgba(255,255,255,0.3)" };
const aiInput = { width: "100%", padding: "15px", borderRadius: "15px", border: "none", marginTop: "20px", fontSize: "16px", boxSizing: "border-box" };
const aiAnswerBox = { marginTop: "20px", background: "white", color: "green", padding: "20px", borderRadius: "15px", fontWeight: "bold" };