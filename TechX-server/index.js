import mongoose, { connect } from "mongoose";
import express from "express";
// import { _techx_data_connection_string } from './connect.js';
import { PhoneModel } from "./Models/Phone.js";
import { UserModel } from "./Models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
dotenv.config();

//
//  ████████╗███████╗ █████╗ ██╗  ██╗██╗  ██╗
//  ╚══██╔══╝██╔════╝██╔══██╗██║  ██║╚██╗██╔╝
//     ██║   █████╗  ██║  ╚═╝███████║ ╚███╔╝
//     ██║   ██╔══╝  ██║  ██╗██╔══██║ ██╔██╗
//     ██║   ███████╗╚█████╔╝██║  ██║██╔╝╚██╗
//     ╚═╝   ╚══════╝ ╚════╝ ╚═╝  ╚═╝╚═╝  ╚═╝
//
//   ██████╗███████╗██████╗ ██╗   ██╗███████╗██████╗
//  ██╔════╝██╔════╝██╔══██╗██║   ██║██╔════╝██╔══██╗
//  ╚█████╗ █████╗  ██████╔╝╚██╗ ██╔╝█████╗  ██████╔╝
//   ╚═══██╗██╔══╝  ██╔══██╗ ╚████╔╝ ██╔══╝  ██╔══██╗
//  ██████╔╝███████╗██║  ██║  ╚██╔╝  ███████╗██║  ██║
//  ╚═════╝ ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝╚═╝  ╚═╝
//
// The TechX server file provides communication between the Compass products,
// the TechX Store, and the Database.
//

const app = express();
const _token_secret_key = crypto.randomBytes(32).toString("base64");

app.use(express.json());
app.use(
  (
    req,
    res,
    next // Middleware for handling CORS.
  ) => {
    res.setHeader(
      "Access-Control-Allow-Origin",
      "https://techx-srvr.vercel.app"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, OPTIONS, PUT, DELETE"
    );
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Content-Type, Authorization"
    );
    res.setHeader("Access-Control-Allow-Credentials", true);

    next();
  }
);

const DB_URL = process.env.MONGODB_URI;
const PORT = process.env.PORT;

// + + + + + + + + + + + + + + + + + + + TECHX + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
// Push new user data.
app.post("/NewUser", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const new_user = new UserModel({ name, email, password });

    await new_user.save();

    res.status(200).json({ message: "User added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Let's check if the user exists.
app.post("/CheckUserExists", async (req, res) => {
  try {
    const { email } = req.body;
    const existing_user = await UserModel.findOne({ email });

    if (existing_user) res.status(200).json({ existing_user: true });
    else res.status(200).json({ existing_user: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Prompt to verify user password.
app.post("/ProofPass", async (req, res) => {
  try {
    const { email, password } = req.body;

    const existing_user = await UserModel.findOne({ email });

    if (existing_user) {
      const is_password_correct = await bcrypt.compare(
        password,
        existing_user.password
      );

      if (is_password_correct) res.status(200).json({ success: true });
      else res.status(200).json({ success: false });
    } else res.status(200).json({ success: false });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Generate and issue a token.
app.post("/GenerateToken", async (req, res) => {
  try {
    const { email } = req.body;
    const token = jwt.sign({ user: email }, _token_secret_key, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Checking the validity of the token.
app.post("/CheckToken", async (req, res) => {
  try {
    const { token } = req.body;

    jwt.verify(token, _token_secret_key, (err, decoded) => {
      if (err) {
        console.error(err);
        res.status(401).json({ success: false });
      } else res.status(200).json({ success: true });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +

// + + + + + + + + + + + + + + + + + + + COMPASS + + + + + + + + + + + + + + + + + + +
// REQUESTS TO SEND THIS DATA.
//=============================================================================================
// Push product data.
app.post("/AddPhone", async (req, res) => {
  try {
    const { company, series, screen_diagonal } = req.body;
    const new_phone = new PhoneModel({ company, series, screen_diagonal });

    await new_phone.save();

    res.status(200).json({ message: "Phone added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//=============================================================================================
// + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + + +

const start = async () => {
  try {
    await mongoose.connect(DB_URL);

    console.log(`🔌 Connect is [${mongoose.connection.readyState}]`);

    app.listen(PORT, () => {
      console.log(`🍕 Server listening on port ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
