import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

import Item from "./Components/Item/Item";

function App() {
  const [foods, setFoods] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart")) || [],
  );
  const [address, setAddress] = useState("");
  // Fetch food items
  useEffect(() => {
    axios
      .get("http://localhost:5000/foods")
      .then((res) => setFoods(res.data))
      .catch((err) => console.log("Error fetching foods:", err));
  }, []);

  // Add to cart (safe version)
  const addToCart = (item) => {
    const updatedCart = [...cart, item];

    setCart(updatedCart);

    localStorage.setItem("cart", JSON.stringify(updatedCart));

    toast.success(`${item.name} added to cart`);
  };

  // Group cart items (for quantity display)
  const groupedCart = Object.values(
    cart.reduce((acc, item) => {
      if (!acc[item._id]) {
        acc[item._id] = { ...item, qty: 1 };
      } else {
        acc[item._id].qty += 1;
      }
      return acc;
    }, {}),
  );

  // Calculate total
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
  const filteredFoods = foods.filter((food) => {
    const matchesSearch = food.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory = category === "All" || food.category === category;

    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      {/* Navbar */}

      <div style={{ padding: 20 }}>
        <h2>Menu</h2>

        <input
          type="text"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "12px",
            width: "300px",
            marginBottom: "20px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            fontSize: "16px",
          }}
        />

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "20px",
            flexWrap: "wrap",
          }}
        >
          {["All", "South Indian", "North Indian", "Snacks"].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              style={{
                padding: "10px 15px",
                border: "none",
                borderRadius: "20px",
                cursor: "pointer",
                background: category === cat ? "#ff5722" : "#eee",
                color: category === cat ? "#fff" : "#000",
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Food Items */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredFoods.map((f) => (
            <Item
              key={f._id}
              name={f.name}
              price={f.price}
              image={f.image}
              addToCart={() => addToCart(f)}
            />
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
