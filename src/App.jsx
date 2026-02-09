import React, { useMemo, useState, useEffect } from "react";

/**
 * React Demos (1 Project) - App.jsx
 * -------------------------------------------------
 * This file contains:
 * - A simple Demo Dashboard (menu + search)
 * - 10 beginner React mini-apps in ONE project
 * - No external libraries needed
 *
 * How to use:
 * 1) Create a Vite React project
 * 2) Replace src/App.jsx with this file
 * 3) Run: npm run dev
*  4) Update Author: Vikas Chhabra
 */

export default function App() {
  const demos = useMemo(
    () => [
      {
        key: "counter",
        title: "1) Counter App",
        component: <CounterDemo />,
      },
      {
        key: "todo",
        title: "2) Todo List",
        component: <TodoDemo />,
      },
      {
        key: "calculator",
        title: "3) Simple Calculator",
        component: <CalculatorDemo />,
      },
      {
        key: "clock",
        title: "4) Digital Clock",
        component: <ClockDemo />,
      },
      {
        key: "stopwatch",
        title: "5) Stopwatch",
        component: <StopwatchDemo />,
      },
      {
        key: "search",
        title: "6) Search Filter",
        component: <SearchFilterDemo />,
      },
      {
        key: "login",
        title: "7) Login Form (Basic Validation)",
        component: <LoginDemo />,
      },
      {
        key: "notes",
        title: "8) Notes App (localStorage)",
        component: <NotesDemo />,
      },
      {
        key: "weather",
        title: "9) Weather App (API)",
        component: <WeatherDemo />,
      },
      {
        key: "gallery",
        title: "10) Image Gallery",
        component: <GalleryDemo />,
      },
    ],
    []
  );

  const [activeKey, setActiveKey] = useState(demos[0].key);
  const [query, setQuery] = useState("");

  const filtered = demos.filter((d) =>
    d.title.toLowerCase().includes(query.toLowerCase())
  );

  const activeDemo = demos.find((d) => d.key === activeKey) ?? demos[0];

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div>
          <h1 style={styles.h1}>React Demos (All in One Project)</h1>
          <p style={styles.sub}>
            Select a demo from the left menu. (Beginner-friendly + clean code)
          </p>
        </div>
      </header>

      <div style={styles.layout}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search demo..."
            style={styles.search}
          />

          <div style={styles.menu}>
            {filtered.map((d) => (
              <button
                key={d.key}
                onClick={() => setActiveKey(d.key)}
                style={{
                  ...styles.menuBtn,
                  ...(activeKey === d.key ? styles.menuBtnActive : {}),
                }}
              >
                {d.title}
              </button>
            ))}

            {filtered.length === 0 && (
              <div style={styles.noResults}>No demos found.</div>
            )}
          </div>
        </aside>

        {/* Main */}
        <main style={styles.main}>
          <div style={styles.card}>
            <h2 style={styles.h2}>{activeDemo.title}</h2>
            <div style={styles.demoArea}>{activeDemo.component}</div>
          </div>

          <footer style={styles.footer}>
            Tip: You can move each demo into separate files later (CounterDemo.jsx,
            TodoDemo.jsx, etc.)
          </footer>
        </main>
      </div>
    </div>
  );
}

/* -----------------------------
   1) Counter Demo
------------------------------ */
function CounterDemo() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p style={styles.p}>A simple useState example.</p>

      <div style={styles.bigNumber}>{count}</div>

      <div style={styles.row}>
        <button style={styles.primaryBtn} onClick={() => setCount(count + 1)}>
          + Increase
        </button>
        <button style={styles.secondaryBtn} onClick={() => setCount(count - 1)}>
          - Decrease
        </button>
        <button style={styles.dangerBtn} onClick={() => setCount(0)}>
          Reset
        </button>
      </div>
    </div>
  );
}

