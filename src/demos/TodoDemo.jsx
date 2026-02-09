import React, { useState } from "react";

export default function TodoDemo() {
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
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
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
  todoRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
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
