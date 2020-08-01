exports.run = async(client, message, args, Discord) =>{
  let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
  
  if(args[0]) return;
if(!message.member.hasPermission("MANAGE_CHANNELS") && (message.author.id !== message.guild.ownerID)){
  var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Permissions')
        .setDescription('You need `Manage Channels` permission to use this command')
    return message.channel.send(missingPermissionsEmbed);

}
message.channel.overwritePermissions(message.guild.id, {
SEND_MESSAGES: true
}).catch(e=> console.log(e))
  message.channel.send(`${green} Channel unlocked for everyone. Use **b?lock** to lock.`)
}