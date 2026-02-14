import { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function ValentinesPage() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const audioRef = useRef(null);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    setShowPopup(true);
    if (audioRef.current) audioRef.current.play();
  };

  return (
    <div style={styles.page}>
      <audio ref={audioRef} loop>
        <source src="/onekiss.mp3" type="audio/mpeg" />
      </audio>

      {accepted && (
        <div style={styles.fireworksContainer}>
          {[...Array(40)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 1 }}
              animate={{ scale: 3, opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
              style={{
                ...styles.firework,
                top: Math.random() * 100 + "%",
                left: Math.random() * 100 + "%",
                backgroundColor: ["#ff4d6d", "#ff99c8", "#cdb4db", "#ffc8dd", "#ffccd5"][Math.floor(Math.random()*5)]
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.card}>
        <h1 style={styles.title}>Happy Valentine's Day My Pinkie Girl!!❤️</h1>
        <h2 style={styles.subtitle}>Amridi, Will you be my Valentine?</h2>

        {!accepted && (
          <div style={styles.buttonRow}>
            <button style={styles.yesBtn} onClick={handleYes}>Yes 💖</button>

            <motion.button
              onMouseEnter={moveNoButton}
              animate={{ x: noPos.x, y: noPos.y }}
              transition={{ type: "spring", stiffness: 200 }}
              style={styles.noBtn}
            >
              No 😝
            </motion.button>
          </div>
        )}

        {accepted && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            style={styles.success}
          >
            Yayyyy ❤️ You made my day!
          </motion.div>
        )}
      </div>

      {showPopup && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={styles.popupOverlay}
        >
          <div style={styles.popup}>
            <h2 style={{ color: "#ff4d6d" }}>For You ❤️</h2>
            <p>
              Amridi, you make my world brighter every day.
              Your smile is my favourite place.
              I am lucky to have you ❤️
            </p>
            <button style={styles.closeBtn} onClick={()=>setShowPopup(false)}>
              Close 💕
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#ffe5ec,#ffc2d1)",
    overflow: "hidden",
    position: "relative",
    fontFamily: "sans-serif"
  },
  card: {
    textAlign: "center",
    background: "white",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    zIndex: 2,
    maxWidth: "90%"
  },
  title: {
    fontSize: "clamp(28px,5vw,42px)",
    marginBottom: "10px"
  },
  subtitle: {
    fontSize: "clamp(20px,4vw,26px)",
    marginBottom: "30px"
  },
  buttonRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  yesBtn: {
    padding: "12px 24px",
    background: "#ff4d6d",
    border: "none",
    borderRadius: "20px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer"
  },
  noBtn: {
    padding: "12px 24px",
    background: "#6c757d",
    border: "none",
    borderRadius: "20px",
    color: "white",
    fontSize: "18px",
    cursor: "pointer"
  },
  success: {
    marginTop: "20px",
    fontSize: "24px",
    color: "#ff4d6d",
    fontWeight: "bold"
  },
  popupOverlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.4)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3
  },
  popup: {
    background: "white",
    padding: "20px",
    borderRadius: "20px",
    maxWidth: "90%"
  },
  closeBtn: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#ff4d6d",
    border: "none",
    borderRadius: "12px",
    color: "white"
  },
  fireworksContainer: {
    position: "absolute",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none"
  },
  firework: {
    position: "absolute",
    width: "10px",
    height: "10px",
    borderRadius: "50%"
  }
};
