const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(fs.writeFile);

async function parseMachaLangCode(code) {
  if (typeof code === "string") {
    let logs = "";
    const spiltArray4 = [];
    const spiltArray5 = [];
    let prevPoint = 0;

    logs = logs + "Sub Strings Logs: \n[";
    for (let i = 0; i < code.length; i++) {
      if (i <= 2) {
        continue;
      }
      let subStr = code.slice(i - 2, i);
      let spacing = "";
      if (i % 10 === 0) {
        spacing = "\n";
      }
      logs = logs + "'" + subStr.replace("\n", "\\n") + "'," + spacing;
      spiltArray5.push(subStr);
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
    logs = logs + "]" + "\n\n";
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
      logs = logs + element + "\n";

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
      if (element.match("enandre") !== null) {
        element = element.replace(/enandre/g, "if");
      }
      if (element.match("illandre") !== null) {
        element = element.replace(/illandre/g, "else if");
      }
      if (element.match("illava") !== null) {
        element = element.replace(/illava/g, "else");
      }
      if (element.match("allitanka") !== null) {
        element = element.replace(/allitanka/g, "while");
      }
      if (element.match("kelsa") !== null) {
        element = element.replace(/kelsa/g, "function");
      }
      if (element.match("kodu") !== null) {
        element = element.replace(/kodu/g, "return");
      }

      if (spiltArray4[index].typeCode === "syntax") {
        element = element + ";";
      } else if (spiltArray4[index].typeCode === "callfun") {
        element = element + "{";
      }

      spiltArray2.push(element);
    }

    const resultString = spiltArray2.join("\n");
    logs = logs + "\nResultant String:\n";
    logs = logs + resultString + "\n\n" + "Log Writing Ends Here!\n";
    logWriting(logs);
    await writeBuildFile(resultString);
    const resultString2 = await runCompiledCode(logs);
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
  code = code.replace(/else if/g, "illandre");
  code = code.replace(/else/g, "illava");
  code = code.replace(/if/g, "enandre");
  code = code.replace(/while/g, "allitanka");
  code = code.replace(/function/g, "kelsa");
  code = code.replace(/return/g, "kodu");
  code = code.replace("Node.js v20.11.0", "ಮಚ್ಚLang v1.0.2");
  return code;
}

async function runCompiledCode(logs) {
  try {
    // await exec("rollup -c");
    // const { stdout, stderr } = await exec("node ./build/bundle.js");
    const { stdout, stderr } = await exec("node ./build/build.js");
    if (stderr) {
      console.log(stderr);
      return stderr;
    } else {
      await exec("rollup -c");
      // const { stdout, stderr } = await exec("node ./build/bundle.js");
      await exec("javy compile ./build/bundle.js -o ./build/bundle.asm");
      const { stdout, stderr } = await exec("wasmtime run ./build/bundle.asm");
      if (stderr !== null) {
        // console.log(stdout + stderr);
        logs = logs + "Output of Code: \n" + stderr;
        console.log(logs);
        await logWriting(logs);
        return { result: stderr, statusCode: null };
      } else {
        console.log(stdout);
        console.log(stderr);
        logs =
          logs +
          "Output Compiled Error: \n" +
          stderr +
          "\n\n" +
          "Output Error: \n" +
          reverseCode(stderr);
        logWriting(logs);
        return { result: stdout + stderr, statusCode: "error" };
      }
    }
  } catch (error) {
    // console.log(error);
    logs =
      logs +
      "Output Compiled Error: \n" +
      error.stderr +
      "\n\n" +
      "Output Error: \n" +
      reverseCode(error.stderr);
    logWriting(logs);
    return { result: reverseCode(error.stderr), statusCode: "error" };
  }
}

async function logWriting(logs) {
  await writeFile("./logs/log.log", logs, {
    encoding: "utf8",
  });
}

module.exports = { parseMachaLangCode };
