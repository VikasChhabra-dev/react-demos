import React, { useState } from "react";

export default function LoginDemo() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess(false);

    if (!email.includes("@")) {
      setError("Please enter a valid email.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setError("");
    setSuccess(true);
  }

  return (
    <div>
      <p style={styles.p}>Basic form validation example.</p>

      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          style={styles.inputFull}
        />

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          style={styles.inputFull}
        />

        <button style={styles.primaryBtn} type="submit">
          Login
        </button>

        {error && <div style={styles.errorBox}>{error}</div>}
        {success && <div style={styles.successBox}>Login successful ✅</div>}
      </form>
    </div>
  );
}

const styles = {
  p: { marginTop: 0, opacity: 0.8 },
  inputFull: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "#eaf0ff",
    width: "100%",
    maxWidth: 520,
  },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.65)",
    background: "rgba(59,130,246,0.22)",
    color: "#eaf0ff",
    cursor: "pointer",
    fontWeight: 700,
    width: "fit-content",
  },
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(239,68,68,0.55)",
    background: "rgba(239,68,68,0.18)",
    maxWidth: 520,
  },
  successBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(34,197,94,0.55)",
    background: "rgba(34,197,94,0.18)",
    maxWidth: 520,
  },
};
