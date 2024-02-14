const fs = require("fs");
const util = require("util");
const { execSync } = require("child_process");
const exec = util.promisify(require("node:child_process").exec);

async function parseMachaLangCode(code) {
  if (typeof code === "string") {
    const spiltArray = code.split(";\n");
    const spiltArray1 = [];
    const spiltArray2 = [];
    for (let index = 0; index < spiltArray.length; index++) {
      let element = spiltArray[index];
      if (element === "") {
        continue;
      }
      element = element.replace(/\n/g, "");
      spiltArray1.push(element);
      //   console.log(element);
    }
    for (let index = 0; index < spiltArray1.length; index++) {
      let element = spiltArray1[index];
      console.log(element);

      if (element.match("allivaragu") !== null) {
        // console.log(element);
        element = element.replace("allivaragu", "for");
        element = element.replace("idu", "let");
      } if (element.match("idu") !== null) {
        element = element.replace("idu", "let") + ";";
      } if (element.match("irlli") !== null) {
        element = element.replace("irlli", "const") + ";";
      } if (element.match("macha.helu") !== null) {
        element = element.replace("macha.helu", "console.log") + ";";
      }
      // else {
      //   console.log(element);
      //   element = element + ";";
      // }
      spiltArray2.push(element);
    }
    const resultString = spiltArray2.join("");
    const outputString = "";
    writeBuildFile(resultString);
    // console.log("Hello");
    // const { stdout, stderr } = await exec('node build.js');
    // console.log("Hello");
    // console.log(stdout);
    // console.log(stderr);

    // console.log(spiltArray2);
    // console.log(spiltArray1);
    // console.log(spiltArray);
    return resultString;
  }
}

function writeBuildFile(code) {
  const result = fs.writeFileSync("./build/build.js", code);
}

module.exports = { parseMachaLangCode };
