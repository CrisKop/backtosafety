exports.run = async(client, message, args, Discord) =>{
     let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
  
         let mid = args[0];
  	 if(!message.guild.me.hasPermission("BAN_MEMBERS") && !message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('I dont have permissions, `Add me permission "Ban Members" or "Administrator"`').catch(e => console.log(e));
}
  
  
  
  if (!message.member.hasPermission(["BAN_MEMBERS"], false, true, true)) {
  var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Permissions')
        .setDescription('You need `Ban Members` permission to use this command')
    return message.channel.send(missingPermissionsEmbed);
}
  
   if(!mid)
    return  message.channel.send('> Add to argument a user ID\n > `This command was made to ban people without the need for them to be attached to the server.`') //Aquí te devuelve este mensaje si no agregaste una ID al momento de ejecutar el comando  
   
  if(isNaN(args[0])) { return  message.channel.send(new Discord.RichEmbed() 
        .setColor(`#ff0000`)
        .setDescription(`**Enter a user id... Remember: the id's don't include letters.**`))
         };
  
  let ididid = client.fetchUser(mid);
  
    client.fetchUser(mid).catch(err => { console.log("Error en la id del usuario "+args[0])}).then(id => {
      message.guild.ban(id).catch(err => {
        return message.channel.send("Error with the user id " + "__**"+args[0]+"**__"); //Si agregaste mal la ID
        console.log(err);
      })
      if(ididid === "undefined") { return; } else {
      message.channel.send(`${green}Yeah!, **${id.tag}** got banned by ${message.author}`)
      }
      
      
  
      



    }
                               )
}