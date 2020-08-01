const moment = require('moment');
exports.run = async(client, message, args, Discord) =>{
  
  let icon; //variable vacia <-
  if(message.guild.icon === null){
  icon = ""
}
else if(message.guild.icon.startsWith("a_")){ //si icon comienza con a_ significa que es gif
icon = message.guild.iconURL.replace(".jpg", ".gif"); //reemplaza .jpg por .gif
}else{ //y si no es asi
icon = message.guild.iconURL.replace(".jpg", ".png") //reemplaza .jpg por .png
}
  if(args[0]) return;
  
    function T_convertor(ms) {      
      let años = Math.floor((ms) / (1000 * 60 * 60 * 24 * 365));
      let meses = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      let dias = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      let horas = Math.floor(((ms) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));


      let final = ""
      if(años > 0) final += años > 1 ? `${años}y, ` : `${años}y, `
      if(meses > 0) final += meses > 1 ? `${meses}M, ` : `${meses}M, `
      if(dias > 0) final += dias > 1 ? `${dias}d, ` : `${dias}d, `
      if(horas > 0) final += horas > 1 ? `${horas}h, ` : `${horas}h`
      return final
  }
  
  let region2 = {
        europe: "Europe :flag_eu:",
        brazil: "Brasil :flag_br: ",
        hongkong: "Hong Kong :flag_hk:",
        japan: "Japan :flag_jp:",
        russia: "Russia :flag_ru:",
        singapore: "Singapore :flag_sg:",
        southafrica: "South Africa :flag_za:",
        sydney: "Sydney :flag_au:",
        "us-central": "Central US :flag_us:",
        "us-east": "East US :flag_us:",
        "us-south": "South US :flag_us:",
        "us-west": "West US :flag_us:",
        "vip-us-east": "VIP US East :flag_us:",
        "eu-central": "Central Europe :flag_eu:",
        "eu-west": "West Europe :flag_eu:",
        london: "London :flag_gb:",
        amsterdam: "Amsterdam :flag_nl:",
        india: "India :flag_in:"
      };
  
  const verificationlvl12 = ['Null', 'Low', 'Medium', 'High', '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻']
  
 var server = message.guild;
  
const embed = new Discord.RichEmbed()
.setThumbnail(icon)
.setAuthor(server.name, icon)
.addField('Server ID', server.id, true)
.addField('Region', region2[server.region], true)
.addField('Creation Date', `${moment(message.guild.createdAt).format("**DD/MM/YYYY**")} (${T_convertor(Math.floor(Date.now()) - message.guild.createdTimestamp)} ago)`, true)
.addField('Server Owner', server.owner.user.tag, true)
.addField('Members', server.members.size, true)
.addField('Humans', `${message.guild.members.filter(member => !member.user.bot).size}`,true)
.addField('Bots', `${message.guild.members.filter(member => member.user.bot).size}`,true)
.addField('Roles', server.roles.size, true)
.addField('Emojis', server.emojis.size, true)
.addField('Boost Level', `${server.premiumTier}`+ "<:boost:738955495699644487>", true)
.addField('Boost Quantity', server.premiumSubscriptionCount + "<:boost:738955495699644487>", true)
.addField('Security Level', verificationlvl12[server.verificationLevel], true)
.setColor(0x66b3ff)
    
message.channel.send(embed);
  
  
}