import { useEffect, useState } from "react";
import { getNotes, deleteNote } from "../api/notes";
import NoteCard from "../components/NoteCard";
import { useNavigate } from "react-router-dom";
import { getUserEmail } from "../utils/auth";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const userEmail = getUserEmail();

  const fetchNotes = async () => {
    const res = await getNotes();
    setNotes(res.data);
  };

  const handleDelete = async (id) => {
    await deleteNote(id);
    fetchNotes();
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#1e1e1e",
        color: "#fff",
        boxSizing: "border-box",
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "flex-start",
            marginBottom: 30,
          }}
        >
          <div>
            <h1 style={{ marginBottom: 5 }}>NotePal</h1>
            <h3 style={{ marginTop: 0 }}>Welcome, {userEmail}</h3>
          </div>

          <div style={{ textAlign: "right" }}>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                window.location.href = "/login";
              }}
              style={{
                backgroundColor: "#e53935",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
                marginBottom: 10,
                padding: "8px 14px",
              }}
            >
              Logout
            </button>
            <br />
            <button
              onClick={() => navigate("/new")}
              style={{
                padding: "8px 14px",
                backgroundColor: "#1976d2",
                color: "#fff",
                border: "none",
                borderRadius: 4,
                cursor: "pointer",
              }}
            >
              + New Note
            </button>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 20,
            justifyContent: "center",
          }}
        >
          {notes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDelete} />
          ))}
        </div>
      </div>
    </div>
  );
}
