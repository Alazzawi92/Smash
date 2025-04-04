const express = require("express");
const app = express();
const i18n = require("i18n");
const cookieParser = require("cookie-parser");
const path = require("path");

// 1️⃣ Configuration d'i18n
i18n.configure({
  locales: ["en", "fr"], // Langues disponibles
  directory: path.join(__dirname, "locales"), // Dossier des fichiers de traduction
  defaultLocale: "fr", // Langue par défaut
  cookie: "lang", // Nom du cookie pour stocker la langue
  queryParameter: "lang", // Permet de changer la langue via l'URL (ex: ?lang=en)
  autoReload: true,
  syncFiles: true
});

// 2️⃣ Middleware pour Express
app.use(cookieParser()); // Middleware pour les cookies
app.use(i18n.init); // Initialise i18n

app.get("/clear-lang", (req, res) => {
    res.clearCookie("lang"); // Supprime le cookie 'lang'
    res.redirect("/"); // Redirige vers la page d'accueil après suppression
});

// 4️⃣ Route pour changer la langue
app.get("/change-lang/:lang", (req, res) => {
    let newLang = req.params.lang;
    res.cookie("lang", newLang); // Stocke la langue dans un cookie
    res.redirect("/"); // Recharge la page précédente
});

// 3️⃣ Middleware pour définir la langue en fonction du cookie
app.use((req, res, next) => {
  let lang = req.cookies.lang || "fr"; // Défaut : français
  req.setLocale(lang); // Définit la langue actuelle
  next();
});
// 5️⃣ Configuration de EJS
app.set("view engine", "ejs");
app.set("views", "./views");

// 6️⃣ Middleware pour les fichiers statiques
app.use(express.static("public"));

// 7️⃣ Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/home", (req, res) => {
  res.render("home");
});
app.get("/menu", (req, res) => {
  res.render("menu");
});


// 8️⃣ Démarrer le serveur
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
