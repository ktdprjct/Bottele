const fetch = require("node-fetch")
module.exports = (msg, conn = { user: {} }) => {
    const isNumber = x => typeof x === 'number' && !isNaN(x)
    let user = global.db.data.users[msg.chat.id]
    if (typeof user !== 'object') global.db.data.users[msg.chat.id] = {}
    if (user) {
        if (!('banned' in user)) user.banned = false
        if (!('premium' in user)) user.premium = false
        if (!isNumber(user.hit)) user.hit = 0
        if (!isNumber(user.warning)) user.warning = 0
        if (!('registered' in user)) user.registered = false
        if (!user.registered) {
            if (!('name' in user)) user.name = msg.from.first_name
            if (!('email' in user)) user.email = ''
            if (!isNumber(user.regTime)) user.regTime = -1
        }
    } else global.db.data.users[msg.chat.id] = {
        banned: false,
        premium: false,
        hit: 0,
        warning: 0,
        registered: false,
        name: msg.from.first_name,
        email: '',
        regTime: -1
    }
}