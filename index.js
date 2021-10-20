const dotenv = require('dotenv')
const express = require('express')
// node-fetch was converted to be a ESM only package, so I couldnt use require. async import() used instead
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const server = express()
const PORT = process.env.PORT || 3000

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

dotenv.config()

function getInspired() {
    return fetch('https://zenquotes.io/api/random')
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            return data[0]["q"] + " -" + data[0]["a"] // format quote
            // q is quote, - and then a is the author of the quote
        })
}

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
    if(msg.author.bot) return 

    if (msg.content === "inspire me") {
        getInspired().then((quote) => {msg.channel.send(quote)})
    }
})

client.login(process.env.TOKEN)

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})