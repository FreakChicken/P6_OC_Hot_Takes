const express = require("express");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://Freak_Chicken:Petrucci28@cluster0.8yoprjn.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// app.use("/images", express.static(path.join(__dirname, "images")));
// app.use("/api/stuff", stuffRoutes);
// app.use("/api/auth", userRoutes);

module.exports = app;
