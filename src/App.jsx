import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

export default function ValentinesPage() {
  const [accepted, setAccepted] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [showPopup, setShowPopup] = useState(false);
  const [openCurtain, setOpenCurtain] = useState(false);
  const trumpetRef = useRef(null);
  const kissRef = useRef(null);

  useEffect(() => {
    const playTrumpet = () => {
      if (trumpetRef.current) trumpetRef.current.play();
      setOpenCurtain(true);
      window.removeEventListener("click", playTrumpet);
    };
    window.addEventListener("click", playTrumpet);
  }, []);

  const moveNoButton = () => {
    const x = Math.random() * 300 - 150;
    const y = Math.random() * 300 - 150;
    setNoPos({ x, y });
  };

  const handleYes = () => {
    setAccepted(true);
    setShowPopup(true);
    if (kissRef.current) kissRef.current.play();
  };

  return (
    <div style={styles.page}>
      <audio ref={trumpetRef} src="/trumpet.mp3" />
      <audio ref={kissRef} loop>
        <source src="/onekiss.mp3" type="audio/mpeg" />
      </audio>

      {/* Curtain */}
      {!openCurtain && (
        <>
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ duration: 1.5 }}
            style={styles.curtainLeft}
          />
          <motion.div
            initial={{ x: 0 }}
            animate={{ x: "100%" }}
            transition={{ duration: 1.5 }}
            style={styles.curtainRight}
          />
        </>
      )}

      {/* Crown Glow Title */}
      <motion.h1
        animate={{ textShadow: ["0 0 10px gold", "0 0 30px gold", "0 0 10px gold"] }}
        transition={{ duration: 2, repeat: Infinity }}
        style={styles.title}
      >👑 Queen Amridi 👑</motion.h1>

      <h2 style={styles.subtitle}>Will you be my Valentine?</h2>

      {!accepted && (
        <div style={styles.buttonRow}>
          <button style={styles.yesBtn} onClick={handleYes}>Yes 💖</button>

          <motion.button
            onClick={moveNoButton}
            animate={{ x: noPos.x, y: noPos.y }}
            transition={{ type: "spring", stiffness: 200 }}
            style={styles.noBtn}
          >No 😝</motion.button>
        </div>
      )}

      {accepted && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          style={styles.success}
        >Yayyyy ❤️ You made my day!</motion.div>
      )}
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg,#fceabb,#f8b500)",
    overflow: "hidden",
    position: "relative",
    fontFamily: "Cinzel, serif"
  },
  title: {
    fontSize: "clamp(32px,6vw,50px)",
    marginBottom: "10px",
    color: "#8B7500",
    fontFamily: "Old English Text MT, serif",
    zIndex: 2
  },
  subtitle: {
    fontSize: "clamp(20px,5vw,28px)",
    marginBottom: "30px",
    color: "#5c4a00",
    zIndex: 2
  },
  buttonRow: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap",
    zIndex: 2
  },
  yesBtn: {
    padding: "12px 24px",
    background: "#8B7500",
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
    color: "#8B7500",
    fontWeight: "bold"
  },
  curtainLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "50%",
    height: "100%",
    background: "#8B0000",
    zIndex: 5
  },
  curtainRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: "50%",
    height: "100%",
    background: "#8B0000",
    zIndex: 5
  }
};
