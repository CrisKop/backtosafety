

//start of yout bot xd

//heroku update ._.

const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "b!";
const db = require("./database/database.js");
db.then(() => console.log("Conectado"))


client.login("NzM4NTU2MDE3NzkyNzc4MjYy.XyNn5A.iz1vlg6j4TKvbblwAKzlyJ2w1Pk");

 client.on("ready", () => {
  //  let servers = client.guilds.size
// const estados = [`@iwi#8344 help`]
    console.log("Encendido");
    client.user.setStatus('online')
   client.user.setActivity("b!help"); 
  //  setInterval(() => {
  //   let result = Math.floor((Math.random() * estados.length));
//          client.user.setActivity(estados[result]); 
//}, 15000)
 });




//acción al mencionar al bot
client.on('message',async message=> {
   if(message.author.bot) return;
let prefix = "b!"

   let args = message.content.slice(prefix.length).split(/ +/g);
    let canal = args.slice(1).join(' ')
    if(message.isMentioned(client.user) && canal === "help") {
    return   message.channel.send(new Discord.RichEmbed()
                      .setTitle("✅Back To Safety Commands")
  .setDescription(`⚠️Every command start with b!\n
**Categories:**
b!help backup
b!help mod
b!help info
`)
  .setFooter("Use b!help <category> to see the commands.")
  .setThumbnail("https://cdn.discordapp.com/avatars/738556017792778262/1f2eafb1ea0a7e5b6430cef4c133c8e2.png?size=2048")
                      );
    }
   else if (canal != "") return;
    if (message.isMentioned(client.user)) {
       let embed = new Discord.RichEmbed()
                         .setColor('#1fca9c')
                         .setDescription('My prefix is `'+prefix+'`\n\nUse `'+prefix+'help` to obtain commands list.')
      .setFooter(client.user.username, client.user.avatarURL)
                         .setTimestamp()
                         
       message.channel.send(embed)
}
});




client.on("message",async message => {
  
  //COMMANDS
  

  
  
  
  if(message.author.bot) return;
if (!message.content.toLowerCase().startsWith(prefix)) return; 
  
  
   const args = message.content.slice(prefix.length).split(/ +/g);
 const command = args.shift().toLowerCase();
  
  
  try{
   let x = require(`./cmds/${command}`)
   x.run(client, message, args, Discord)
 }catch(e){
   console.log()
 }finally{
   console.log(`Comando ejecutado: ${command} por: ${message.author.tag} en el sevidor: ${message.guild.name} (${message.guild.id})`)
 }
  
})



