//Imports
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const sauceRoutes = require("./routes/sauce");
const userRoutes = require("./routes/user");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const app = express();

//Sécurisation des en-têtes avec helmet
app.use(helmet());
// Connexion à la base de données
mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_USERNAME +
      ":" +
      process.env.DB_PASSWORD +
      "@" +
      process.env.DB_HOST +
      "?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Fonctionnalités du server express
//Paramétrage des en-tête
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
  res.setHeader("Cross-Origin-Resource-Policy", "cross-origin");
  next();
});

//protection contre les injections dans MongoDB
app.use(mongoSanitize());
//Pour parser les objets JSON
app.use(express.json());
//Gestion des fichiers images
app.use("/images", express.static(path.join(__dirname, "images")));

//Routes
app.use("/api/sauces", sauceRoutes);
app.use("/api/auth", userRoutes);

//Export
module.exports = app;
