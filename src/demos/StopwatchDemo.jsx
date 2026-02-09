import React, { useEffect, useState } from "react";

export default function StopwatchDemo() {
  const [ms, setMs] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;

    const id = setInterval(() => setMs((v) => v + 100), 100);
    return () => clearInterval(id);
  }, [running]);

  const seconds = (ms / 1000).toFixed(1);

  return (
    <div>
      <p style={styles.p}>A simple stopwatch.</p>

      <div style={styles.bigNumber}>{seconds}s</div>

      <div style={styles.row}>
        <button style={styles.primaryBtn} onClick={() => setRunning((r) => !r)}>
          {running ? "Pause" : "Start"}
        </button>

        <button
          style={styles.dangerBtn}
          onClick={() => {
            setRunning(false);
            setMs(0);
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

const styles = {
  p: { marginTop: 0, opacity: 0.8 },
  bigNumber: {
    fontSize: 56,
    fontWeight: 900,
    margin: "10px 0",
    letterSpacing: 1,
  },
  row: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  primaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(59,130,246,0.65)",
    background: "rgba(59,130,246,0.22)",
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
