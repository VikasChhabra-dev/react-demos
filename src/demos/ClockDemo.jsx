import React, { useEffect, useState } from "react";

export default function ClockDemo() {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div>
      <p style={styles.p}>A live digital clock using useEffect + setInterval.</p>

      <div style={styles.bigNumber}>{now.toLocaleTimeString()}</div>
      <div style={{ opacity: 0.7 }}>{now.toDateString()}</div>
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
};
