import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

function Cart() {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");

  // Load cart
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart")) || [];

    setCart(savedCart);
  }, []);

  // Group items
  const groupedCart = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item._id]) {
        acc[item._id] = {
          ...item,
          qty: 1,
        };
      } else {
        acc[item._id].qty += 1;
      }

      return acc;
    }, {}),
  );

  // Total
  const total = groupedCart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0,
  );

  // Place order
  const placeOrder = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
      toast.warning("Please login first");
      return;
    }

    if (!address) {
      toast.warning("Please enter delivery address");
      return;
    }

    if (cart.length === 0) {
      toast.info("Cart is empty!");
      return;
    }

    toast.info("Processing payment...");

    setTimeout(() => {
      axios
        .post("http://localhost:5000/orders", {
          userEmail: user.email,
          items: groupedCart,
          total,
          address,
          status: "Processing",
        })
        .then(() => {
          toast.success("Payment successful! Order placed 🎉");

          setCart([]);
          localStorage.removeItem("cart");
          setAddress("");
        })
        .catch(() => {
          toast.error("Order failed");
        });
    }, 1500);
  };

  // Clear cart
  const clearCart = () => {
    toast.info("Cart cleared");
    localStorage.removeItem("cart");

    setCart([]);
  };

  // Increase qty
  const increaseQty = (item) => {
    const updatedCart = [...cart, item];

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  // Decrease qty
  const decreaseQty = (item) => {
    const updatedCart = [...cart];

    const index = updatedCart.findIndex((i) => i._id === item._id);

    if (index !== -1) {
      updatedCart.splice(index, 1);
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  // Remove item completely
  const removeItem = (itemId) => {
    const updatedCart = cart.filter((item) => item._id !== itemId);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    setCart(updatedCart);
  };

  return (
    <div
      style={{
        padding: "30px",
        backgroundColor: "rgba(215, 153, 51, 0.8)",
        minHeight: "100vh",
      }}
    >
      <h1>Your Cart</h1>

      {groupedCart.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {groupedCart.map((item) => (
            <div
              key={item._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                border: "1px solid #ddd",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "15px",
                background: "#fff",
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              }}
            >
              <div>
                <h3>{item.name}</h3>

                <p>Price: ₹{item.price}</p>

                {/* Quantity Controls */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    marginTop: "10px",
                  }}
                >
                  <button
                    onClick={() => decreaseQty(item)}
                    style={styles.qtyBtn}
                  >
                    -
                  </button>

                  <span
                    style={{
                      fontWeight: "bold",
                    }}
                  >
                    {item.qty}
                  </span>

                  <button
                    onClick={() => increaseQty(item)}
                    style={styles.qtyBtn}
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <p
                  style={{
                    marginTop: "10px",
                    fontWeight: "bold",
                  }}
                >
                  Subtotal: ₹{item.price * item.qty}
                </p>

                {/* Remove */}
                <button
                  onClick={() => removeItem(item._id)}
                  style={styles.removeBtn}
                >
                  Remove
                </button>
              </div>

              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          ))}

          <h2>Total: ₹{total}</h2>
          <h3>Delivery Address</h3>

          <textarea
            placeholder="Enter your full address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              marginBottom: "10px",
            }}
          />

          <button onClick={clearCart} style={styles.clearBtn}>
            Clear Cart
          </button>
          <div style={{ marginTop: "10px" }}>
            <h3>Order Summary</h3>
            <p>Total Items: {groupedCart.length}</p>
            <p>Total Amount: ₹{total}</p>
          </div>
          <button
            onClick={placeOrder}
            style={{
              padding: "10px 20px",
              background: "#ff5722",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Pay & Place Order
          </button>
        </>
      )}
    </div>
  );
}

const styles = {
  qtyBtn: {
    width: "35px",
    height: "35px",
    border: "none",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
  },

  removeBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    borderRadius: "8px",
    background: "red",
    color: "#fff",
    cursor: "pointer",
  },

  orderBtn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    marginRight: "10px",
    fontSize: "16px",
  },

  clearBtn: {
    padding: "12px 25px",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default Cart;