/* -----------------------------
   2) Todo Demo
------------------------------ */
function TodoDemo() {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Build small projects", done: true },
  ]);

  function addTodo() {
    const value = text.trim();
    if (!value) return;

    const newTodo = {
      id: Date.now(),
      text: value,
      done: false,
    };

    setTodos([newTodo, ...todos]);
    setText("");
  }

  function toggleTodo(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id));
  }

  return (
    <div>
      <p style={styles.p}>Add, complete, and delete todos.</p>

      <div style={styles.row}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter todo..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTodo();
          }}
        />
        <button style={styles.primaryBtn} onClick={addTodo}>
          Add
        </button>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {todos.map((t) => (
          <div key={t.id} style={styles.todoRow}>
            <label style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(t.id)}
              />
              <span
                style={{
                  textDecoration: t.done ? "line-through" : "none",
                  opacity: t.done ? 0.6 : 1,
                }}
              >
                {t.text}
              </span>
            </label>

            <button style={styles.dangerBtn} onClick={() => deleteTodo(t.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* -----------------------------
   3) Calculator Demo
------------------------------ */
function CalculatorDemo() {
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
        <button style={styles.secondaryBtn} onClick={() => safeSet((x, y) => x * y)}>
          Multiply
        </button>
        <button
          style={styles.secondaryBtn}
          onClick={() => safeSet((x, y) => (y === 0 ? "Cannot divide by 0" : x / y))}
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

/* -----------------------------
   4) Clock Demo
------------------------------ */
function ClockDemo() {
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

/* -----------------------------
   5) Stopwatch Demo
------------------------------ */
function StopwatchDemo() {
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
        <button
          style={styles.primaryBtn}
          onClick={() => setRunning((r) => !r)}
        >
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

/* -----------------------------
   6) Search Filter Demo
------------------------------ */
function SearchFilterDemo() {
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

        {filtered.length === 0 && (
          <div style={{ opacity: 0.7 }}>No results found.</div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------
   7) Login Demo
------------------------------ */
function LoginDemo() {
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

/* -----------------------------
   8) Notes Demo (localStorage)
------------------------------ */
function NotesDemo() {
  const LS_KEY = "demo_notes_v1";

  const [text, setText] = useState("");
  const [notes, setNotes] = useState(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(LS_KEY, JSON.stringify(notes));
  }, [notes]);

  function addNote() {
    const v = text.trim();
    if (!v) return;

    setNotes([{ id: Date.now(), text: v }, ...notes]);
    setText("");
  }

  function deleteNote(id) {
    setNotes(notes.filter((n) => n.id !== id));
  }

  return (
    <div>
      <p style={styles.p}>Notes saved in browser localStorage.</p>

      <div style={styles.row}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Write a note..."
          style={styles.input}
          onKeyDown={(e) => {
            if (e.key === "Enter") addNote();
          }}
        />
        <button style={styles.primaryBtn} onClick={addNote}>
          Save
        </button>
      </div>

      <div style={{ marginTop: 16, display: "grid", gap: 10 }}>
        {notes.map((n) => (
          <div key={n.id} style={styles.noteItem}>
            <div>{n.text}</div>
            <button style={styles.dangerBtn} onClick={() => deleteNote(n.id)}>
              Delete
            </button>
          </div>
        ))}

        {notes.length === 0 && (
          <div style={{ opacity: 0.7 }}>No notes yet.</div>
        )}
      </div>
    </div>
  );
}

/* -----------------------------
   9) Weather Demo (API)
------------------------------ */
function WeatherDemo() {
  /**
   * IMPORTANT:
   * This demo uses Open-Meteo (free, no API key)
   * We first convert city -> lat/long using geocoding endpoint.
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
          onKeyDown={(e) => {
            if (e.key === "Enter") fetchWeather();
          }}
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

/* -----------------------------
   10) Gallery Demo
------------------------------ */
function GalleryDemo() {
  const images = [
    {
      id: 1,
      title: "Mountain",
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 2,
      title: "Beach",
      url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 3,
      title: "City",
      url: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=900&q=60",
    },
    {
      id: 4,
      title: "Forest",
      url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=900&q=60",
    },
  ];

  const [active, setActive] = useState(images[0]);

  return (
    <div>
      <p style={styles.p}>A simple image gallery with preview.</p>

      <div style={styles.gallery}>
        <div style={styles.previewBox}>
          <img
            src={active.url}
            alt={active.title}
            style={styles.previewImg}
          />
          <div style={{ marginTop: 10, fontWeight: 700 }}>{active.title}</div>
        </div>

        <div style={styles.thumbs}>
          {images.map((img) => (
            <button
              key={img.id}
              onClick={() => setActive(img)}
              style={{
                ...styles.thumbBtn,
                ...(active.id === img.id ? styles.thumbActive : {}),
              }}
            >
              <img src={img.url} alt={img.title} style={styles.thumbImg} />
              <div style={styles.thumbTitle}>{img.title}</div>
            </button>
          ))}
        </div>
      </div>

      <div style={{ opacity: 0.7, marginTop: 10 }}>
        (Uses free Unsplash images)
      </div>
    </div>
  );
}

/* -----------------------------
   Styles
------------------------------ */
const styles = {
  page: {
    minHeight: "100vh",
    background: "#0b1220",
    color: "#eaf0ff",
    fontFamily:
      "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
  },
  header: {
    padding: 20,
    borderBottom: "1px solid rgba(255,255,255,0.08)",
  },
  h1: {
    margin: 0,
    fontSize: 22,
    fontWeight: 800,
  },
  sub: {
    margin: "6px 0 0",
    opacity: 0.75,
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "320px 1fr",
    gap: 16,
    padding: 16,
  },
  sidebar: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 14,
    height: "calc(100vh - 110px)",
    position: "sticky",
    top: 16,
    overflow: "auto",
  },
  search: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "#eaf0ff",
    marginBottom: 12,
  },
  menu: {
    display: "grid",
    gap: 10,
  },
  menuBtn: {
    textAlign: "left",
    padding: "12px 12px",
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.25)",
    color: "#eaf0ff",
    cursor: "pointer",
    fontWeight: 600,
  },
  menuBtnActive: {
    background: "rgba(59,130,246,0.20)",
    border: "1px solid rgba(59,130,246,0.55)",
  },
  noResults: {
    opacity: 0.7,
    padding: 12,
  },
  main: {
    minHeight: "calc(100vh - 110px)",
  },
  card: {
    background: "rgba(255,255,255,0.04)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 18,
    padding: 18,
  },
  h2: {
    margin: 0,
    fontSize: 18,
    fontWeight: 800,
  },
  demoArea: {
    marginTop: 14,
  },
  footer: {
    opacity: 0.65,
    marginTop: 14,
    fontSize: 13,
  },
  p: {
    marginTop: 0,
    opacity: 0.8,
  },
  row: {
    display: "flex",
    gap: 10,
    alignItems: "center",
  },
  bigNumber: {
    fontSize: 56,
    fontWeight: 900,
    margin: "10px 0",
    letterSpacing: 1,
  },
  input: {
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.12)",
    outline: "none",
    background: "rgba(0,0,0,0.25)",
    color: "#eaf0ff",
    width: 240,
  },
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
  },
  secondaryBtn: {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(255,255,255,0.14)",
    background: "rgba(0,0,0,0.20)",
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
  todoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
  },
  listItem: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
    width: "100%",
    maxWidth: 520,
  },
  errorBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(239,68,68,0.55)",
    background: "rgba(239,68,68,0.18)",
  },
  successBox: {
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(34,197,94,0.55)",
    background: "rgba(34,197,94,0.18)",
  },
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
  },
  weatherBox: {
    padding: 14,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
    width: "fit-content",
  },
  gallery: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 14,
    alignItems: "start",
  },
  previewBox: {
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
  },
  previewImg: {
    width: "100%",
    height: 340,
    objectFit: "cover",
    borderRadius: 14,
    display: "block",
  },
  thumbs: {
    display: "grid",
    gap: 10,
  },
  thumbBtn: {
    textAlign: "left",
    padding: 10,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.10)",
    background: "rgba(0,0,0,0.22)",
    cursor: "pointer",
    color: "#eaf0ff",
  },
  thumbActive: {
    border: "1px solid rgba(59,130,246,0.65)",
    background: "rgba(59,130,246,0.16)",
  },
  thumbImg: {
    width: "100%",
    height: 90,
    objectFit: "cover",
    borderRadius: 12,
    display: "block",
  },
  thumbTitle: {
    marginTop: 8,
    fontWeight: 700,
    opacity: 0.9,
  },
};
