const Discord = require ('discord.js')

exports.run = async (client, message, args) => {
  
  let icon; //variable vacia <-
  if(message.guild.icon === null){
  icon = ""
}
else if(message.guild.icon.startsWith("a_")){ //si icon comienza con a_ significa que es gif
icon = message.guild.iconURL.replace(".jpg", ".gif"); //reemplaza .jpg por .gif
}else{ //y si no es asi
icon = message.guild.iconURL.replace(".jpg", ".png") //reemplaza .jpg por .png
}
  
let estadouser = {
      online: "O",
      idle: "A",
      dnd: "N",
      invisible: "I"
    };

    const embed = new Discord.RichEmbed()
     .setColor(0x66b3ff)
      .setThumbnail(icon)
      .setAuthor("Members into the server", icon)
      .setFooter(
        "Requested by " + message.author.username + "",
        message.author.avatarURL
      )
      .setTimestamp()
      .addField(
        "👥 Members",
        "**" + message.guild.members.size + "** **Total Members**\n├── "+message.guild.members.filter(member => !member.user.bot).size+" persons 👥\n└── "+

message.guild.members.filter(member => member.user.bot).size+" bots 🤖",
        true
      )
      .addField(
        "Members States","<:online:738950148020895775> | **Online: **" + message.guild.members.filter(i => i.presence.status === "online").size +
"\n<:idle:738950147580362838> | **Idle: **" +message.guild.members.filter(dnd => dnd.presence.status === "idle").size +  "\n<:dnd:738950148021026816> | **Occuped: **" + message.guild.members.filter(o => o.presence.status === "dnd").size    + "\n<:invisible:738950147555459083> | **Offline:** " + message.guild.members.filter(o => o.presence.status === "offline").size
    
      );
  

    message.channel.send(embed);
  }