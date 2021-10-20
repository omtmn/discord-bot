const dotenv = require('dotenv')
const express = require('express')
const server = express()
const PORT = process.env.PORT || 3000

const Discord = require('discord.js')
const { Client, Intents } = require('discord.js')
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

dotenv.config()

client.on("ready", () => {
    console.log(`logged in as ${client.user.tag}!`)
})

client.on("message", (msg) => {
    if (msg.content === "ping") {
        msg.reply("pong")
    }
})

client.login(process.env.TOKEN)

server.listen(PORT, () => {
    console.log(`server listening on ${PORT}`)
})