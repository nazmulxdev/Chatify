import express from "express";
import cors from "cors";
import "dotenv/config";
import cookieParser from "cookie-parser";
import connectDB from "./src/config/db.config.js";

// these are custom endpoint
import authRoute from "./src/api/router/auth/auth.route.js";
import messageRoute from "./src/api/router/message/message.route.js";

// starting project

const app = express();
const port = process.env.PORT || 3000;

// project middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
connectDB();

// route

app.use("/api", authRoute);
app.use("/api", messageRoute);

// local endpoint

app.get("/", (req, res) => {
  res.send("Chatify is running on the server.");
});

app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
