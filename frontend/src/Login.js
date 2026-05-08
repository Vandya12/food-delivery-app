import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginUser = async () => {
    try {
      const res = await axios.post(
        "https://food-delivery-app-j0eg.onrender.com/login",
        {
          email,
          password,
        },
      );

      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      alert("Login successful");

      navigate("/");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Welcome!</h1>

        <input
          type="email"
          placeholder="Enter Email"
          style={styles.input}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter Password"
          style={styles.input}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button style={styles.button} onClick={loginUser}>
          Login
        </button>
        <p
          style={{
            textAlign: "center",
            cursor: "pointer",
            color: "#D79933",
          }}
          onClick={() => {
            navigate("/signup");
          }}
        >
          Don't have an account? Sign Up
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#D79933",
  },

  card: {
    background: "#fff",
    padding: "40px",
    borderRadius: "15px",
    width: "350px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },

  title: {
    textAlign: "center",
    color: "#7A431D",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    padding: "12px",
    background: "#7A431D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
    transition: "0.3s",
  },
};

export default Login;
