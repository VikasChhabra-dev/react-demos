import React, { useState } from "react";

export default function GalleryDemo() {
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

const styles = {
  p: { marginTop: 0, opacity: 0.8 },
  gallery: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: 14,
    alignItems: "start",
  },
  previewBox: {
    padding: 12,
    borderRadius: 16,
    border: "1px solid rgba(255,255,255,0.1)",
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
    border: "1px solid rgba(255,255,255,0.1)",
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
