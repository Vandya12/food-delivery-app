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
  "Idli Sambar",
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
  "Idli Sambar": "https://images.pexels.com/photos/36854501/pexels-photo-36854501.jpeg",
  "Vada": "https://images.pexels.com/photos/20422135/pexels-photo-20422135.jpeg",
  "Pongal":
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
    "https://bakinghermann.com/wp-content/uploads/2024/11/Dal-Tadka-12.jpg",
  "Rajma": 
    "https://images.pexels.com/photos/8992843/pexels-photo-8992843.jpeg",
  "Veg Biryani":
    "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg",
  "Fried Rice":
    "https://www.flavourstreat.com/wp-content/uploads/2024/07/vegetable-fried-rice-recipe-001.jpg",
  "Veg Noodles":
    "https://images.pexels.com/photos/28674525/pexels-photo-28674525.jpeg",
  "Spring Roll":
    "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg",
  "Aloo Paratha":
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2020/08/aloo-paratha-recipe-500x500.jpg",
  "Chapati":
    "https://images.pexels.com/photos/20408462/pexels-photo-20408462.jpeg",
  "Samosa": "https://images.pexels.com/photos/9609847/pexels-photo-9609847.jpeg",
  "Dhokla": "https://maayeka.com/wp-content/uploads/2011/11/sooji-ka-dhokla-instant-recipe-1-of-1.jpg",
  "Burger": "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg",
  "Pizza Veg":
    "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg",
  "Ice Cream":
    "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg",
  "Bhel Puri":
  "https://static.vecteezy.com/system/resources/thumbnails/066/279/341/small_2x/a-close-up-of-a-bhel-puri-with-a-savory-snack-made-from-puffed-rice-vegetables-and-chutneys-isolated-on-clean-white-background-photo.jpg",
  "Butter Naan":
    "https://foodess.com/wp-content/uploads/2023/02/Butter-Naan-3.jpg",
  "Cheese Sandwich":
    "https://www.simplyrecipes.com/thmb/vT7RY7nH2J34hwV2OjISr1kO4ZU=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Italian-Grilled-Cheese-Sandwich-LEAD-1-2-b00c3fa13440456daab6ccc149ac60c0.jpg",
  "Chole":
    "https://vegecravings.com/wp-content/uploads/2017/01/chole-recipe-step-by-step-instructions-13.jpg",
  "Dal Makhani":
    "https://www.cookwithmanali.com/wp-content/uploads/2019/04/Restaurant-Style-Dal-Makhani.jpg",
  "Falooda":
    "https://herbivorecucina.com/wp-content/uploads/2021/05/Royal-Falooda-1.jpg",
  "Gobi Paratha":
    "https://cdn3.foodviva.com/static-content/food-images/north-indian-recipes/gobhi-paratha-recipe/gobhi-paratha-recipe.jpg",
  "Gulab Jamun":
    "https://i0.wp.com/www.chitrasfoodbook.com/wp-content/uploads/2016/10/gulab-jamun-using-mix.jpg?w=1200&ssl=1",
  "Jalebi":
    "https://static.toiimg.com/thumb/53099699.cms?imgsize=182393&width=800&height=800",  
  "Jeera Rice":
    "https://delishbite.in/wp-content/uploads/2023/07/Blog_1-3.jpg",
  "Manchurian":
    "https://www.awesomecuisine.com/wp-content/uploads/2018/07/cabbage_manchurian_dry.jpg",
  "Margherita Pizza":
      "https://www.foodandwine.com/thmb/7BpSJWDh1s-2M2ooRPHoy07apq4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/mozzarella-pizza-margherita-FT-RECIPE0621-11fa41ceb1a5465d9036a23da87dd3d4.jpg",
  "Paneer Paratha": 
    "https://www.jcookingodyssey.com/wp-content/uploads/2025/03/paneer-paratha.jpg",
  "Pani Puri":
    "https://cdn1.foodviva.com/static-content/food-images/snacks-recipes/pani-puri/pani-puri.jpg",
  "Pav Bhaji":
    "https://www.cubesnjuliennes.com/wp-content/uploads/2020/07/Instant-Pot-Mumbai-Pav-Bhaji-Recipe.jpg",
  "Poha":
    "https://www.spiceupthecurry.com/wp-content/uploads/2014/04/batata-poha-recipe-1.jpg",
  "Rasgulla":
    "https://www.kuchpakrahahai.in/wp-content/uploads/2020/05/Rasgulla-2BRecipe-2Bin-2BPressure-2BCooker-e1626148996679-360x360.jpg",
  "Sabudana Khichdi":
    "https://www.indianveggiedelight.com/wp-content/uploads/2021/10/sabudana-khichdi-1-featured.jpg",
  "Sev Puri":
    "https://shwetainthekitchen.com/wp-content/uploads/2021/10/sev-puri.jpg",
  "Tandoori Roti":
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2023/09/tandoori-roti-recipe.jpg",
  "Thepla":
    "https://www.secondrecipe.com/wp-content/uploads/2018/05/theplaaaa-scaled.jpg",
  "Upma":
    "https://c.ndtvimg.com/2021-03/2au1mv18_upma_625x300_10_March_21.jpeg",
  "Veg Sandwich": 
    "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/veg-grilled-sandwich-recipe.jpg",
  "Kadai Paneer":
    "https://www.cubesnjuliennes.com/wp-content/uploads/2020/03/Best-Kadai-Paneer-Recipe.jpg",
  "Kachori":
    "https://upload.wikimedia.org/wikipedia/commons/8/8f/Rajasthani_Raj_Kachori.jpg",
  };

// Create 100 items
const foods = [];

for (let i = 0; i < 100; i++) {
  const itemName = vegItems[i % vegItems.length];

  foods.push({
    name: itemName,
    category:
  [
    "Samosa",
    "Kachori",
    "Bhel Puri",
    "Pani Puri",
    "Sev Puri",
    "Burger",
    "Pizza Veg",
    "Spring Roll",
    "Cheese Sandwich",
    "Veg Sandwich",
    "Pav Bhaji",
    "Manchurian",
    "Veg Noodles",
    "Falooda",
    "Ice Cream",
  ].includes(itemName)
    ? "Snacks"
    : [
          "Masala Dosa",
          "Plain Dosa",
          "Rava Dosa",
          "Idli Sambar",
          "Vada",
          "Upma",
          "Pongal",
          "Curd Rice",
          "Lemon Rice",
          "Tomato Rice",
          "Dhokla",
          "Poha",
        ].includes(itemName)
      ? "South Indian"
      : "North Indian",
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
