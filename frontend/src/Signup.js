import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const registerUser = async () => {
    try {
      const res = await axios.post(
        "https://food-delivery-app-j0eg.onrender.com/register",
        {
          name,
          email,
          password,
        },
      );

      alert(res.data.message);

      navigate("https://food-delivery-app-j0eg.onrender.com/login");
    } catch (err) {
      console.log(err);

      if (err.response && err.response.data.message) {
        alert(err.response.data.message);
      } else {
        alert("Server error");
      }
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Account</h1>

        <input
          type="text"
          placeholder="Enter Name"
          style={styles.input}
          onChange={(e) => setName(e.target.value)}
        />

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

        <button style={styles.button} onClick={registerUser}>
          Sign Up
        </button>
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
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
  },

  title: {
    textAlign: "center",
    color: "#7A431D",
  },

  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    background: "#7A431D",
    color: "#fff",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Signup;
