import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../api/auth";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const res = await register(email, password);
      localStorage.setItem("token", res.data.token);
      navigate("/login");
    } catch (e) {
      alert("User already exists");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <br></br>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <br></br>
      <br></br>

      <button onClick={handleSubmit}>Register</button>

      <p>
        Already have an account?{" "}
        <a href="/login" style={{ color: "blue" }}>
          Log in here
        </a>
      </p>
    </div>
  );
}
