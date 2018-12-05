const Discord = require("discord.js");
const bot = new Discord.Client();


bot.on("ready", () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`); 
  bot.user.setActivity(`16278 Shards`, {type: "WATCHING"})
});

bot.on("message", async (message) => {
  if (message.author.bot) return;
  if (message.channel.type === "dm") return
  
  let prefix = "]" // bisa ganti lah ya
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
