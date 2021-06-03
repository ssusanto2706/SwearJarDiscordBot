require('dotenv').config();

const Discord = require('discord.js');
const MongoClient = require('mongodb').MongoClient;
const mongoose = require('mongoose');
const profileModel = require("../models/profileSchema");

const bot = new Discord.Client();

bot.commands = new Discord.Collection();
bot.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(bot, Discord);
});

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(()=>{
    console.log('connected to database');
}).catch((err)=>{
    console.log(err);
});

bot.login(process.env.BOT_TOKEN);