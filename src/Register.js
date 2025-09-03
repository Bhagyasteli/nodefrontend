import { useState } from "react";
import { Link } from "react-router-dom";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) return setMsg("❌ " + (data.error || "Registration failed"));
      setMsg("✅ " + data.message);
    } catch (err) {
      setMsg("❌ Network error");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", textAlign: "center" }}>
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <input
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          style={{ width: "100%", padding: 8, margin: "8px 0" }}
          type="password"
          placeholder="Password (min 6 recommended)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ width: "100%", padding: 10, marginTop: 8 }} type="submit">
          Register
        </button>
      </form>
      <p style={{ minHeight: 24 }}>{msg}</p>
      <p>
        Already have an account? <Link to="/">Login</Link>
      </p>
    </div>
  );
}
