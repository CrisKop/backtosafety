exports.run = async(client, message, args, Discord) =>{

   let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
        
	if(!message.guild.me.hasPermission("KICK_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('I dont have permissions, `Add me permission "Kick Members" or "Administrator"`').catch(e => console.log(e));
}
  
if(!message.member.hasPermission("KICK_MEMBERS") && (message.author.id !== message.guild.ownerID)){
  var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Permissions')
        .setDescription('You need `Kick Members` permission to use this command')
    return message.channel.send(missingPermissionsEmbed);
}

let persona = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!persona) {
   var missingArgsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Arguments')
        .setDescription('**Cmd Usage:** b!kick [@User|Id] [Reason]')
    return message.channel.send(missingArgsEmbed)
}
  
  if(persona.highestRole.comparePositionTo(message.guild.me.highestRole) > 0){
                  var memberSuperior = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
          .setTitle("Bot Missing Permissions")
        .setDescription('The Back To Safety Role Is Not The Highest Role In The Server or mentioned user role is higest')
            return message.channel.send(memberSuperior);
}
  
  if(persona.highestRole.comparePositionTo(message.member.highestRole) > 0 && (message.author.id !== message.guild.ownerID)){
                  var memberSuperior = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setTitle("Missing Permissions")
        .setDescription("The user mentioned higest role is higger than your gigest role and you can't kick him")
            return message.channel.send(memberSuperior);
}
  
    if(persona.highestRole.comparePositionTo(message.member.highestRole) === 0 && (persona.user.id !== message.author.id) && (message.author.id !== message.guild.ownerID)){
                  var memberSuperior2 = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
          .setTitle("Missing Permissions")
        .setDescription('You cant kick someone with the same higest role.')
            return message.channel.send(memberSuperior2);
}
  
   if(persona.highestRole.comparePositionTo(message.member.highestRole) === 0 && (persona.user.id === message.author.id)){
                  var memberSuperior2 = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
          .setTitle("Missing Permissions")
        .setDescription('You cant kick yourself.')
            return message.channel.send(memberSuperior2);
}
  
  
  
  if(persona.kickable === false){
      var memberSuperior3 = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
          .setTitle("Undefined Error")
        .setDescription('**The user isnt kickable**')
            return message.channel.send(memberSuperior3);
  }

var razon = args.slice(1).join(' ') 
if(!razon) {
  razon = `Reason Unespecified` 
}
  let razon1 = args.slice(1).join(' ') || "Reason Unespecified"
  
razon = razon+`, Banned by ${message.author.username}`



  
      var bannedEmbed2 = new Discord.RichEmbed() 
        .setColor('#ffffff')
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle(`You get kicked in ${message.guild.name}`)
        .addField('Kicked By', message.author.tag)
        .addField('Reason', razon1)
        .setTimestamp();
  persona.send(bannedEmbed2); 

    try{
await message.guild.member(persona).kick(razon)
       message.channel.send(new Discord.RichEmbed()
  .setColor('#00ff25')
  .setDescription(`**${persona} get kicked.**\nReason = **${razon1}**\nKicked by ${message.author}`))
} catch (error){
 return;
}
      

}