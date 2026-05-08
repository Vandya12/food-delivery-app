import { useEffect, useState } from "react";
import axios from "axios";

function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [orders, setOrders] = useState([]);

  // Fetch orders
  useEffect(() => {
    if (!user?.email) return;

    axios
      .get(`https://food-delivery-app-j0eg.onrender.com/orders/${user.email}`)
      .then((res) => {
        setOrders(res.data);
      })
      .catch((err) => {
        console.log("Error fetching orders:", err);
      });
  }, [user?.email]);

  // Simulated order status updates
  useEffect(() => {
    if (!orders.length) return;

    const interval = setInterval(() => {
      setOrders((prev) =>
        prev.map((order) => {
          const status = order.status || "Processing";

          // ❌ stop update if cancelled or delivered
          if (status === "Cancelled" || status === "Delivered") {
            return order;
          }

          if (status === "Processing") {
            return { ...order, status: "Preparing" };
          }
          if (status === "Preparing") {
            return { ...order, status: "Out for Delivery" };
          }
          if (status === "Out for Delivery") {
            return { ...order, status: "Delivered" };
          }

          return order;
        }),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [orders.length]);

  if (!user) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Please login to view profile</h2>
      </div>
    );
  }

  // Status color
  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "orange";
      case "Preparing":
        return "blue";
      case "Out for Delivery":
        return "purple";
      case "Delivered":
        return "green";
      case "Cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  // Progress step helper
  const getStep = (status) => {
    switch (status) {
      case "Processing":
        return 1;
      case "Preparing":
        return 2;
      case "Out for Delivery":
        return 3;
      case "Delivered":
        return 4;
      default:
        return 1;
    }
  };

  // CANCEL ORDER FUNCTION
  const cancelOrder = async (orderId) => {
    try {
      await axios.put(`https://food-delivery-app-j0eg.onrender.com/orders/cancel/${orderId}`);

      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId ? { ...order, status: "Cancelled" } : order,
        ),
      );
    } catch (err) {
      console.log("Cancel error:", err);
    }
  };

  return (
    <div
      style={{ padding: "30px", backgroundColor: "rgba(215, 153, 51, 0.8)" }}
    >
      <h1>Profile</h1>

      {/* User Info */}
      <div
        style={{
          padding: "15px",
          border: "1px solid #ddd",
          borderRadius: "10px",
          marginBottom: "20px",
          backgroundColor: "#D79933",
        }}
      >
        <h3>Name: {user.name}</h3>
        <h3>Email: {user.email}</h3>
      </div>

      <h2>Order History</h2>

      {orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        orders.map((order, index) => {
          const status = order.status || "Processing";
          const step = getStep(status);

          return (
            <div
              key={index}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "20px",
                borderRadius: "10px",
                background: "#D79933",
              }}
            >
              {/* Status */}
              <p>
                <b>Status:</b>{" "}
                <span
                  style={{
                    color: getStatusColor(status),
                    fontWeight: "bold",
                  }}
                >
                  {status}
                </span>
              </p>

              {/* Progress Bar */}
              <div
                style={{
                  display: "flex",
                  margin: "15px 0",
                  alignItems: "center",
                }}
              >
                {["Ordered", "Preparing", "On the way", "Delivered"].map(
                  (label, i) => (
                    <div key={i} style={{ flex: 1, textAlign: "center" }}>
                      <div
                        style={{
                          width: "18px",
                          height: "18px",
                          borderRadius: "50%",
                          margin: "0 auto",
                          background: i < step ? "green" : "#ccc",
                        }}
                      />
                      <p style={{ fontSize: "12px", marginTop: "5px" }}>
                        {label}
                      </p>
                    </div>
                  ),
                )}
              </div>

              {/* Total */}
              <h3>Total: ₹{order.total}</h3>

              {/* Address */}
              {order.address && (
                <p>
                  <b>Address:</b> {order.address}
                </p>
              )}

              {/* Items */}
              <h4>Items:</h4>
              {order.items.map((item, i) => (
                <p key={i}>
                  {item.name} × {item.qty} = ₹{item.price * item.qty}
                </p>
              ))}

              {/* Date */}
              {order.createdAt && (
                <p style={{ fontSize: "12px", color: "gray" }}>
                  Ordered on: {new Date(order.createdAt).toLocaleString()}
                </p>
              )}

              {/* ❌ CANCEL BUTTON */}
              {status !== "Delivered" && status !== "Cancelled" && (
                <button
                  onClick={() => cancelOrder(order._id)}
                  style={{
                    marginTop: "10px",
                    padding: "8px 15px",
                    background: "red",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                  }}
                >
                  Cancel Order
                </button>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Profile;
