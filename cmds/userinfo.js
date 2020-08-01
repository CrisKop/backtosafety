const moment = require('moment');

exports.run = async(client, message, args, Discord) =>{
  
    let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
  
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
  let xde = args.join(" ") || message.author.tag;
  let userm = message.mentions.members.first() || message.guild.members.get(args[0]) || message.guild.members.find(u => new RegExp(`${xde}`, "gim").test(u.user.tag.toLowerCase())) || message.member;

   let icon; //variable vacia <-
  if(userm.user.avatar === null){
  icon = ""
}
else if(userm.user.avatar.startsWith("a_")){ //si icon comienza con a_ significa que es gif
icon = userm.user.avatarURL.replace(".jpg", ".gif"); //reemplaza .jpg por .gif
}else{ //y si no es asi
icon = userm.user.avatarURL.replace(".jpg", ".png") //reemplaza .jpg por .png
} 
  
  
   let ptext = "";
const npresence = userm.presence.activities[0]
if (npresence == "Custom Status" || npresence == "CUSTOM_STATUS") {
 if (npresence.emoji) ptext += npresence.emoji.toString() + " ";
 if (npresence.state) ptext += npresence.state;
 ptext += "\n"
 } else {
   ptext = userm.presence.game != null ? userm.presence.game.name : "Nada"
 }
  
  
     const Duration = require('humanize-duration');
        const shortSpanishHumanizer = Duration.humanizer({
  language: 'shortEn',
  languages: {
    shortEn: {
      y: () => 'years',
      mo: () => 'months',
      w: () => 'weeks',
      d: () => 'days',
      h: () => 'hrs',
      m: () => 'mins',
      s: () => 's'
    }
  }
})
    let created = shortSpanishHumanizer(userm.user.createdTimestamp - Date.now(), { round: true });
  
  let joined = shortSpanishHumanizer(userm.joinedTimestamp - Date.now(), { round: true });
  
let estadouser = {
      online: "<:online:738950148020895775>Online",
      idle: "<:idle:738950147580362838>Idle",
      dnd: "<:dnd:738950148021026816>Occupied",
      offline: "<:invisible:738950147555459083>Offline"
    };
  
  
  let esunbot = {
false: `❌Not a bot.`,
    true: `✅Yea, a bot.`
    };
  
   let estadoxd = estadouser[userm.presence.status];
  
  
  let userroles;
  if(message.guild.member(userm).roles.filter(r => r.name !== "@everyone").map(roles => `\`${roles.name}\``).join(', ').length === 0){
    userroles = "This user don't have roles"
  } else {
    userroles = message.guild.member(userm).roles.filter(r => r.name !== "@everyone").map(roles => `\`${roles.name}\``).join(', ')
  }
  
  const embed = new Discord.RichEmbed()
    .setThumbnail(icon)
    .setAuthor(userm.user.username+'#'+userm.user.discriminator, icon)
  .addField('Nickname', userm.nickname != null ? userm.nickname : "No", true)
    .addField('Custom Status', ptext, true)
    .addField('ID', userm.id, true)
    .addField('Status', `${estadoxd}`, true)
  .addField('Its a bot?', `${esunbot[userm.user.bot]}`, true)
    .addField('Creation Date', `**${moment(userm.user.createdTimestamp).format('L')}** (${created} ago)`)
  .addField('Join Date', `**${moment(userm.user.joinedTimestamp).format('L')}** (Hace ${joined} ago)`, true)
  .addField('Roles', userroles)
    .setColor(0x66b3ff)
    
  message.channel.send(embed);

}