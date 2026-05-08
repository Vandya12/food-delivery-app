// seed.js
const mongoose = require("mongoose");
const Food = require("./models/Food");

// MongoDB connection
mongoose.connect(
  "mongodb://dev_user:dev_123@ac-giq1aj8-shard-00-00.ps2lrny.mongodb.net:27017,ac-giq1aj8-shard-00-01.ps2lrny.mongodb.net:27017,ac-giq1aj8-shard-00-02.ps2lrny.mongodb.net:27017/foodapp?ssl=true&replicaSet=atlas-z8yyqe-shard-0&authSource=admin&retryWrites=true&w=majority",
);

// Food list
const vegItems = [
  "Masala Dosa",
  "Plain Dosa",
  "Rava Dosa",
  "Idli",
  "Vada",
  "Upma",
  "Pongal",
  "Curd Rice",
  "Lemon Rice",
  "Tomato Rice",
  "Paneer Butter Masala",
  "Palak Paneer",
  "Kadai Paneer",
  "Dal Tadka",
  "Dal Makhani",
  "Chole",
  "Rajma",
  "Veg Biryani",
  "Jeera Rice",
  "Fried Rice",
  "Veg Noodles",
  "Manchurian",
  "Spring Roll",
  "Aloo Paratha",
  "Gobi Paratha",
  "Paneer Paratha",
  "Chapati",
  "Butter Naan",
  "Tandoori Roti",
  "Samosa",
  "Kachori",
  "Dhokla",
  "Thepla",
  "Poha",
  "Sabudana Khichdi",
  "Pav Bhaji",
  "Veg Sandwich",
  "Cheese Sandwich",
  "Burger",
  "Pizza Veg",
  "Margherita Pizza",
  "Pani Puri",
  "Bhel Puri",
  "Sev Puri",
  "Rasgulla",
  "Gulab Jamun",
  "Jalebi",
  "Ice Cream",
  "Falooda",
];

// 🔥 Real image map
const imageMap = {
  "Masala Dosa":
    "https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg",
  "Plain Dosa":
    "https://images.pexels.com/photos/32229637/pexels-photo-32229637.png",
  "Rava Dosa":
    "https://images.pexels.com/photos/15698223/pexels-photo-15698223.jpeg",
  Idli: "https://images.pexels.com/photos/36854501/pexels-photo-36854501.jpeg",
  Vada: "https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg",
  Pongal:
    "https://media.istockphoto.com/id/2159685833/photo/ven-pongal-traditional-indian-savoury-rice-dish-made-during-celebrating-pongal-festival.jpg?s=612x612&w=0&k=20&c=gMwHQ62zjJiaFr7p3Vz0E-bPIfKG3zZLwbPj4Q7xRNI=",
  "Lemon Rice":
    "https://images.pexels.com/photos/4595312/pexels-photo-4595312.jpeg",
  "Tomato Rice":
    "https://images.pexels.com/photos/31109631/pexels-photo-31109631.jpeg",
  "Curd Rice":
    "https://images.pexels.com/photos/29684991/pexels-photo-29684991.jpeg",
  "Paneer Butter Masala":
    "https://images.pexels.com/photos/30858402/pexels-photo-30858402.jpeg",
  "Palak Paneer":
    "https://images.pexels.com/photos/9609843/pexels-photo-9609843.jpeg",
  "Dal Tadka":
    "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg",
  Rajma: "https://images.pexels.com/photos/8992843/pexels-photo-8992843.jpeg",
  "Veg Biryani":
    "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg",
  "Fried Rice":
    "https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg",
  "Veg Noodles":
    "https://images.pexels.com/photos/28674525/pexels-photo-28674525.jpeg",
  "Spring Roll":
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  "Aloo Paratha":
    "https://images.pexels.com/photos/9609846/pexels-photo-9609846.jpeg",
  Chapati:
    "https://images.pexels.com/photos/20408462/pexels-photo-20408462.jpeg",
  Samosa: "https://images.pexels.com/photos/9609847/pexels-photo-9609847.jpeg",
  Dhokla: "https://images.pexels.com/photos/9609849/pexels-photo-9609849.jpeg",
  Burger: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
  "Pizza Veg":
    "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
  "Ice Cream":
    "https://images.pexels.com/photos/1352278/pexels-photo-1352278.jpeg",
};

// Create 100 items
const foods = [];

for (let i = 0; i < 100; i++) {
  const itemName = vegItems[i % vegItems.length];

  foods.push({
    name: itemName,
    category: i % 2 === 0 ? "South Indian" : "North Indian",
    price: Math.floor(Math.random() * 200) + 50,
    image:
      imageMap[itemName] ||
      "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
  });
}

// Seed function
async function seedData() {
  try {
    await Food.deleteMany();
    await Food.insertMany(foods);
    console.log("✅ Data inserted successfully");
  } catch (err) {
    console.log("❌ Error:", err);
  } finally {
    mongoose.disconnect();
  }
}

seedData();
