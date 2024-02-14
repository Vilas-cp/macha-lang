const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(fs.writeFile);

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
    }
    for (let index = 0; index < spiltArray1.length; index++) {
      let element = spiltArray1[index];
      console.log(element);

      if (element.match("allivaragu") !== null) {
        element = element.replace(/allivaragu/g, "for");
      }
      if (element.match("idu") !== null) {
        element = element.replace(/idu/g, "let");
      }
      if (element.match("irlli") !== null) {
        element = element.replace(/irlli/g, "const");
      }
      if (element.match("macha.helu") !== null) {
        element = element.replace(/macha.helu/g, "console.log");
      }
      if (element) {
        console.log(element);
        element = element + ";";
      }
      spiltArray2.push(element);
    }
    const resultString = spiltArray2.join("");
    const outputString = "";
    await writeBuildFile(resultString);
    const resultString2 = await runCompiledCode();
    return resultString2;
  }
}

async function writeBuildFile(code) {
  try {
    await writeFile("./build/build.js", code, {
      encoding: "utf8",
    });
  } catch (error) {
    console.log(error);
  }
}

async function runCompiledCode() {
  try {
    const { stdout, stderr } = await exec("rollup -c & node ./build/bundle.js");
    if (stderr) {
      return stderr;
    }
    return stdout;
  } catch (error) {
    console.log(error);
    return error;
  }
}

module.exports = { parseMachaLangCode };
