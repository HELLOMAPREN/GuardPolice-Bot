const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require("./config.json");

bot.on("ready", () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
  bot.user.setActivity(`Guarding ${bot.guilds.size} servers`, {type: "WATCHING"})
});

bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
});

bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});


bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;
  
//  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
//  const command = args.shift().toLowerCase();
bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return
  
  let prefix = "g:" // bisa ganti lah ya
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

  if (!message.content.startsWith(prefix)) return;
try {
    let commandFile = require(`./cmds/${cmd}.js`);
    commandFile.run(bot, message, args);
} catch (e) {
    console.log(e.message)
} finally {
    console.log(`${message.author.tag} menggunakan perintah ${cmd}`);
}

});

bot.login(process.env.token);
