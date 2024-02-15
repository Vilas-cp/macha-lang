const express = require("express");
const cors = require("cors");
const fs = require("fs");
const { z } = require("zod");
const { parseMachaLangCode } = require("./parseCode");
const app = express();
const port = process.env.PORT || 8080;

const codeSchema = z.object({ code: z.string() });

app.use(express.json());
app.use(cors());

app.get("/home", (req, res) => {
  try {
    res.status(200);
    res.send("Hello World!!");
  } catch (error) {
    res.status(500);
    console.log(error);
  }
});

app.post("/code/macha/v1", async (req, res) => {
  try {
    let code;
    console.log("Request has been made, code has been given!");
    if (req.body.code) {
      code = codeSchema.parse(req.body);
    } else {
      code = {
        code: fs.readFileSync("./index.macha", { encoding: "utf8" }).toString(),
      };
    }

    const result = await parseMachaLangCode(code.code);

    res.status(200);
    // console.log(result);
    console.log("Code has been compiled, and result has been sent!!");
    res.send({ result });
  } catch (error) {
    console.log(error);
    console.log("Code has gotten errors, and eroor message has been sent!!");
    res.status(500);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}!!`);
});
