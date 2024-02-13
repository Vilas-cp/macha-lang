const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  try {
    res.send("Hello World!!");
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}!!`);
});
