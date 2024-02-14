const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const util = require("util");
const { parseMachaLangCode } = require("./parseCode");
const exec = util.promisify(require("child_process").exec);
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
    const code = codeSchema.parse(req.body);
    // const code = {
    //   code: fs.readFileSync("./index.macha", { encoding: "utf8" }).toString(),
    // };

    const result = await parseMachaLangCode(code.code);
    async function lsExample() {
      const { stdout, stderr } = await exec("node ./build/build.js");
      return stdout;
    }
    const sendResult = await lsExample();
    res.status(201);
    console.log(sendResult);
    res.send({ result: sendResult });
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send(error);
  }
});

app.listen(port, () => {
  console.log(`Server listening to port ${port}!!`);
});
