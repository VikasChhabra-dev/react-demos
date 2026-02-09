import React, { useState } from "react";

export default function SearchFilterDemo() {
  const items = [
    "Apple",
    "Banana",
    "Mango",
    "Orange",
    "Grapes",
    "Pineapple",
    "Strawberry",
    "Watermelon",
    "Papaya",
  ];

  const [q, setQ] = useState("");

  const filtered = items.filter((x) => x.toLowerCase().includes(q.toLowerCase()));

  return (
    <div>
      <p style={styles.p}>Instant search filtering from an array.</p>

      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search fruit..."
        style={styles.inputFull}
      />

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {filtered.map((x) => (
          <div key={x} style={styles.listItem}>
            {x}
          </div>
        ))}

        {filtered.length === 0 && <div style={{ opacity: 0.7 }}>No results found.</div>}
      </div>
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
  listItem: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
    width: "100%",
    maxWidth: 520,
  },
};
