import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNote, updateNote } from "../api/notes";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");

  useEffect(() => {
    getNote(id).then((res) => {
      setTitle(res.data.title);
      setText(res.data.text);
    });
  }, [id]);

  const handleSave = async () => {
    await updateNote(id, title, text);
    navigate("/");
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
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>Edit Note</h2>

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Note Title"
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            marginBottom: 15,
          }}
        />

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={10}
          placeholder="Update your note..."
          style={{
            width: "100%",
            padding: 12,
            fontSize: 16,
            marginBottom: 20,
          }}
        />

        <button
          onClick={handleSave}
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
          Update Note
        </button>
      </div>
    </div>
  );
}
