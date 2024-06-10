require("dotenv").config();
const express = require("express");

const app = express();
const cors = require("cors");
const connection = require("./db");

// Import routes
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");


// Database connection
connection();

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use("/forgot-password", forgotPasswordRoute);
app.use("/", resetPasswordRoute);



const port = process.env.PORT || 8070;
app.listen(port, console.log(`Listening on port ${port}...`));
