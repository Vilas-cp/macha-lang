const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(fs.writeFile);

async function parseMachaLangCode(code) {
  if (typeof code === "string") {
    const spiltArray = code.split(/;\n|{\n/);

    const spiltArray4 = [];
    const spiltArray5 = [];
    let prevPoint = 0,
      nextPoint = 0;

    for (let i = 0; i < code.length; i++) {
      if (i <= 2) {
        continue;
      }
      let subStr = code.slice(i - 2, i);
      // spiltArray5.push(subStr);
      let ele = null;
      let typeCode;
      if (subStr === ";\n") {
        ele = code.slice(prevPoint, i - 2);
        // For now no need trim()
        // ele = code.slice(prevPoint, i - 2).trim();
        prevPoint = i;
        typeCode = "syntax";
      } else if (subStr === "{\n") {
        ele = code.slice(prevPoint, i - 2);
        prevPoint = i;
        typeCode = "callfun";
      }
      if (ele !== null) {
        spiltArray4.push({ code: ele, typeCode });
      }
    }
    spiltArray4.push({
      code: code.slice(prevPoint, code.length),
      typeCode: "syntax",
    });
    console.log(spiltArray4);
    // console.log(spiltArray5);
    const spiltArray2 = [];

    for (let index = 0; index < spiltArray4.length; index++) {
      let element = spiltArray4[index].code;
      element = element.replace(/\n/g, "");
      if (element === "") {
        continue;
      }
      spiltArray4[index].code = element;
    }

    for (let index = 0; index < spiltArray4.length; index++) {
      let element = spiltArray4[index].code;
      // console.log(element);

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
      if (spiltArray4[index].typeCode === "syntax") {
        element = element + ";";
      } else if (spiltArray4[index].typeCode === "callfun") {
        element = element + "{";
      }

      spiltArray2.push(element);
    }

    const resultString = spiltArray2.join("\n");
    // console.log(resultString);
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

function reverseCode(code) {
  code = code.replace(/for/g, "allivaragu");
  code = code.replace(/let/g, "idu");
  code = code.replace(/const/g, "irlli");
  code = code.replace(/console.log/g, "macha.helu");
  return code;
}

async function runCompiledCode() {
  try {
    // await exec("rollup -c");
    // const { stdout, stderr } = await exec("node ./build/bundle.js");
    const { stdout, stderr } = await exec("node ./build/build.js");
    if (stderr) {
      console.log(stderr);
      return stderr;
    }
    return stdout;
  } catch (error) {
    console.log(error);
    return reverseCode(error.stderr);
  }
}

function logWriting() {

}

module.exports = { parseMachaLangCode };
