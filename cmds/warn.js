const Discord = require('discord.js');
const fs = require("fs");
let profile = require("../profile.json");

module.exports.run = async (bot, message, args) => {

  try {

  function send (msg) {
    message.channel.send(msg);
  }

  if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("У вас нет прав!");
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

  if (!args[0]) return send("Вы не указали пользователя");
  if(!rUser) return send("Пользователь не найден");

  profile[rUser.id].warns++;

  fs.writeFile('./profile.json', JSON.stringify(profile), (err) => {
    if (err) console.log(err);
  });

  if (profile[rUser.id].warns >= 100) {
    message.guild.member(rUser).kick("100/100 Предупреждений");
  }

  let embed = new Discord.MessageEmbed()
  .setDescription("Предупреждение")
  .addField("Администратор", message.author.username)
  .addField("Выдал предупреждение", `${rUser.user.username}`)
  .addField("Количество предупреждений", `${profile[rUser.id].warns}/100`);

  message.channel.send(embed);
  } catch (err) {
    console.log(`1.${err.name}\n2.${err.message}\n3.${err.stack}`);
  }

};

module.exports.help = {
  name: "warn"
};