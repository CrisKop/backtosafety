exports.run = async(client, message, args, Discord) =>{
   if(message.author.id !== "618633182241357834") return;
  if (!args[0]) return message.channel.send("Put something to evaluate.");
  
    let limit = 1005;
    let code = args.join(' ');
    if(code.toLowerCase().includes("process.env")) return;
   if(code.toLowerCase().includes("client.token")) return;
    try {
      let evalued = await eval(code);
      if (typeof evalued !== "string")
        evalued = require("util").inspect(evalued, { depth: 0 });
      let txt = "" + evalued;
      if (txt.length > limit) {
        const embed = new Discord.RichEmbed()
        .setAuthor("Evaluation done!", client.user.displayAvatarURL)
        .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
        .addField("Output", `\`\`\`js\n ${txt.slice(0, limit)}\n\`\`\``)
        .setColor("RANDOM")
        
        message.channel.send(embed);
      } else {
        var embed = new Discord.RichEmbed()
          .setAuthor("Evaluation done!", client.user.displayAvatarURL)
          .addField("Input", `\`\`\`js\n${code}\n\`\`\``)
          .addField("Output", `\`\`\`js\n ${txt}\n\`\`\``)
          .setColor("RANDOM")
        message.channel.send(embed);
      }
    } catch (err) {
      const embed = new Discord.RichEmbed()
      .setAuthor("Error!", client.user.displayAvatarURL)
      .addField("Error:", `\`\`\`js\n${err}\n\`\`\``)
      .setColor("RANDOM")
      
      message.channel.send(embed);
  }
}