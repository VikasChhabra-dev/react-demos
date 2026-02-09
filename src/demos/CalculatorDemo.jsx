import React, { useState } from "react";

export default function CalculatorDemo() {
  const [a, setA] = useState("");
  const [b, setB] = useState("");
  const [result, setResult] = useState(null);

  const numA = Number(a);
  const numB = Number(b);

  function safeSet(fn) {
    if (Number.isNaN(numA) || Number.isNaN(numB)) {
      setResult("Invalid number");
      return;
    }
    setResult(fn(numA, numB));
  }

  return (
    <div>
      <p style={styles.p}>A tiny calculator using controlled inputs.</p>

      <div style={styles.row}>
        <input
          value={a}
          onChange={(e) => setA(e.target.value)}
          placeholder="Number A"
          style={styles.input}
        />
        <input
          value={b}
          onChange={(e) => setB(e.target.value)}
          placeholder="Number B"
          style={styles.input}
        />
      </div>

      <div style={{ ...styles.row, flexWrap: "wrap", marginTop: 12 }}>
        <button style={styles.primaryBtn} onClick={() => safeSet((x, y) => x + y)}>
          Add
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => safeSet((x, y) => x - y)}
        >
          Subtract
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => safeSet((x, y) => x * y)}
        >
          Multiply
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() =>
            safeSet((x, y) => (y === 0 ? "Cannot divide by 0" : x / y))
          }
        >
          Divide
        </button>

        <button
          style={styles.dangerBtn}
          onClick={() => {
            setA("");
            setB("");
            setResult(null);
          }}
        >
          Clear
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        <strong>Result:</strong> {result === null ? "—" : String(result)}
      </div>
    </div>
  );
}

const styles = {
  p: { marginTop: 0, opacity: 0.8 },
  row: { display: "flex", gap: 10, alignItems: "center" },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "#eaf0ff",
    width: 240,
  },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.65)",
    background: "rgba(59,130,246,0.22)",
    color: "#eaf0ff",
    cursor: "pointer",
    fontWeight: 700,
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.2)",
    color: "#eaf0ff",
    cursor: "pointer",
    fontWeight: 700,
  },
  dangerBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(239,68,68,0.55)",
    background: "rgba(239,68,68,0.18)",
    color: "#eaf0ff",
    cursor: "pointer",
    fontWeight: 700,
  },
};
