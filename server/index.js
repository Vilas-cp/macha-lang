const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.get("/home", (req,res) => {
  try {
    res.send("Hello World!!");
  } catch (error) {
    console.log(error);
  }
});

