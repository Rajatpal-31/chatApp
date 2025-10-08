import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import Path from "path";
import userRoute from "./routes/user.route.js";
import messageRoute from "./routes/message.route.js";
import { app, server } from "./SocketIO/server.js";

dotenv.config();

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors());

const PORT = process.env.PORT || 4001;
const URI = process.env.MONGO_URI;

try {
  mongoose.connect(URI ,{

   useNewUrlParser: true,
      useUnifiedTopology: true,
      ssl: true,
      sslValidate: false,
  });
} catch (error) {
  console.log(error);
}

//routes
app.use("/api/user", userRoute);
app.use("/api/message", messageRoute);


if (process.env.NODE_ENV === "production") {
  const dirPath = Path.resolve();
  app.use(express.static(Path.join(dirPath, "/Frontend/dist")));
  
  app.get("*", (req, res) => {
    res.sendFile(Path.resolve(dirPath, "/Frontend/dist" ,"index.html"));
  });
}

server.listen(PORT, () => {
  console.log(`Server is Running on port ${PORT}`);
});
