import { useNavigate } from "react-router-dom";

export default function NoteCard({ note, onDelete }) {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: 200,
        height: 150,
        background: "#000",
        border: "1px solid #ccc",
        borderRadius: "8px",
        margin: 10,
        padding: 10,
        overflow: "hidden",
      }}
    >
      <h3 style={{ fontSize: 16 }}>{note.title}</h3>
      <p style={{ fontSize: 12 }}>{note.text.slice(0, 60)}...</p>

      <div style={{ marginTop: 10 }}>
        <button
          onClick={() => navigate(`/edit/${note.id}`)}
          style={{ marginRight: 8 }}
        >
          Edit
        </button>
        <button onClick={() => onDelete(note.id)} style={{ color: "red" }}>
          Delete
        </button>
      </div>
    </div>
  );
}
