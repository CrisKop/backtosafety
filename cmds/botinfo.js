const mongoose = require("mongoose");
const backupsdb = require("../database/models/backups.js")
exports.run = async(client, message, args, Discord) =>{


const allbackups = await backupsdb.find();
  
  const xd = allbackups.length;


  

message.channel.send( new Discord.RichEmbed()
    .setAuthor(client.user.username+' Info', client.user.avatarURL)
   .addField('Back To Safety Info:', `**• Creator: **CrisKop#0836\n**• Actual Server: **${message.guild.name}\n**• Prefix:** b!\n**• Version:** 0.1 (Beta)`, true)
  .addField(`Back To Safety Stats:`, `**• Users: **${client.users.size}\n**• Servers: **${client.guilds.size}\n**• Channels:** ${client.channels.size}\n**• Total Backups:** ${xd}`, true)
                          .setFooter(client.user.username+'#5637', client.user.avatarURL)
                         .setTimestamp()
                         .setThumbnail(client.user.avatarURL)
                         .setColor('#7cce9f')
    )
  
}