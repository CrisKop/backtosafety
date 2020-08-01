exports.run = async(client, message, args, Discord) =>{
  
   let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
  if(!args[0]){
  const embed1 = new Discord.RichEmbed()
  .setTitle(green +"Back To Safety Commands")
  .setDescription(warning+`Every command start with b!\n
**Categories:**
b!help backup
b!help mod
b!help info
`)
  .setFooter("Use b!help <category> to see the commands.")
  .setThumbnail("https://cdn.discordapp.com/avatars/738556017792778262/1f2eafb1ea0a7e5b6430cef4c133c8e2.png?size=2048");
    return message.channel.send(embed1);
    
  }
  
  
  if(args[0].toLowerCase() === "backup"){
    const embed2 = new Discord.RichEmbed()
          .setTitle(
            `**b!backup**
Create & load backups of your servers
__**Commands**__
`
          )
          .setDescription(
            `
                **b!backup create**        Create a backup
                **b!backup delete**        Delete one of your backups
                **b!backup info**          Get information about a backup
                **b!backup list**          Get a list of your backups
                **b!backup load**          Load a backup
                **b!backup purge**         Delete all your backups`
          )
          .setFooter(
           // `Use \`b!help [command]\` for more info on a command.
`You can use \`b!help [category]\` for more info on a category.`
          )
          .setColor("#5DBCD2")
    .setThumbnail("https://cdn.discordapp.com/avatars/738556017792778262/1f2eafb1ea0a7e5b6430cef4c133c8e2.png?size=2048");
        message.channel.send(embed2);
        return;
  }
  
  
  
  if(args[0].toLowerCase() === "mod"){
    const embed2 = new Discord.RichEmbed()
          .setTitle(
            `**Moderator commands**
__**Commands**__
`
          )
          .setDescription(
            `
                **b!ban <user> <reason>   =**    Ban a user
                **b!kick <user> <reason>  =**    ឵  Kick a user
                **b!hackban <userID>    =**         Ban a user who is not on the server
                **b!lock       =**           Lock permission to everyone to type in a channel.
                **b!unlock     =**           Unlock permission to everyone to type in a channel.
`
          )
          .setFooter(
           // `Use \`b!help [command]\` for more info on a command.
`You can use \`b!help [category]\` for more info on a category.`
          )
          .setColor("#5DBCD2")
    .setThumbnail("https://cdn.discordapp.com/avatars/738556017792778262/1f2eafb1ea0a7e5b6430cef4c133c8e2.png?size=2048");
        message.channel.send(embed2);
        return;
  }
  
  
  
  if(args[0].toLowerCase() === "info"){
    const embed2 = new Discord.RichEmbed()
          .setTitle(
            `**Information commands**
__**Commands**__
`
          )
          .setDescription(
            `
                **b!serverinfo     =**    Get server info
                **b!userinfo      =**    ឵Get user info
                **b!invite      =**    Get bot invite
                **b!usercount  =**       Get detailed user count
                **b!infoemoji       =**       Get detailed emoji info
`
          )
          .setFooter(
           // `Use \`b!help [command]\` for more info on a command.
`You can use \`b!help [category]\` for more info on a category.`
          )
          .setColor("#5DBCD2")
    .setThumbnail("https://cdn.discordapp.com/avatars/738556017792778262/1f2eafb1ea0a7e5b6430cef4c133c8e2.png?size=2048");
        message.channel.send(embed2);
        return;
  }
  
  if(args[0] !== "backup" || "info" || "mod"){
    return message.channel.send("Category not founded.")
  }
  
  

  
  
}