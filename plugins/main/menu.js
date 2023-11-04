let fs = require('fs')
let path = require('path')
let package = require('../../package.json')
let fetch = require('node-fetch')

let tags = {
  'main': 'M A I N && I N F O',
  'internet': 'I N T E R N E T',
  'tools': 'T O O L S',
  'downloader': 'D O W N L O A D E R',
  'group': 'G R O U P',
  'owner': 'O W N E R',
}
const defaultMenu = {
  before: `
Halo *%name* !
Saya Bot yang siap membantu anda
mendownload dan mencari
informasi melalui WhatsApp.

%readmore`.trimStart(),
  header: '┌	◦ *%category*',
  body: '│	◦ %cmd %isDisable %isReg %islimit',
  footer: '└	◦ ◦ ◦\n',
  after: `
`,
}

let handler = async(msg, {conn}) => {
    try {
        let name = msg.from.first_name
    } catch (e) {
        
    }
}