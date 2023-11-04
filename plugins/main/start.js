let handler = async(msg, {conn, chatId}) => {
    const caption = `Halo kak ${msg.from.first_name}! ada yang bisa saya bantu ?\nUntuk melihat fitur bot silahkan ketik /menu\n\nbot ini dibuat oleh [${owner}].`
        
    conn.sendPhoto(chatId, gambar, { caption: caption });
}
handler.command = /^(start)$/i

module.exports = handler