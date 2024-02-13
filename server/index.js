const express = require("express");
const cors = require("cors");
const {z} = require("zod");
const {parseMachaLangCode} = require("./parseCode")
const app = express();
const port = process.env.PORT || 8080;

const codeSchema = z.object({ code: z.string() });

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  try {
    res.send("Hello World!!");
  } catch (error) {
    console.log(error);
  }
});

app.post("/code/macha/v1", (req, res) => {
  try {
    const code = codeSchema.parse(req.body);
    const result = parseMachaLangCode(code.code);
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}!!`);
});
