const axios = require("axios")
let handler = async(msg, {conn, chatId}) => {
    let { data } = await axios("https://waifu.pics/api/sfw/waifu")
    conn.sendPhoto(chatId, data.url, {
      caption: `Source: ${data.url}`,
        reply_markup: {
            inline_keyboard: [
                [{ text: "Next", callback_data: "wnext" }, { text: "Delete", callback_data: "d" }],
                [{ text: "info", callback_data: "infobot" }]
            ]
        }
    })
}
handler.help = ['waifu']
handler.tags = ['anime']
handler.command = /^(waifu)$/i

module.exports = handler