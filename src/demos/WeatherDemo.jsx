import React, { useEffect, useState } from "react";

export default function WeatherDemo() {
  /**
   * Uses Open-Meteo API (free, no API key)
   * Steps:
   * 1) City -> lat/long using geocoding
   * 2) Fetch weather forecast
   */

  const [city, setCity] = useState("Chandigarh");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState(null);

  async function fetchWeather() {
    const q = city.trim();
    if (!q) return;

    setLoading(true);
    setError("");
    setData(null);

    try {
      // 1) Geocoding
      const geoRes = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
          q
        )}&count=1&language=en&format=json`
      );

      if (!geoRes.ok) throw new Error("Geocoding failed");

      const geoJson = await geoRes.json();
      const place = geoJson?.results?.[0];

      if (!place) {
        setError("City not found. Try another.");
        return;
      }

      // 2) Forecast
      const { latitude, longitude, name, country } = place;

      const wRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m`
      );

      if (!wRes.ok) throw new Error("Weather fetch failed");

      const wJson = await wRes.json();
      const current = wJson?.current;

      setData({
        place: `${name}, ${country}`,
        temperature: current?.temperature_2m,
        wind: current?.wind_speed_10m,
      });
    } catch {
      setError("Something went wrong. Check internet.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchWeather();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <p style={styles.p}>Weather app using Open-Meteo API (no key required).</p>

      <div style={styles.row}>
        <input
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && fetchWeather()}
        />
        <button style={styles.primaryBtn} onClick={fetchWeather}>
          Search
        </button>
      </div>

      <div style={{ marginTop: 16 }}>
        {loading && <div>Loading...</div>}
        {error && <div style={styles.errorBox}>{error}</div>}

        {data && (
          <div style={styles.weatherBox}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>{data.place}</div>
            <div style={{ marginTop: 8 }}>
              🌡️ Temperature: <strong>{data.temperature}°C</strong>
            </div>
            <div style={{ marginTop: 4 }}>
              💨 Wind Speed: <strong>{data.wind} km/h</strong>
            </div>
          </div>
        )}
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
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(239,68,68,0.55)",
    background: "rgba(239,68,68,0.18)",
    maxWidth: 520,
  },
  weatherBox: {
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
    width: "fit-content",
  },
};
