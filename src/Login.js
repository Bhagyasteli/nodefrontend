import { useState } from "react";
import { Link } from "react-router-dom";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setMsg("");
    try {
      const res = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok) return setMsg("❌ " + (data.error || "Login failed"));
      setMsg("✅ " + data.message);
      // You can store data.user in state/localStorage if you add a dashboard later
    } catch (err) {
      setMsg("❌ Network error");
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: "60px auto", textAlign: "center" }}>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
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
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button style={{ width: "100%", padding: 10, marginTop: 8 }} type="submit">
          Login
        </button>
      </form>
      <p style={{ minHeight: 24 }}>{msg}</p>
      <p>
        Don’t have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}
