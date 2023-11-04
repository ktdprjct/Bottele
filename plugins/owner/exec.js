let syntaxerror = require("syntax-error");
let util = require("util");

let handler = async (msg, _2) => {
  let { conn, chatId, usedPrefix, noPrefix, args } = _2;
  let _return;
  let _syntax = "";
  let _text = (/^=/.test(usedPrefix) ? "return " : "") + noPrefix;
  try {
    let i = 15;
    let f = {
      exports: {},
    };
    let exec = new (async () => {}).constructor(
      "print",
      "msg",
      "handler",
      "require",
      "conn",
      "Array",
      "process",
      "args",
      "module",
      "exports",
      "argument",
      _text
    );
    _return = await exec.call(
      conn,
      (...args) => {
        if (--i < 1) return;
        console.log(...args);
        return conn.sendMessage(chatId, util.format(...args));
      },
      msg,
      handler,
      require,
      conn,
      CustomArray,
      process,
      args,
      f,
      f.exports,
      [conn, _2]
    );
  } catch (e) {
    let err = await syntaxerror(_text, "Execution Function", {
      allowReturnOutsideFunction: true,
      allowAwaitOutsideFunction: true,
    });
    if (err) _syntax = err + "\n\n";
    _return = e;
  } finally {
    conn.sendMessage(chatId, _syntax + util.format(_return));
  }
};
handler.help = ["> ", "=> "];
handler.tags = ["advanced"];
handler.customPrefix = /^=?> /;
handler.command = /(?:)/i;

handler.fail = null;

module.exports = handler;

class CustomArray extends Array {
  constructor(...args) {
    if (typeof args[0] == "number") return super(Math.min(args[0], 10000));
    else return super(...args);
  }
}
