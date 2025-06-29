import { useState } from "react";
import { createNote } from "../api/notes";
import { useNavigate } from "react-router-dom";

export default function NewPage() {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      await createNote(title, text);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Failed to create note");
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        backgroundColor: "#000000",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 600,
          backgroundColor: "#000",
          padding: 30,
          borderRadius: 10,
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Create a New Note
        </h2>

        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            marginBottom: 15,
          }}
        />

        <textarea
          placeholder="Write your note here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: 14,
            fontSize: 16,
            backgroundColor: "#1976d2",
            color: "white",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Save Note
        </button>
      </div>
    </div>
  );
}
