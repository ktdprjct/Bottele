const chalk = require("chalk");
module.exports = async (conn, msg) => {
    const chatId = msg.chat.id;
    const chats = await conn.getChat(chatId)
    const senderName = msg.from.first_name;

    let colors = [
        "red",
        "green",
        "blue",
        "yellow",
        "magenta",
        "cyan",
        "redBright",
        "greenBright",
        "blueBright",
        "yellowBright",
        "magentaBright",
        "cyanBright",
    ];
    let header_client =
        chalk.black(chalk.bgYellow((msg.timestamp ? new Date(1000 * (msg.timestamp.low || msg.timestamp)) : new Date()).toTimeString()));
    let header_sender =
        chalk[pickRandom(colors)]("~> " + senderName) +
        " " + chalk.red("to") +" " +
        chalk.black(chalk.bgYellow((chats.type == "private") ? "[PRIVATE]" : "[GROUP]") + " ") + chalk.green(chatId + " ") +
        chalk.green((chats.type == "private") ?  chats.username : chats.title)
        
    let text = msg.isCommand ? chalk.yellow(msg.text) : msg.text;
    console.log(header_client + "\n" + header_sender + "\n" + text + "\n");
}

function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)];
}

let file = require.resolve(__filename);
let fs = require("fs");
fs.watchFile(file, () => {
    fs.unwatchFile(file);
    console.log(chalk.redBright("Update 'lib/print.js'"));
    delete require.cache[file];
    require(file);
});