require("../database/config.json");
var isNumber = (x) => typeof x === "number" && !isNaN(x);
module.exports = {
    async handler(msg) {
        if (!msg) return;
        try {
            //database
            try {
                require('../database/database') (msg, this)
            } catch (e) {
                console.error(e)
            }
            
            let usedPrefix;
            for (let name in global.plugins) {
                let text = msg.text
                let chatId = msg.chat.id
                let plugin = global.plugins[name];
                if (!plugin) continue;
                
                const str2Regex = (str) => str.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&");
                let _prefix = plugin.customPrefix ? plugin.customPrefix : conn.prefix ? conn.prefix : global.prefix;
                let match = (
                    _prefix instanceof RegExp // RegExp Mode?
                      ? [[_prefix.exec(text), _prefix]]
                      : Array.isArray(_prefix) // Array?
                    ? _prefix.map((p) => {
                        let re =
                            p instanceof RegExp // RegExp in Array?
                              ? p
                              : new RegExp(str2Regex(p));
                        return [re.exec(text), re];
                    })
                    : typeof _prefix === "string" // String?
                    ? [[new RegExp(str2Regex(_prefix)).exec(text), new RegExp(str2Regex(_prefix))]]
                    : [[[], new RegExp()]]
                ).find((p) => p[1]);
                
                if ((usedPrefix = (match[0] || "")[0])) {
                    let noPrefix = text.replace(usedPrefix, "");
                    let [command, ...args] = noPrefix.trim().split` `.filter((v) => v);
                    args = args || [];
                    let _args = noPrefix.trim().split` `.slice(1);
                    command = (command || "").toLowerCase();
                    
                    let isAccept =
                    plugin.command instanceof RegExp // RegExp Mode?
                    ? plugin.command.test(command)
                    : Array.isArray(plugin.command) // Array?
                    ? plugin.command.some((cmd) =>
                        cmd instanceof RegExp // RegExp in Array?
                        ? cmd.test(command)
                        : cmd === command
                    )
                    : typeof plugin.command === "string" // String?
                    ? plugin.command === command
                    : false;
                    
                    if (!isAccept) continue;
                    msg.plugin = name;
                    
                    msg.isCommand = true;
                    
                    let extra = {
                        match,
                        usedPrefix,
                        noPrefix,
                        _args,
                        args,
                        chatId,
                        command,
                        text: text.split(" ").slice(1).join(" "),
                        conn: this,
                        msg,
                    };
                    try {
                        await plugin.call(this, msg, extra);
                    } catch (e) {
                        console.log(e);
                    }
                }
            }
        } finally {
            require("../lib/print")(this, msg).catch((e) => console.log(e));
        }
    },
}