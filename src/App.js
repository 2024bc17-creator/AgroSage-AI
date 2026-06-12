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

  // MARKET API STATE
  const [marketPrices, setMarketPrices] = useState([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);

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

  // MARKET PRICE MOCK API
  useEffect(() => {
    if (page === "market") {
      setIsLoadingPrices(true);
      setTimeout(() => {
        const fetchedApiData = [
          { crop: "Rice", price: Math.floor(Math.random() * 500) + 2200, image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg" },
          { crop: "Tomato", price: Math.floor(Math.random() * 300) + 1600, image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg" },
          { crop: "Onion", price: Math.floor(Math.random() * 400) + 2000, image: "https://images.pexels.com/photos/4197445/pexels-photo-4197445.jpeg" },
          { crop: "Wheat", price: Math.floor(Math.random() * 300) + 2000, image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg" },
          { crop: "Corn", price: Math.floor(Math.random() * 200) + 1600, image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg" },
          { crop: "Potato", price: Math.floor(Math.random() * 200) + 1300, image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg" },
        ];
        setMarketPrices(fetchedApiData);
        setIsLoadingPrices(false);
      }, 1500);
    }
  }, [page]);

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
    { name: "Rice Blast", crop: "Rice", image: "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg", definition: "A highly destructive fungal disease causing lesions on leaves and stems.", region: "Humid and wet regions" },
    { name: "Leaf Spot", crop: "Rice / Wheat", image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg", definition: "Causes brown or black spots on leaves, stunting plant growth and yield.", region: "Global, common in damp conditions" },
    { name: "Tomato Wilt", crop: "Tomato", image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg", definition: "Soil-borne pathogens block water vessels, causing sudden drying of the plant.", region: "Warm, tropical climates" },
    { name: "Corn Smut", crop: "Corn", image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg", definition: "Fungal disease creating large, grayish galls on the ears of the corn.", region: "Dry, hot agricultural zones" },
    { name: "Wheat Rust", crop: "Wheat", image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg", definition: "Appears as rust-colored powdery pustules on the stems and leaves.", region: "Temperate farming belts" },
    { name: "Powdery Mildew", crop: "Grapes / Apples", image: "https://images.pexels.com/photos/2886937/pexels-photo-2886937.jpeg", definition: "Forms a white powdery fungal growth on the surface of leaves.", region: "High humidity areas" },
    { name: "Downy Mildew", crop: "Cucumbers", image: "https://images.pexels.com/photos/10050979/pexels-photo-10050979.jpeg", definition: "Creates yellow angular spots on upper leaves and gray fuzz underneath.", region: "Cool, moist environments" },
    { name: "Early Blight", crop: "Potato / Tomato", image: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg", definition: "Causes dark, concentric rings on older foliage, reducing crop lifespan.", region: "Sub-tropical regions" },
    { name: "Late Blight", crop: "Potato", image: "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg", definition: "Notorious for the Irish Potato Famine, rots foliage and tubers rapidly.", region: "Cool, wet areas" },
    { name: "Citrus Canker", crop: "Citrus Fruits", image: "https://images.pexels.com/photos/2294471/pexels-photo-2294471.jpeg", definition: "Bacterial disease causing raised, corky lesions on fruit and leaves.", region: "Tropical and subtropical zones" },
    { name: "Apple Scab", crop: "Apple", image: "https://images.pexels.com/photos/209424/pexels-photo-209424.jpeg", definition: "Fungal disease leaving dark, scabby lesions on the fruit surface.", region: "Regions with rainy springs" },
    { name: "Root Rot", crop: "Various", image: "https://images.pexels.com/photos/4110251/pexels-photo-4110251.jpeg", definition: "Caused by poor drainage, attacking the root system and killing the plant.", region: "Waterlogged soils globally" },
    { name: "Anthracnose", crop: "Beans / Mango", image: "https://images.pexels.com/photos/4197445/pexels-photo-4197445.jpeg", definition: "Creates dark, sunken lesions on stems, leaves, and fruits.", region: "Warm and humid climates" },
    { name: "Black Stem Rust", crop: "Wheat", image: "https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg", definition: "A severe rust disease causing massive crop lodging and yield loss.", region: "Global wheat-growing areas" },
    { name: "Fusarium Wilt", crop: "Banana / Tomato", image: "https://images.pexels.com/photos/533280/pexels-photo-533280.jpeg", definition: "A fungus entering through roots, turning leaves yellow and wilting them.", region: "Tropical soils" },
    { name: "Bacterial Blight", crop: "Cotton / Rice", image: "https://images.pexels.com/photos/1268101/pexels-photo-1268101.jpeg", definition: "Water-soaked streaks appear on leaves, eventually killing the foliage.", region: "Monsoon regions" },
    { name: "Fire Blight", crop: "Pear / Apple", image: "https://images.pexels.com/photos/1459505/pexels-photo-1459505.jpeg", definition: "Bacterial infection making branches look blackened and scorched by fire.", region: "Temperate orchards" },
    { name: "Mosaic Virus", crop: "Tobacco / Tomato", image: "https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg", definition: "Causes a mottled, mosaic-like pattern on leaves, stunting growth.", region: "Widespread, spread by aphids" },
    { name: "Clubroot", crop: "Cabbage", image: "https://images.pexels.com/photos/547263/pexels-photo-547263.jpeg", definition: "Causes roots to swell and distort, preventing nutrient absorption.", region: "Acidic soil regions" },
    { name: "Soybean Rust", crop: "Soybean", image: "https://images.pexels.com/photos/326082/pexels-photo-326082.jpeg", definition: "Aggressive fungal disease causing rapid defoliation of soybean plants.", region: "South America and Southern US" }
  ];

  // 20 FERTILIZER DATA ENTRIES
  const fertilizerData = [
    { name: "Organic Compost", image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg", definition: "Natural decomposed matter improving soil fertility and water retention." },
    { name: "Nitrogen Fertilizer (Urea)", image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg", definition: "High nitrogen content to rapidly boost green leaf growth in early stages." },
    { name: "Potassium Mix (Potash)", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg", definition: "Improves overall plant strength, root health, and drought resistance." },
    { name: "Bio Fertilizer", image: "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg", definition: "Contains living microbes that naturally fix atmospheric nitrogen into the soil." },
    { name: "Phosphorus (DAP)", image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg", definition: "Crucial for flower formation, seed production, and strong root systems." },
    { name: "Bone Meal", image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg", definition: "An organic slow-release source of phosphorus and calcium for flowering plants." },
    { name: "Blood Meal", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg", definition: "A highly concentrated organic nitrogen source, perfect for heavy feeders like corn." },
    { name: "Seaweed Extract", image: "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg", definition: "Provides trace minerals and natural growth hormones to boost plant immunity." },
    { name: "Fish Emulsion", image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg", definition: "Fast-acting organic liquid fertilizer rich in nitrogen and micronutrients." },
    { name: "Worm Castings", image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg", definition: "Earthworm waste that gently conditions the soil and adds rich, accessible nutrients." },
    { name: "Green Manure", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg", definition: "Cover crops grown specifically to be tilled back into the soil to improve fertility." },
    { name: "Calcium Nitrate", image: "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg", definition: "Helps prevent blossom end rot in tomatoes and strengthens plant cell walls." },
    { name: "Epsom Salt (Magnesium)", image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg", definition: "Provides magnesium to help plants absorb phosphorus and create chlorophyll." },
    { name: "Ammonium Sulfate", image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg", definition: "Excellent for lowering soil pH while delivering a heavy dose of nitrogen." },
    { name: "Zinc Sulfate", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg", definition: "Vital for leaf sizing and managing zinc deficiencies in pecan trees and corn." },
    { name: "Peat Moss", image: "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg", definition: "A soil amendment that helps acidic-loving crops and drastically improves water retention." },
    { name: "Guano Fertilizer", image: "https://images.pexels.com/photos/5503257/pexels-photo-5503257.jpeg", definition: "Bat droppings providing a rich, organic blend of NPK and trace minerals." },
    { name: "Liquid Kelp", image: "https://images.pexels.com/photos/4207909/pexels-photo-4207909.jpeg", definition: "Used as a foliar spray to rapidly deliver micro-nutrients directly to the leaves." },
    { name: "Rock Phosphate", image: "https://images.pexels.com/photos/4505161/pexels-photo-4505161.jpeg", definition: "A long-term organic phosphorus source that breaks down slowly over years." },
    { name: "NPK 10-10-10", image: "https://images.pexels.com/photos/6231743/pexels-photo-6231743.jpeg", definition: "A perfectly balanced synthetic fertilizer suitable for general-purpose gardening." }
  ];

  // IMAGE UPLOADS
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  // AUTHENTICATION
  const handleSignup = () => {
    if (name && address && cropType && email && password) {
      setIsAccountCreated(true);
      setIsLogin(true);
      alert("Account Created Successfully. Now Login.");
    } else {
      alert("Please fill all fields");
    }
  };

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
          <source src="https://player.vimeo.com/external/477435136.sd.mp4?s=83d5bc0359f1eb175b9f76a16c73df5dd9ec2b12&profile_id=164&oauth2_token_id=57447761" type="video/mp4" />
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
            <p style={{ marginBottom: "30px" }}>Smart Agriculture Platform</p>
          </div>

          {!isLogin && (
            <>
              <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} style={inputStyle} />
              <input type="text" placeholder="What crop do you grow? (e.g. Rice)" value={cropType} onChange={(e) => setCropType(e.target.value)} style={inputStyle} />
            </>
          )}

          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} style={inputStyle} />

          <button onClick={isLogin ? handleLogin : handleSignup} style={loginBtn}>
            {isLogin ? "Login" : "Create Account"}
          </button>

          <p style={{ textAlign: "center", marginTop: "20px" }}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </p>

          <button
            onClick={() => setIsLogin(!isLogin)}
            style={{ background: "none", border: "none", color: "white", width: "100%", marginTop: "10px", cursor: "pointer", fontWeight: "bold" }}
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </div>
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
          <button style={navBtn} onClick={() => setPage("home")}>Home</button>
          <button style={navBtn} onClick={() => setPage("upload")}>Upload</button>
          <button style={navBtn} onClick={() => setPage("fertilizers")}>Fertilizers</button>
          <button style={navBtn} onClick={() => setPage("market")}>Market Price</button>
          <button style={navBtn} onClick={() => setPage("profile")}>Profile</button>
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
              <h1 style={heroTitle}>Smart Farming Future</h1>
              <p style={heroText}>AI Crop Disease Detection & Fertilizer Guidance</p>
              <button style={heroBtn} onClick={() => setPage("upload")}>Explore Now</button>

              <div style={aiBox}>
                <h2 style={{ margin: 0 }}>🤖 Ask AgroSage AI</h2>
                <input type="text" placeholder="Ask farming questions..." value={question} onChange={(e) => setQuestion(e.target.value)} style={aiInput} />
                <button style={{ ...heroBtn, marginTop: "15px" }} onClick={handleAskAI}>Ask AI</button>
                {aiAnswer && <div style={aiAnswerBox}>{aiAnswer}</div>}
              </div>
            </div>
          </div>

          {/* DISEASES SECTION (20 ITEMS - ALTERNATING) */}
          <div style={{ padding: "60px 40px", background: "white" }}>
            <h1 style={{ ...pageTitle, marginBottom: "50px" }}>🦠 Common Crop Diseases</h1>
            <div style={{ display: "flex", flexDirection: "column", gap: "50px", maxWidth: "1000px", margin: "0 auto" }}>
              {diseaseData.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div key={index} style={{
                    display: "flex", flexDirection: isEven ? "row" : "row-reverse", alignItems: "center", gap: "40px", 
                    background: "#f9fff9", padding: "30px", borderRadius: "20px", boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
                  }}>
                    <div style={{ flex: 1, textAlign: isEven ? "left" : "right" }}>
                      <h2 style={{ color: "green", fontSize: "32px", marginBottom: "15px", marginTop: 0 }}>{index + 1}. {item.name}</h2>
                      <h4 style={{ color: "#555", marginBottom: "15px" }}>🌾 Target Crop: {item.crop}</h4>
                      <p style={{ fontSize: "18px", color: "#444", lineHeight: "1.6" }}>{item.definition}</p>
                      <p style={{ fontSize: "16px", color: "#777", marginTop: "15px", fontWeight: "bold" }}>📍 {item.region}</p>
                    </div>
                    <div style={{ flex: "0 0 300px" }}>
                      <img src={item.image} alt={item.name} style={{ width: "100%", height: "250px", objectFit: "cover", borderRadius: "15px", boxShadow: "0 10px 20px rgba(0,0,0,0.15)" }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* UPLOAD */}
      {page === "upload" && (
        <div style={{ padding: "50px", position: "relative", minHeight: "100vh", background: "linear-gradient(135deg,#d4fc79,#96e6a1,#38ef7d)" }}>
          <h1 style={pageTitle}>🌾 Upload Crop Image</h1>
          <div style={uploadPageBox}>
            <h2 style={{ color: "green" }}>AI Crop Detection Upload</h2>
            <input type="file" onChange={handleImageUpload} />
            {uploadedImage && <img src={uploadedImage} alt="upload" style={{ width: "350px", marginTop: "20px", borderRadius: "20px", border: "6px solid #38ef7d", boxShadow: "0 10px 20px rgba(0,0,0,0.2)" }} />}
            <br />
            <button style={heroBtn}>Upload Crop</button>
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

      {/* MARKET API WITH GRAPH */}
      {page === "market" && (
        <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
          <h1 style={pageTitle}>📈 Live Market Prices API</h1>
          {isLoadingPrices ? (
            <div style={{ textAlign: "center", fontSize: "24px", color: "green", padding: "50px" }}>⏳ Fetching real-time market data...</div>
          ) : (
            <>
              <div style={{ background: "white", padding: "40px", borderRadius: "20px", marginBottom: "50px", boxShadow: "0 10px 25px rgba(0,0,0,0.1)" }}>
                <h2 style={{ color: "green", marginBottom: "30px", textAlign: "center" }}>📊 Live Price Trends (₹ / Quintal)</h2>
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
