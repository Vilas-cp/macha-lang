const fs = require("fs");
const util = require("util");
const exec = util.promisify(require("child_process").exec);
const writeFile = util.promisify(fs.writeFile);

async function parseMachaLangCode(code) {
  if (typeof code === "string") {
    let logs = "";
    const spiltArray4 = [];
    const spiltArray5 = [];
    const codeIsInQuotes = [];
    let prevPoint = 0;

    logs = logs + "Sub Strings Logs: \n[";

    for (let i = 0; i < code.length; i++) {
      if (codeIsInQuotes.length > 0) {
        if (
          code[i] === '"' &&
          codeIsInQuotes[codeIsInQuotes.length - 1].type === "doublequotes"
        ) {
          codeIsInQuotes.pop();
        } else if (
          code[i] === "'" &&
          codeIsInQuotes[codeIsInQuotes.length - 1].type === "singlequotes"
        ) {
          codeIsInQuotes.pop();
        } else if (
          code[i] === "`" &&
          codeIsInQuotes[codeIsInQuotes.length - 1].type === "stringliteral"
        ) {
          codeIsInQuotes.pop();
        }
        continue;
      }
      if (code[i] === '"') {
        codeIsInQuotes.push({
          codeString: code[i],
          type: "doublequotes",
          linenumber: spiltArray4.length + 1,
        });
      } else if (code[i] === "'") {
        codeIsInQuotes.push({
          codeString: code[i],
          type: "singlequotes",
          linenumber: spiltArray4.length + 1,
        });
      } else if (code[i] === "`") {
        codeIsInQuotes.push({
          codeString: code[i],
          type: "stringliteral",
          linenumber: spiltArray4.length + 1,
        });
      }

      if (code[i] === "\n" && codeIsInQuotes.length === 0) {
        let codeLine = code.slice(prevPoint, i);
        prevPoint = i + 1;
        spiltArray4.push(codeLine);
        if (codeLine.match('"')) {
        }
        logs =
          logs +
          "'" +
          codeLine.replace(/'/g, '"').replace(/\\'/g, '"') +
          "',\n";
      }
    }
    spiltArray4.push(code.slice(prevPoint, code.length));
    logs =
      logs +
      "'" +
      code
        .slice(prevPoint, code.length - 1)
        .replace(/'/g, '"')
        .replace(/\\'/g, '"') +
      "',\n";
    logs = logs + "]" + "\n\n";
    const spiltArray2 = [];

    logs = logs + "Code String:\n";
    for (let index = 0; index < spiltArray4.length; index++) {
      let element = spiltArray4[index];
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
      if (element.match(/macha\.helu\(/) !== null) {
        element = element.replace(/macha\.helu\(/g, "process.stdout.write(''+");
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
      if (element.match("sari") !== null) {
        element = element.replace(/sari/g, "true");
      }
      if (element.match("tapu") !== null) {
        element = element.replace(/tapu/g, "false");
      }
      if (element.match("khali") !== null) {
        element = element.replace(/khali/g, "null");
      }
      if (element.match("enuilla") !== null) {
        element = element.replace(/enuilla/g, "undefined");
      }
      if (element.match("mundehogu") !== null) {
        element = element.replace(/mundehogu/g, "continue");
      }
      if (element.match("muri") !== null) {
        element = element.replace(/muri/g, "break");
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
  // console.log(code);
  code = code.replace("build/build.js", "build/compiled.macha");
  let spacing = "";
  let negaOrPost = 0;
  if (code.match(/for/) !== null) {
    code = code.replace(/for/g, "allivaragu");
    spacing =
      spacing + " ".repeat(Math.abs("for".length - "allivaragu".length));
    negaOrPost = negaOrPost + ("for".length - "allivaragu".length) * -1;
  }

  if (code.match(/let/) !== null) {
    code = code.replace(/let/g, "idu");
    spacing = spacing + " ".repeat(Math.abs("let".length - "idu".length));
    negaOrPost = negaOrPost + ("let".length - "idu".length) * -1;
  }

  if (code.match(/const/) !== null) {
    code = code.replace(/const/g, "irlli");
    spacing = spacing + " ".repeat(Math.abs("const".length - "irlli".length));
    negaOrPost = negaOrPost + ("const".length - "irlli".length) * -1;
  }

  if (code.match(/process\.stdout\.write\(''\+/g) !== null) {
    code = code.replace(/process\.stdout\.write\(''\+/g, "macha.helu(");
    spacing =
      spacing +
      " ".repeat(
        Math.abs("process.stdout.write(''+".length - "macha.helu(".length)
      );
    negaOrPost =
      negaOrPost +
      ("process.stdout.write(''+".length - "macha.helu(".length) * -1;
  }

  if (code.match(/else if/) !== null) {
    code = code.replace(/else if/g, "illandre");
    spacing =
      spacing + " ".repeat(Math.abs("else if".length - "illandre".length));
    negaOrPost = negaOrPost + ("else if".length - "illandre".length) * -1;
  }

  if (code.match(/else/) !== null) {
    code = code.replace(/else/g, "illava");
    spacing = spacing + " ".repeat(Math.abs("else".length - "illava".length));
    negaOrPost = negaOrPost + ("else".length - "illava".length) * -1;
  }

  if (code.match(/if/) !== null) {
    code = code.replace(/if/g, "enandre");
    spacing = spacing + " ".repeat(Math.abs("if".length - "enandre".length));
    negaOrPost = negaOrPost + ("if".length - "enandre".length) * -1;
  }

  if (code.match(/while/) !== null) {
    code = code.replace(/while/g, "allitanka");
    spacing =
      spacing + " ".repeat(Math.abs("while".length - "allitanka".length));
    negaOrPost = negaOrPost + ("while".length - "allitanka".length) * -1;
  }

  if (code.match(/function/) !== null) {
    code = code.replace(/function/g, "kelsa");
    spacing =
      spacing + " ".repeat(Math.abs("function".length - "kelsa".length));
    negaOrPost = negaOrPost + ("function".length - "kelsa".length) * -1;
  }

  if (code.match(/return/) !== null) {
    code = code.replace(/return/g, "kodu");
    spacing = spacing + " ".repeat(Math.abs("return".length - "kodu".length));
    negaOrPost = negaOrPost + ("return".length - "kodu".length) * -1;
  }

  if (code.match(/true/) !== null) {
    code = code.replace(/true/g, "sari");
    spacing = spacing + " ".repeat(Math.abs("true".length - "sari".length));
    negaOrPost = negaOrPost + ("true".length - "sari".length) * -1;
  }

  if (code.match(/false/) !== null) {
    code = code.replace(/false/g, "tapu");
    spacing = spacing + " ".repeat(Math.abs("false".length - "tapu".length));
    negaOrPost = negaOrPost + ("false".length - "tapu".length) * -1;
  }

  if (code.match(/null/) !== null) {
    code = code.replace(/null/g, "khali");
    spacing = spacing + " ".repeat(Math.abs("null".length - "khali".length));
    negaOrPost = negaOrPost + ("null".length - "khali".length) * -1;
  }

  if (code.match(/undefined/) !== null) {
    code = code.replace(/undefined/g, "enuilla");
    spacing =
      spacing + " ".repeat(Math.abs("undefined".length - "enuilla".length));
    negaOrPost = negaOrPost + ("undefined".length - "enuilla".length) * -1;
  }

  if (code.match(/continue/) !== null) {
    code = code.replace(/continue/g, "mundehogu");
    spacing =
      spacing + " ".repeat(Math.abs("continue".length - "mundehogu".length));
    negaOrPost = negaOrPost + ("continue".length - "mundehogu".length) * -1;
  }
  if (code.match(/break/) !== null) {
    code = code.replace(/break/g, "muri");
    spacing =
      spacing + " ".repeat(Math.abs("break".length - "muri".length));
    negaOrPost = negaOrPost + ("break".length - "muri".length) * -1;
  }

  if (negaOrPost === 0) {
    null;
  } else if (negaOrPost > 0) {
    code = code.replace("^", spacing + "^");
  } else if (negaOrPost < 0) {
    code = code.replace(spacing + "^", "^");
  }
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
      logs = logs + "\nOutput of Code: \n" + stdout;
      logWriting(logs);
      return { result: stdout, statusCode: null };
      /*
      await exec("rollup -c");
      // const { stdout, stderr } = await exec("node ./build/bundle.js");
      await exec("javy compile ./build/bundle.js -o ./build/bundle.asm");
      const { stdout, stderr } = await exec("wasmtime run ./build/bundle.asm");
      if (stderr !== null) {
        // console.log(stdout + stderr);
        logs = logs + "Output of Code: \n" + stderr;
        // console.log(logs);
        logWriting(logs);
        return { result: stderr, statusCode: null };
      } else {
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
      */
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
