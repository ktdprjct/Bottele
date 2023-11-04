let fs = require("fs");
let axios = require("axios");
let { youtubeSearch, youtubedl, youtubedlv2 } = require('@bochilteam/scraper')
let handler = async (msg, {chatId, conn, text, command, args, usedPrefix}) => {
    if(!text) throw conn.sendMessage(chatId, `Contoh: ${usedPrefix + command} judul atau url`)
    
    let Tot = await youtubeSearch(text)
    let vid = Tot.video[0]
    let texts = `
Judul: ${vid.title}
desc: ${vid.description}
Durasi: ${vid.durationH}
Publish: ${vid.publishedTime}`
    
    conn.sendPhoto(chatId, vid.thumbnail, { caption: texts })
    const fileOptions = {
        filename: vid.title,
        contentType: 'audio/mpeg',
    };
    let p = await youtubedl(vid.url)
    
    //console.log(p)
    let fetch = require("node-fetch")
    let res_m = await p.audio['128kbps'].download()
    let avc = await fetch(res_m)
    let hsh = await avc.arrayBuffer()
    console.log (avc)
 //   console.log(res_m)
    console.log(hsh)

    /*async function fetchData() {
        try {
            const response = await axios.get(`https://xzn.wtf/api/y2mate?url=${vid.url}&apikey=filand`);
            const tes = response.data;
            const audioUrl = tes.audio["128kbps"].url;
            const audioBuffer = await axios.get(audioUrl, { responseType: 'arraybuffer' });
            
            // Simpan data audio ke berkas dengan menggunakan fs.writeFileSync
            fs.writeFileSync(vid.title + '.mp3', Buffer.from(audioBuffer.data))
            //kirim hasil ke tele
            conn.sendAudio(msg.chat.id, fs.readFileSync(vid.title + ".mp3"), {}, fileOptions)
            //console.log("Audio file downloaded and saved as output_audio.mp3");
        } catch (error) {
            console.error("Error fetching or saving audio file:", error);
        }
        fs.unlinkSync(vid.title + ".mp3");
    }
    fetchData();
    */
}
handler.help = ['play'].map(v => v + ' <query>')
handler.tags = ['downloader']
handler.command = /^play$/i
module.exports = handler