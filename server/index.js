const express = require("express");
const cors = require("cors");
const { z } = require("zod");
const fs = require("fs");
const util = require("util");
const { parseMachaLangCode } = require("./parseCode");
const { spawn } = require("child_process");
const exec = util.promisify(require("child_process").exec);
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

app.post("/code/macha/v1", async (req, res) => {
  try {
    // const code = codeSchema.parse(req.body);
    const code = {
      code: fs.readFileSync("./index.macha", { encoding: "utf8" }).toString(),
    };

    const result = await parseMachaLangCode(code.code);
    // const ls = await spawn("node", ["build.js"]);
    // ls.stdout.on("data", (data) => {console.log(data)});
    async function lsExample() {
      const { stdout, stderr } = await exec("node ./build/build.js");
      // console.log("stdout:", stdout);
      // console.error("stderr:", stderr);
      return stdout;
    }
    const sendResult = await lsExample();
    // some();
    res.status(201);
    console.log(sendResult);
    res.send({ result: sendResult });
  } catch (error) {
    console.log(error);
    res.status(401);
    res.send(error);
  }
});

function some() {
  exec("node build.js", (err, std, stder) => {
    console.log(std);
  });
}
// some();

app.listen(port, () => {
  console.log(`Server listening to port ${port}!!`);
});
