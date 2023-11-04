module.exports = {
    async callback(msg) {
        if (!msg) return;
        try {
            const data = msg.data;
            const command = data.split(" ")[0]
            const chatId = msg.message.chat.id;
            const msgId = msg.message.message_id
            conn.answerCallbackQuery(msg.id)
            
            const axios = require("axios")
            if(data === "wnext") {
                let { data } = await axios("https://waifu.pics/api/sfw/waifu")
                try {
                    await conn.editMessageMedia({
                        "type": "photo",
                        "media": data.url,
                        "caption": `Source: ${data.url}`
                    }, {
                        chat_id: chatId,
                        message_id: msgId,
                        reply_markup: {
                            inline_keyboard: [
                                [{ text: "Next", callback_data: "wnext" }, { text: "Delete", callback_data: "d" }],
                            ]
                        }
                    })
                } catch(e) { console.log(e) }
            } else if(data == "infobot") {
                try {
                    await conn.answerCallbackQuery(msg.id, {text: 'test', show_alert: true})
                } catch (e) { console.log(e) }
            } else {
                if(data != "owner" && data != "medsos" && data != "donate" ) conn.deleteMessage(chatId, msgId).catch(v => 0)
            }
            
            for (let name in global.plugins) {
                let plugin = global.plugins[name];
                if (!plugin) continue;
                
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
                
                let extra = {
                    data,
                    msgId,
                    chatId,
                    command,
                    text: data.split(" ").slice(1).join(" "),
                    conn: this,
                    msg,
                };
                try {
                    await plugin.call(this, msg, extra);
                } catch (e) {
                    console.log(e);
                }
            }
        } finally {
            
        }
    },
}