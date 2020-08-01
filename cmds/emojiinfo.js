exports.run = async(client, message, args, Discord) =>{ 
 if (!args[0]) return message.channel.send("Usage: b!emojiinfo <emoji>");
  if(args[0].includes("<:" && ">")) return message.channel.send("I need to know the name of the emoji, not the emoji.");
    let emoji =
      client.emojis.get(args[0]) ||
      client.emojis.find(e => e.name.toLowerCase() === args[0].toLowerCase());
    if (!emoji) {
   
      return message.channel.send("Emoji not founded.");
    }

    let auth;
    if (
      message.guild.me.hasPermission("MANAGE_EMOJIS") &&
      emoji.guild.id === message.guild.id
    ) {
      auth = await emoji.fetchAuthor();
    } else {
      auth = "*Missing Permission*";
    }
    const embed = new Discord.RichEmbed()
      .setTitle("Info del emoji " + emoji.name)
      .setThumbnail(emoji.url)
      .setColor("RANDOM")
      .addField("ID", emoji.id, true)
      .addField("URL", `[Click here](${emoji.url})`, true)
      .addField("Usage", "`" + emoji.toString() + "`", true)
      .addField("Animated?", emoji.animated ? "Yes" : "No", true)
      .addField("Managed?", emoji.managed ? "Yes" : "No", true)
      .setFooter("Creation Date")
      .setTimestamp(emoji.createdAt);
    if (emoji.guild.id === message.guild.id) {
      embed
        .addField("Author", auth, true)
        .addField(
          "Roles can use this emoji",
          emoji.roles.first()
            ? emoji.roles.map(e => `${e}`).join(", ")
            : "@everyone"
        );
    }

    message.channel.send(embed);
}