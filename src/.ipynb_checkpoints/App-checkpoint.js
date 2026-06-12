import React, { useEffect, useState } from "react";

export default function App() {
  // LOGIN
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  const [isAccountCreated, setIsAccountCreated] = useState(false);

  // APP
  const [page, setPage] = useState("home");
  const [uploadedImage, setUploadedImage] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // AI CHAT
  const [question, setQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");

  // LOGIN FORM
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // NEW STATES
  const [address, setAddress] = useState("");
  const [cropType, setCropType] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  // DISEASE DETAILS
  const [selectedDisease, setSelectedDisease] = useState(null);

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

  // AI ANSWER
  const handleAskAI = () => {
    if (question.toLowerCase().includes("rice")) {
      setAiAnswer(
        "🌾 Rice crops require good water supply and fungal protection."
      );
    } else if (question.toLowerCase().includes("tomato")) {
      setAiAnswer(
        "🍅 Tomato crops grow better in warm weather and need disease monitoring."
      );
    } else if (question.toLowerCase().includes("fertilizer")) {
      setAiAnswer(
        "🌱 Organic compost and nitrogen fertilizers improve crop growth."
      );
    } else {
      setAiAnswer(
        "🤖 AgroSage AI Suggestion: Monitor crops regularly and maintain healthy soil."
      );
    }
  };

  // DISEASE DATA
  const diseaseData = [
    {
      name: "Rice Blast",
      crop: "Rice",
      image:
        "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg",
      realImage:
        "https://images.pexels.com/photos/1459339/pexels-photo-1459339.jpeg",
      definition:
        "Rice Blast is a fungal disease affecting rice leaves and stems.",
      region: "Mostly found in humid regions.",
      mapImage:
        "https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg",
      regionReal:
        "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
    },
    {
      name: "Leaf Spot",
      crop: "Rice",
      image:
        "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg",
      realImage:
        "https://images.pexels.com/photos/4750270/pexels-photo-4750270.jpeg",
      definition: "Leaf Spot creates brown spots on crop leaves.",
      region: "Common in wet farming areas.",
      mapImage:
        "https://images.pexels.com/photos/41949/earth-earth-at-night-night-lights-41949.jpeg",
      regionReal:
        "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
    },
    {
      name: "Tomato Wilt",
      crop: "Tomato",
      image:
        "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg",
      realImage:
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
      definition: "Tomato Wilt causes tomato plants to dry suddenly.",
      region: "Mostly in hot temperature regions.",
      mapImage:
        "https://images.pexels.com/photos/2422/sky-earth-galaxy-universe.jpg",
      regionReal:
        "https://images.pexels.com/photos/1459335/pexels-photo-1459335.jpeg",
    },
    {
      name: "Rust Disease",
      crop: "Wheat",
      image:
        "https://images.pexels.com/photos/2131784/pexels-photo-2131784.jpeg",
      realImage:
        "https://images.pexels.com/photos/265216/pexels-photo-265216.jpeg",
      definition: "Rust Disease causes orange powder-like infections.",
      region: "Seen in wheat growing regions.",
      mapImage:
        "https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg",
      regionReal:
        "https://images.pexels.com/photos/248797/pexels-photo-248797.jpeg",
    },
  ];

  // FERTILIZER DATA
  const fertilizerData = [
    {
      name: "Organic Compost",
      image:
        "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg",
      definition:
        "Improves soil fertility and water retention naturally.",
    },
    {
      name: "Nitrogen Fertilizer",
      image:
        "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg",
      definition: "Boosts green leaf growth quickly.",
    },
    {
      name: "Potassium Mix",
      image:
        "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg",
      definition: "Improves plant strength and disease resistance.",
    },
    {
      name: "Bio Fertilizer",
      image:
        "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg",
      definition: "Contains useful microorganisms for crops.",
    },
    {
      name: "Urea",
      image:
        "https://images.pexels.com/photos/7728084/pexels-photo-7728084.jpeg",
      definition: "Provides nitrogen for rapid crop growth.",
    },
    {
      name: "DAP",
      image:
        "https://images.pexels.com/photos/4207908/pexels-photo-4207908.jpeg",
      definition: "Rich phosphorus fertilizer for roots.",
    },
    {
      name: "Cow Manure",
      image:
        "https://images.pexels.com/photos/5503258/pexels-photo-5503258.jpeg",
      definition: "Natural organic fertilizer for soil health.",
    },
    {
      name: "Seaweed Fertilizer",
      image:
        "https://images.pexels.com/photos/6231738/pexels-photo-6231738.jpeg",
      definition: "Improves plant immunity and growth.",
    },
    {
      name: "Bone Meal",
      image:
        "https://images.pexels.com/photos/6231737/pexels-photo-6231737.jpeg",
      definition: "Adds phosphorus and calcium to soil.",
    },
    {
      name: "Vermicompost",
      image:
        "https://images.pexels.com/photos/5503260/pexels-photo-5503260.jpeg",
      definition: "Eco-friendly compost from earthworms.",
    },
  ];

  // MARKET PRICES
  const marketPrices = [
    {
      crop: "Rice",
      price: "₹2450 / Quintal",
      image:
        "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg",
    },
    {
      crop: "Tomato",
      price: "₹1800 / Quintal",
      image:
        "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg",
    },
    {
      crop: "Onion",
      price: "₹2200 / Quintal",
      image:
        "https://images.pexels.com/photos/4197445/pexels-photo-4197445.jpeg",
    },
    {
      crop: "Wheat",
      price: "₹2100 / Quintal",
      image:
        "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg",
    },
    {
      crop: "Corn",
      price: "₹1700 / Quintal",
      image:
        "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg",
    },
    {
      crop: "Potato",
      price: "₹1400 / Quintal",
      image:
        "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg",
    },
    {
      crop: "Carrot",
      price: "₹2600 / Quintal",
      image:
        "https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg",
    },
    {
      crop: "Cabbage",
      price: "₹1200 / Quintal",
      image:
        "https://images.pexels.com/photos/257259/pexels-photo-257259.jpeg",
    },
    {
      crop: "Beans",
      price: "₹3100 / Quintal",
      image:
        "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
    },
    {
      crop: "Chilli",
      price: "₹4200 / Quintal",
      image:
        "https://images.pexels.com/photos/2893635/pexels-photo-2893635.jpeg",
    },
  ];

  // IMAGE UPLOAD
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setUploadedImage(URL.createObjectURL(file));
    }
  };

  // PROFILE IMAGE UPLOAD
  const handleProfileImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setProfileImage(URL.createObjectURL(file));
    }
  };

  // SIGN UP
  const handleSignup = () => {
    if (name && address && cropType && email && password) {
      setIsAccountCreated(true);
      setIsLogin(true);

      alert("Account Created Successfully. Now Login.");
    } else {
      alert("Please fill all fields");
    }
  };

  // LOGIN
  const handleLogin = () => {
    if (!isAccountCreated) {
      alert("Please create account first using Sign Up");
      return;
    }

    if (email && password) {
      setIsLoggedIn(true);
    } else {
      alert("Please fill all fields");
    }
  };

  // LOGIN PAGE
  if (!isLoggedIn) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg,#11998e,#38ef7d)",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontFamily: "Arial",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={farmerLeft}>👨‍🌾</div>

        <div style={farmerRight}>🚜</div>

        <div
          style={{
            background: "rgba(255,255,255,0.15)",
            backdropFilter: "blur(10px)",
            padding: "40px",
            borderRadius: "30px",
            width: "400px",
            color: "white",
            boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
            zIndex: 5,
          }}
        >
          <div style={{ textAlign: "center" }}>
            <h1 style={{ fontSize: "45px" }}>🌿 AgroSage AI</h1>

            <p style={{ marginBottom: "30px" }}>
              Smart Agriculture Platform
            </p>
          </div>

          {!isLogin && (
            <>
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={inputStyle}
              />

              <input
                type="text"
                placeholder="Crop Type"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                style={inputStyle}
              />

              <input
                type="file"
                onChange={handleProfileImageUpload}
                style={{
                  marginTop: "15px",
                  color: "white",
                }}
              />
            </>
          )}

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />

          <button
            onClick={isLogin ? handleLogin : handleSignup}
            style={loginBtn}
          >
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{
              background: "none",
              border: "none",
              color: "white",
              width: "100%",
              marginTop: "10px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
      </div>
    );
  }

  // MAIN WEBSITE
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4fff4",
        fontFamily: "Arial",
      }}
    >
      {/* NAVBAR */}
      <div
        style={{
          background: "linear-gradient(90deg,#0f9b0f,#38ef7d)",
          padding: "18px 40px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: "white",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
        }}
      >
        <h1 style={{ fontSize: "32px" }}>🌿 AgroSage AI</h1>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <button style={navBtn} onClick={() => setPage("home")}>
            Home
          </button>

          <button style={navBtn} onClick={() => setPage("upload")}>
            Upload
          </button>

          <button style={navBtn} onClick={() => setPage("diseases")}>
            Diseases
          </button>

          <button style={navBtn} onClick={() => setPage("fertilizers")}>
            Fertilizers
          </button>

          <button style={navBtn} onClick={() => setPage("market")}>
            Market Price
          </button>

          <button style={navBtn} onClick={() => setPage("contact")}>
            Contact
          </button>

          <button style={navBtn} onClick={() => setPage("profile")}>
            Profile
          </button>

          <button style={navBtn} onClick={() => setIsLoggedIn(false)}>
            Logout
          </button>
        </div>
      </div>

      {/* HOME */}
      {page === "home" && (
        <div>
          <div
            style={{
              position: "relative",
              height: "700px",
              overflow: "hidden",
            }}
          >
            <div style={leaf1}>🌿</div>
            <div style={leaf2}>🍃</div>
            <div style={leaf3}>🌾</div>

            <img
              src={sliderImages[currentSlide]}
              alt="slider"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                animation: "zoomBg 8s infinite alternate",
              }}
            />

            <div style={heroOverlay}>
              <h1 style={heroTitle}>Smart Farming Future</h1>

              <p style={heroText}>
                AI Crop Disease Detection & Fertilizer Guidance
              </p>

              <button
                style={heroBtn}
                onClick={() => setPage("upload")}
              >
                Explore Now
              </button>

              {/* AI BOX */}
              <div style={aiBox}>
                <h2>🤖 Ask AgroSage AI</h2>

                <input
                  type="text"
                  placeholder="Ask farming questions..."
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  style={aiInput}
                />

                <button style={heroBtn} onClick={handleAskAI}>
                  Ask AI
                </button>

                {aiAnswer && (
                  <div style={aiAnswerBox}>
                    {aiAnswer}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD */}
      {page === "upload" && (
        <div
          style={{
            padding: "50px",
            position: "relative",
            minHeight: "100vh",
            background:
              "linear-gradient(135deg,#d4fc79,#96e6a1,#38ef7d)",
          }}
        >
          <div style={float1}>🌱</div>
          <div style={float2}>🌾</div>
          <div style={float3}>🍂</div>

          <div style={uploadFlower1}>🌸</div>
          <div style={uploadFlower2}>🌼</div>

          <h1 style={pageTitle}>🌾 Upload Crop Image</h1>

          <div style={uploadPageBox}>
            <h2 style={{ color: "green" }}>
              AI Crop Detection Upload
            </h2>

            <input type="file" onChange={handleImageUpload} />

            {uploadedImage && (
              <img
                src={uploadedImage}
                alt="upload"
                style={{
                  width: "350px",
                  marginTop: "20px",
                  borderRadius: "20px",
                  border: "6px solid #38ef7d",
                  boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
                }}
              />
            )}

            <button style={heroBtn}>Upload Crop</button>
          </div>
        </div>
      )}

      {/* DISEASE PAGE */}
      {page === "diseases" && (
        <div style={{ padding: "40px" }}>
          <h1 style={pageTitle}>🦠 Crop Diseases</h1>

          <div style={wormStyle}>🐛</div>

          <div style={wormStyle2}>🪱</div>

          <div style={gridStyle}>
            {diseaseData.map((item, index) => (
              <div
                key={index}
                style={card}
                onDoubleClick={() => {
                  setSelectedDisease(item);
                  setPage("diseaseView");
                }}
              >
                <img
                  src={item.image}
                  alt={item.name}
                  style={cardImage}
                />

                <h2 style={cardTitle}>{item.name}</h2>

                <div style={{ padding: "0 20px 20px" }}>
                  <button
                    style={{
                      ...navBtn,
                      background: "green",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    Double Click Image
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* DISEASE VIEW */}
      {page === "diseaseView" && selectedDisease && (
        <div style={{ padding: "40px" }}>
          <button
            style={{
              ...navBtn,
              background: "green",
              color: "white",
              marginBottom: "30px",
            }}
            onClick={() => setPage("diseases")}
          >
            ← Back to Diseases
          </button>

          <h1 style={pageTitle}>{selectedDisease.name}</h1>

          <h2
            style={{
              color: "green",
              marginBottom: "20px",
              textAlign: "center",
            }}
          >
            Target Crop: {selectedDisease.crop}
          </h2>

          <div
            style={{
              ...diseaseDetailBox,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <h2 style={{ color: "green" }}>
              🌿 Real Disease Image
            </h2>

            <img
              src={selectedDisease.realImage}
              alt="real disease"
              style={{
                ...detailImage,
                width: "80%",
                maxWidth: "800px",
              }}
            />

            <div
              style={{
                background: "rgba(0, 128, 0, 0.1)",
                color: "green",
                border: "2px solid green",
                padding: "20px",
                borderRadius: "15px",
                marginTop: "30px",
                width: "80%",
                fontSize: "22px",
                fontWeight: "bold",
                textAlign: "center",
              }}
            >
              <p>{selectedDisease.definition}</p>
            </div>

            <h3
              style={{
                marginTop: "40px",
                color: "green",
                fontSize: "28px",
              }}
            >
              📍 Regions with High Infection
            </h3>

            <p style={{ fontSize: "18px", marginBottom: "20px" }}>
              {selectedDisease.region}
            </p>

            <img
              src={selectedDisease.mapImage}
              alt="map"
              style={mapStyle}
            />

            <h2
              style={{
                color: "green",
                marginTop: "40px",
              }}
            >
              🌍 Region Real Image
            </h2>

            <img
              src={selectedDisease.regionReal}
              alt="region"
              style={mapStyle}
            />
          </div>
        </div>
      )}

      {/* FERTILIZER */}
      {page === "fertilizers" && (
        <div style={{ padding: "40px" }}>
          <h1 style={pageTitle}>🌾 Fertilizers</h1>

          <div style={fertilizerAnim}>
            🌿 Fertilizer Boost 🌿
          </div>

          <div style={gridStyle}>
            {fertilizerData.map((item, index) => (
              <div key={index} style={card}>
                <img
                  src={item.image}
                  alt={item.name}
                  style={cardImage}
                />

                <h2 style={cardTitle}>{item.name}</h2>

                <div
                  style={{
                    padding: "0 20px 20px",
                    color: "#444",
                    fontSize: "16px",
                    textAlign: "center",
                  }}
                >
                  {item.definition}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* MARKET */}
      {page === "market" && (
        <div style={{ padding: "40px" }}>
          <h1 style={pageTitle}>📈 Market Prices</h1>

          <div style={graphBox}>
            <h2>📊 Market Trends</h2>

            <div style={graphBar1}>Rice ↑</div>

            <div style={graphBar2}>Tomato ↑</div>

            <div style={graphBar3}>Onion ↓</div>
          </div>

          <div style={gridStyle}>
            {marketPrices.map((item, index) => (
              <div key={index} style={card}>
                <img
                  src={item.image}
                  alt={item.crop}
                  style={cardImage}
                />

                <h2 style={cardTitle}>{item.crop}</h2>

                <h3
                  style={{
                    color: "green",
                    padding: "0 20px 20px",
                    textAlign: "center",
                  }}
                >
                  {item.price}
                </h3>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CONTACT */}
      {page === "contact" && (
        <div style={{ padding: "50px" }}>
          <div style={contactBox}>
            <h1 style={pageTitle}>📞 Contact Us</h1>

            <input placeholder="Name" style={contactInput} />

            <input placeholder="Email" style={contactInput} />

            <textarea
              placeholder="Message"
              rows="5"
              style={contactInput}
            />

            <button style={heroBtn}>Submit</button>
          </div>
        </div>
      )}

      {/* PROFILE */}
      {page === "profile" && (
        <div style={{ padding: "50px" }}>
          <h1 style={pageTitle}>👨‍🌾 Farmer Profile</h1>

          <div style={profileBox}>
            <input
              type="file"
              id="profileUpload"
              style={{ display: "none" }}
              onChange={handleProfileImageUpload}
            />

            <label
              htmlFor="profileUpload"
              style={{ cursor: "pointer" }}
            >
              <img
                src={
                  profileImage ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt="profile"
                style={profileImageStyle}
              />
            </label>

            <h2>{name || "Farmer Name"}</h2>

            <h3 style={{ color: "green" }}>
              📍 {address || "No Address Provided"}
            </h3>

            <h3 style={{ color: "#444" }}>
              🌾 Crops: {cropType || "Not Specified"}
            </h3>

            <h3 style={{ color: "#444" }}>
              📧 {email || "No Email Provided"}
            </h3>
          </div>
        </div>
      )}

      {/* ANIMATIONS */}
      <style>
        {`
          @keyframes floatLeaf {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
            100% { transform: translateY(0px); }
          }

          @keyframes moveFarmer {
            0% { transform: translateX(0px); }
            50% { transform: translateX(20px); }
            100% { transform: translateX(0px); }
          }

          @keyframes zoomBg {
            0% { transform: scale(1); }
            100% { transform: scale(1.08); }
          }

          @keyframes cardFloat {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
          }
        `}
      </style>
    </div>
  );
}

// STYLES

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "15px",
  border: "none",
  fontSize: "16px",
};

const loginBtn = {
  width: "100%",
  marginTop: "25px",
  padding: "15px",
  borderRadius: "15px",
  border: "none",
  background: "white",
  color: "green",
  fontSize: "18px",
  fontWeight: "bold",
  cursor: "pointer",
};

const navBtn = {
  background: "white",
  color: "green",
  border: "none",
  padding: "10px 18px",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
};

const heroBtn = {
  marginTop: "25px",
  background: "#38ef7d",
  color: "white",
  border: "none",
  padding: "15px 35px",
  borderRadius: "30px",
  fontSize: "18px",
  cursor: "pointer",
  fontWeight: "bold",
};

const pageTitle = {
  textAlign: "center",
  fontSize: "50px",
  color: "green",
  marginBottom: "40px",
};

const gridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
  gap: "30px",
};

const card = {
  background: "white",
  borderRadius: "25px",
  overflow: "hidden",
  boxShadow: "0 10px 25px rgba(0,0,0,0.12)",
  animation: "cardFloat 4s ease-in-out infinite",
  cursor: "pointer",
};

const cardImage = {
  width: "100%",
  height: "250px",
  objectFit: "cover",
};

const cardTitle = {
  padding: "20px",
  color: "green",
  textAlign: "center",
};

const contactBox = {
  maxWidth: "700px",
  margin: "auto",
  background: "white",
  padding: "40px",
  borderRadius: "30px",
};

const contactInput = {
  width: "100%",
  padding: "15px",
  marginTop: "20px",
  borderRadius: "15px",
  border: "1px solid #ccc",
};

const uploadPageBox = {
  background: "rgba(255,255,255,0.9)",
  padding: "40px",
  borderRadius: "30px",
  maxWidth: "700px",
  margin: "auto",
  textAlign: "center",
  position: "relative",
  zIndex: 2,
  boxShadow: "0 10px 30px rgba(0,0,0,0.2)",
};

const profileBox = {
  background: "white",
  padding: "40px",
  borderRadius: "30px",
  textAlign: "center",
  maxWidth: "500px",
  margin: "auto",
};

const profileImageStyle = {
  width: "180px",
  height: "180px",
  borderRadius: "50%",
  objectFit: "cover",
  border: "6px solid #38ef7d",
};

const graphBox = {
  background: "white",
  padding: "30px",
  borderRadius: "20px",
  marginBottom: "40px",
};

const graphBar1 = {
  width: "90%",
  background: "green",
  color: "white",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
};

const graphBar2 = {
  width: "70%",
  background: "orange",
  color: "white",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
};

const graphBar3 = {
  width: "40%",
  background: "red",
  color: "white",
  padding: "15px",
  marginTop: "15px",
  borderRadius: "10px",
};

const heroOverlay = {
  position: "absolute",
  inset: 0,
  background: "rgba(0,0,0,0.45)",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  color: "white",
  textAlign: "center",
};

const heroTitle = {
  fontSize: "70px",
  fontWeight: "bold",
};

const heroText = {
  fontSize: "24px",
  marginTop: "15px",
};

const diseaseDetailBox = {
  background: "white",
  marginTop: "50px",
  padding: "40px",
  borderRadius: "30px",
};

const detailImage = {
  width: "100%",
  maxWidth: "500px",
  borderRadius: "20px",
  marginTop: "20px",
};

const mapStyle = {
  width: "100%",
  maxWidth: "500px",
  marginTop: "20px",
  borderRadius: "20px",
};

const wormStyle = {
  fontSize: "60px",
  animation: "floatLeaf 4s infinite",
};

const wormStyle2 = {
  fontSize: "60px",
  textAlign: "right",
  animation: "floatLeaf 5s infinite",
};

const fertilizerAnim = {
  textAlign: "center",
  fontSize: "40px",
  color: "green",
  marginBottom: "30px",
};

const farmerLeft = {
  position: "absolute",
  left: "50px",
  bottom: "50px",
  fontSize: "120px",
  animation: "moveFarmer 4s infinite",
};

const farmerRight = {
  position: "absolute",
  right: "50px",
  bottom: "50px",
  fontSize: "120px",
  animation: "moveFarmer 5s infinite",
};

const leaf1 = {
  position: "absolute",
  top: "80px",
  left: "40px",
  fontSize: "45px",
  animation: "floatLeaf 4s infinite ease-in-out",
  zIndex: 5,
};

const leaf2 = {
  position: "absolute",
  top: "200px",
  right: "60px",
  fontSize: "55px",
  animation: "floatLeaf 5s infinite ease-in-out",
  zIndex: 5,
};

const leaf3 = {
  position: "absolute",
  bottom: "100px",
  left: "200px",
  fontSize: "50px",
  animation: "floatLeaf 6s infinite ease-in-out",
  zIndex: 5,
};

const float1 = {
  position: "absolute",
  top: "150px",
  left: "10%",
  fontSize: "60px",
  animation: "floatLeaf 6s infinite ease-in-out",
  opacity: 0.7,
};

const float2 = {
  position: "absolute",
  top: "400px",
  right: "15%",
  fontSize: "70px",
  animation: "floatLeaf 7s infinite ease-in-out",
  opacity: 0.6,
};

const float3 = {
  position: "absolute",
  bottom: "100px",
  left: "20%",
  fontSize: "50px",
  animation: "floatLeaf 8s infinite ease-in-out",
  opacity: 0.5,
};

const uploadFlower1 = {
  position: "absolute",
  top: "120px",
  right: "10%",
  fontSize: "70px",
  animation: "floatLeaf 5s infinite",
};

const uploadFlower2 = {
  position: "absolute",
  bottom: "120px",
  right: "25%",
  fontSize: "80px",
  animation: "floatLeaf 6s infinite",
};

const aiBox = {
  marginTop: "40px",
  background: "rgba(255,255,255,0.2)",
  padding: "30px",
  borderRadius: "25px",
  backdropFilter: "blur(10px)",
  width: "500px",
};

const aiInput = {
  width: "100%",
  padding: "15px",
  borderRadius: "15px",
  border: "none",
  marginTop: "20px",
  fontSize: "16px",
};

const aiAnswerBox = {
  marginTop: "20px",
  background: "white",
  color: "green",
  padding: "20px",
  borderRadius: "15px",
  fontWeight: "bold",
};