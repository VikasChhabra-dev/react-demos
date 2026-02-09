import React, { useEffect, useState } from "react";

export default function NotesDemo() {
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
          onKeyDown={(e) => e.key === "Enter" && addNote()}
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

        {notes.length === 0 && <div style={{ opacity: 0.7 }}>No notes yet.</div>}
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
  noteItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 14,
    border: "1px solid rgba(255,255,255,0.1)",
    background: "rgba(0,0,0,0.22)",
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
