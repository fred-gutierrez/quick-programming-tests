require("dotenv").config();
require("./config/db.js");

const express = require("express");
const cors = require("cors");

// Auth Imports
const cookieSession = require("cookie-session");
const passport = require("passport");
const googleStrategy = require("./strategies/google-strategy.js");

const app = express();

// Config
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:4200", "https://quick-programming-tests-git-main-fredgutierrezs-projects.vercel.app/"],
    methods: "GET",
    credentials: true,
  })
);

// API Routes
app.use("/api", require("./routes/api.js"));

// Auth
app.use(
  cookieSession({
    name: "session",
    keys: ["fred"],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Initialize Passport
passport.use(googleStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", require("./routes/auth.js"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is listening in port ${PORT}`);
});
