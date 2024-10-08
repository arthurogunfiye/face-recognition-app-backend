import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcrypt";
import { handleSignup } from "./controllers/signup.js";
import { handleSignin } from "./controllers/signin.js";
import { getUserProfile } from "./controllers/profile.js";
import { updateEntries, handleClarifaiRequest } from "./controllers/image.js";

const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "arthurogunfuye",
    password: "",
    database: "smart-brain",
  },
});

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.json("Success");
});

app.post("/signin", (res, req) => {
  handleSignin(res, req, db, bcrypt); // Dependency injection
});

app.post("/signup", (req, res) => {
  handleSignup(req, res, db, bcrypt); // Dependency injection
});

app.get("/profile/:userId", (req, res) => {
  getUserProfile(req, res, db);
});

app.put("/image", (req, res) => {
  updateEntries(req, res, db);
});

app.post("/imageurl", (req, res) => {
  handleClarifaiRequest(req, res);
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${process.env.PORT || 3000}`);
});
