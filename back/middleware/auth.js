//Import
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
dotenv.config();

//Export
module.exports = (req, res, next) => {
  try {
    //Récupérer le token dans l'en-tête authorization
    const token = req.headers.authorization.split(" ")[1];
    //Verifier et décoder le token
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    //récuperer l'userId dans le token
    const userId = decodedToken.userId;
    //rajout de l'user ID dans la requête pour que les differentes routes puissent l'exploiter
    req.auth = {
      userId: userId,
    };
    next();
  } catch (error) {
    res.status(401).json({ error });
  }
};
