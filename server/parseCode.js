function parseMachaLangCode(code) {
  if (typeof code === "string") {
    const spiltArray = code.split(";");
    return code;
  }
}

module.exports = { parseMachaLangCode };
