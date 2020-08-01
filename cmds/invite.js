exports.run = async(client, message, args, Discord) =>{
  
  if(args[0]) return;

	   let invite = "https://discord.com/oauth2/authorize?client_id=738556017792778262&scope=bot&permissions=8"
     const embed = new Discord.RichEmbed()
.setColor('#00ff25')
.addField('Link to invite me: (You can also right click and copy the link)','[☑️ https://discord.com/oauth2/authorize?client_id=738556017792778262&scope=bot&permissions=8 ☑️](https://discord.com/oauth2/authorize?client_id=738556017792778262&scope=bot&permissions=8)')
    message.channel.send(embed)
   }