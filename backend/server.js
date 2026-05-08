const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("./models/User");
const Order = require("./models/Order");
const Food = require("./models/Food");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  }),
);
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// GET Foods
app.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({
      message: "Failed to fetch foods",
    });
  }
});

// PLACE ORDER
app.post("/orders", async (req, res) => {
  try {
    const order = new Order({
      userEmail: req.body.userEmail,
      items: req.body.items,
      total: req.body.total,
    });

    await order.save();

    res.json({
      message: "Order placed successfully",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// GET USER ORDERS
app.get("/orders/:email", async (req, res) => {
  try {
    const orders = await Order.find({
      userEmail: req.params.email,
    });

    res.json(orders);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Failed to fetch orders",
    });
  }
});

app.put("/orders/cancel/:id", async (req, res) => {
  try {
    await Order.findByIdAndUpdate(req.params.id, {
      status: "Cancelled",
    });

    res.json({ message: "Order cancelled" });
  } catch (err) {
    res.status(500).json({ message: "Cancel failed" });
  }
});

// REGISTER
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({
      email,
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.json({
      message: "Registration successful",
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: err.message,
    });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid email",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid password",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })

    res.json({
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    console.log(err);

    res.status(500).json({
      message: "Server error",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("Server running on", PORT));
