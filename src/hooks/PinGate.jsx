import React, { useState } from "react";

const PinGate = ({ children }) => {
  const [enteredPin, setEnteredPin] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [error, setError] = useState("");

  const CORRECT_PIN = "2468";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (enteredPin === CORRECT_PIN) {
      setIsUnlocked(true);
      setError("");
    } else {
      setError("Incorrect PIN");
    }
  };

  if (isUnlocked) return children;

  const tapeText = "page in under development • COMING SOON • ";
  const repeated = tapeText.repeat(6);

  const tapeStyle = {
    position: "absolute",
    width: "160%",
    left: "-30%",
    padding: "9px 0",
    backgroundColor: "#feb122",
    color: "#1d204b",
    fontWeight: 800,
    fontSize: "11px",
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    textAlign: "center",
    zIndex: 10,
    boxShadow: "0 2px 10px rgba(0,0,0,0.18)",
    userSelect: "none",
    pointerEvents: "none",
  };

  return (
    <div
      style={{
        position: "relative",
        height: "500px",
        textAlign: "center",
        alignContent: "center",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          ...tapeStyle,
          bottom: "60px",
          top: "auto",
          transform: "rotate(-20deg)",
        }}
      >
        {repeated}
      </div>

      <div
        style={{
          ...tapeStyle,
          bottom: "60px",
          top: "auto",
          transform: "rotate(20deg)",
        }}
      >
        {repeated}
      </div>

      <h2
        style={{
          color: "#1d204b",
          fontSize: "28px",
          position: "relative",
          zIndex: 20,
        }}
      >
        Enter PIN to access
      </h2>
      <h3
        style={{
          color: "#1767be",
          fontSize: "22px",
          margin: "8px 0",
          position: "relative",
          zIndex: 20,
        }}
      >
        🚧 This page is under development
      </h3>
      <p
        style={{
          color: "#3f3f3f",
          fontSize: "18px",
          marginBottom: "16px",
          position: "relative",
          zIndex: 20,
        }}
      >
        Only visible after entering PIN
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ position: "relative", zIndex: 20 }}
      >
        <input
          type="password"
          value={enteredPin}
          onChange={(e) => setEnteredPin(e.target.value)}
          placeholder="Enter PIN"
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            marginRight: "8px",
          }}
        />
        <br />
        <br />
        <button
          type="submit"
          style={{
            backgroundColor: "#feb122",
            color: "#1d204b",
            border: "none",
            padding: "10px 20px",
            fontSize: "16px",
            fontWeight: "bold",
            borderRadius: "4px",
            cursor: "pointer",
          }}
        >
          Unlock
        </button>
      </form>

      {error && (
        <p style={{ color: "red", position: "relative", zIndex: 20 }}>
          {error}
        </p>
      )}
    </div>
  );
};

export default PinGate;
