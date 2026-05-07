import React from "react";
import "./Item.css";

function Item({ name, price, image, addToCart }) {
  return (
    <div style={styles.card}>
      <img src={image} alt={name} style={styles.image} />

      <div style={styles.info}>
        <h3>{name}</h3>
        <p>₹{price}</p>

        <button style={styles.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}

const styles = {
  card: {
    borderRadius: "15px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    background: "#fff",
    transition: "0.3s",
  },

  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
  },

  info: {
    padding: "10px",
  },

  button: {
    padding: "8px",
    width: "100%",
    background: "#ff4d4d",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Item;
