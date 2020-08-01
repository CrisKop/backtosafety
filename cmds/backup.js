const mongoose = require("mongoose");
const svgCaptcha = require('svg-captcha');
const backupsdb = require("../database/models/backups.js")

exports.run = async(client, message, args, Discord) =>{
  try {
  
  
 let info = client.emojis.get("655091815401127966") || "ℹ️"; //https://cdn.discordapp.com/emojis/655091815401127966.png?v=1
      let waiting = client.emojis.get("655695570769412096") || "⌛"; //https://images-ext-1.discordapp.net/external/lWj3uW4qvfFB9t0QgGsDJ8vLvh5bSObQ-wwUxYFH4wo/https/images-ext-1.discordapp.net/external/AzWR8HxPJ4t4rPA1DagxJkZsOCOMp4OTgwxL3QAjF4U/https/cdn.discordapp.com/emojis/424900448663633920.gif
      let green = client.emojis.get("655696285286006784") || "✅"; //https://images-ext-2.discordapp.net/external/NU9I3Vhi79KV6srTXLJuHxOgiyzmEwgS5nFAbA13_YQ/https/cdn0.iconfinder.com/data/icons/small-n-flat/24/678134-sign-check-512.png
      let error = client.emojis.get("655704809483141141") || "❌"; //https://cdn.discordapp.com/emojis/655704809483141141.png?v=1
      let warning = client.emojis.get("656030540310380574") || "⚠️"; //https://cdn.discordapp.com/emojis/656030540310380574.png?v=1
  
   if (args[0] === "create" || args[0] === "c") {
     
     if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('I dont have permissions, `Add me permission "Administrator"`').catch(e => console.log(e));
}
     
     if(!message.member.hasPermission("ADMINISTRATOR") && (message.author.id !== message.guild.ownerID)){
  var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Permissions')
        .setDescription('You need `Administrator` permission to use this command')
    return message.channel.send(missingPermissionsEmbed);
}
     
     if(message.guild.channels.map(c => c.id).length > 26) return message.channel.send("No puedo crear backups de servidores con mas de 26 canales. Perdón.")
     
     let userbackups = await backupsdb.findOne({
userID: `${message.author.id}`
})
     let truexd;
     let backupid1 = svgCaptcha.randomText({size: 30})
     
        await message.guild.roles.filter(r =>r.name !== message.guild.member(client.user.id).highestRole.name).forEach(r => {if (r.comparePositionTo(message.guild.member(client.user.id).highestRole) > 0) 
            
        
        {
              
            truexd = true;
            }
          });
     if(truexd === true){
     let havnthighest = new Discord.RichEmbed()
                .setTitle(`${warning}  Warning`)
                .setDescription(
                  `The Back To Safety's Role Is Not The Highest Role In The Server , This May Cause Some Errors When Loading The Backup. !
                            
                            [Support](https://discord.gg/PPn4Q3)`
                )
                .setColor("#a11616");
     
      await message.channel.send(havnthighest);
     }

        let creatingEmbed = new Discord.RichEmbed()
          .setTitle(`${waiting}  Please wait ...`)
          .setDescription("Creating backup ... Please wait");
        message.channel.send(creatingEmbed).then(m => {
          let id = backupid1

          
          const channels = message.guild.channels
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(c => {
              
            /*  let permover1 = c.permissionOverwrites.map(r => r.id).then(p => {
                let elrolxd = message.guild.roles.get(p) || client.users.get(p)
                
                let resultxd = elrolxd.name || elrolxd.user.id
                
                return resultxd;
              })
              
              
              let permover2 = c.permissionOverwrites.map(r => r.type)
              */
              
              const channel = {
                type: c.type,
                name: c.name,
                postion: c.calculatedPosition,
                topic: c.topic,
              };
              if (c.parent) channel.parent = c.parent.name;
              return channel;
            });
          
          const roles = message.guild.roles
            .filter(r => r.name !== "@everyone" ).filter(role => !role.managed)
            .sort(function(a, b) {
              return a.position - b.position;
            })
            .array()
            .map(r => {
              const role = {
                name: r.name,
                color: r.color,
                hoist: r.hoist,
                managed: r.managed,
                permissions: r.permissions,
                mentionable: r.mentionable,
                position: r.position
              };
              return role;
            });

          if (userbackups){
            (async () => {
          let newBackup = {
       
            icon: message.guild.iconURL,
            name: message.guild.name,
            roles,
            channels
          };
            
             let tosave = new backupsdb({
  userID: `${message.author.id}`,
  backupid: backupid1, 
  backupInfo: newBackup
})
    
await tosave.save();
              })();

          

          let result = new Discord.RichEmbed()
            .setTitle(`${info}  Info`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${backupid1}\``
            )
            .addField(
              "Usage",
              `\`\`\`b!backup load ${backupid1}\`\`\`
\`\`\`x!backup info ${backupid1}\`\`\``
            )
            .setColor("#5DBCD2");

          message.author.send(result);

          let resultPublic = new Discord.RichEmbed()
            .setTitle(`${green}  Yeah!`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${backupid1}\``
            )
            .addField(
              "Usage",
              `\`\`\`b!backup load ${backupid1}\`\`\`
\`\`\`b!backup info ${backupid1}\`\`\``
            )
            .setColor("#59C57B");

          m.edit(resultPublic);
        }
        
        
                  if (!userbackups){
            (async () => {
          let newBackup = {
            icon: message.guild.iconURL,
            name: message.guild.name,
            roles,
            channels
          };
            
             let tosave = new backupsdb({
  userID: `${message.author.id}`,
  backupid: backupid1, 
  backupInfo: newBackup
})
    
await tosave.save();
              })();

          

          let result = new Discord.RichEmbed()
            .setTitle(`${info}  Info`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${backupid1}\``
            )
            .addField(
              "Usage",
              `\`\`\`b!backup load ${backupid1}\`\`\`
\`\`\`x!backup info ${backupid1}\`\`\``
            )
            .setColor("#5DBCD2");

          message.author.send(result);

          let resultPublic = new Discord.RichEmbed()
            .setTitle(`${green}  Yeah!`)
            .setDescription(
              `Created backup of **${message.guild.name}** with the Backup id \`${backupid1}\``
            )
            .addField(
              "Usage",
              `\`\`\`b!backup load ${backupid1}\`\`\`
\`\`\`b!backup info ${backupid1}\`\`\``
            )
            .setColor("#59C57B");
        setTimeout(() => {
        
          m.edit(resultPublic);
           }, 1000);
        }
        
        
        });
      }
    
    
    
     if (args[0] === "delete") {
        let code = args[1];
        let errorEmbed = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `You forgot to define the argument backup_id. Use b!help backup load for more information.
[Support](https://discord.gg/PPn4Q3)`
          )
          .setColor("#a11616");
        if (!code) return message.channel.send(errorEmbed);

        let cantfindbackup = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setTitle(`You have no backup with the id ${code}.`)
          .setDescription(
            `
[Support](https://discord.gg/PPn4Q3)`
          )
          .setColor("#a11616");
       
       
         let userbackup1 = await backupsdb.findOne({
userID: `${message.author.id}`,
backupid: `${code}`
})
       
        if (!userbackup1){
          return message.channel.send(cantfindbackup);
        }

       await userbackup1.deleteOne();

        let deletedsuc = new Discord.RichEmbed()
          .setTitle(`${green}  Yeah!`)
          .setDescription(`Successfully **deleted backup**.`)
          .setColor("#59C57B");
        message.channel.send(deletedsuc);
      }
    
    
    
    
    
    
    
     if (args[0] === "purge") {
        let errorEmbed = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `You did'nt backup any server yet
[Support](https://discord.gg/PPn4Q3)`
          )
          .setColor("#a11616");
       
       
        let userbackup43 = await backupsdb.findOne({
userID: `${message.author.id}`,
})
       
        if (!userbackup43)
          return message.channel.send(errorEmbed);

        let warningEmbed = new Discord.RichEmbed().setTitle(`${warning}  Warning`)
          .setDescription(`Are you sure that you want to delete all your backups?
__This cannot be undone!__`);
        message.channel.sendEmbed(warningEmbed).then(msg => {
          msg.react("✅").then(() => msg.react("❌"));

          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === message.author.id;

          let yes = msg.createReactionCollector(yesFilter, { time: 0 });
          let no = msg.createReactionCollector(noFilter, { time: 0 });

          yes.on("collect", r => {
         (async () => {

           await userbackup43.deleteOne();
           
            })();

            let deletedsuc = new Discord.RichEmbed()
              .setTitle(`${green}  Yeah!`)
              .setDescription(`Deleted all your backups.`)
              .setColor("#59C57B");
            message.channel.send(deletedsuc);
            msg.delete();
          });

          no.on("collect", r => {
            msg.delete();
            message.channel.send("Ok :)")
          });
        });
      }
    
    
    
    
    
    
    
     if (args[0] === "info" || args[1] === "i") {
        let id = args[1];
        let MissingbackupinfoEmbed = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `You forgot to define the argument **backup_id**. Use \`b!help backup info\` for more information   
                    [Support](https://discord.gg/PPn4Q3)`
          )
          .setColor("#a11616");
        if (!id) return message.channel.send(MissingbackupinfoEmbed);
       
        let userbackup2 = await backupsdb.findOne({
userID: `${message.author.id}`,
backupid: `${id}`
})
       

        let cantfindEmbed = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setDescription(
            `You have **no backup** with the id \`${id}\`.
                "[Support](https://discord.gg/PPn4Q3)`
          )
          .setColor("#a11616");
        if (!userbackup2) {
          return message.channel.send(cantfindEmbed);
        }

        try {
          let infoEmbed = new Discord.RichEmbed()
            .setTitle("Name: "+ userbackup2.backupInfo.name)
            .setThumbnail(userbackup2.backupInfo.icon)
            .addField(
              "Channels",
              `\`\`\`${userbackup2.backupInfo.channels
                .map(channel => channel.name)
                .join("\n")}\`\`\``,
              true
            )
            .addField(
              "Roles",
              `\`\`\`${userbackup2.backupInfo.roles
                .map(role => role.name)
                .join("\n")}\`\`\``,
              true
            )
          .setFooter("Backup ID: "+id)
          message.channel.send(infoEmbed);
        } catch (e) {
throw e;
        }
      }
    
    
    
    
     if (args[0] === "list") {
       
               let checking = await backupsdb.findOne({
userID: `${message.author.id}`,
})
       
        let userbackup3 = await backupsdb.find({
userID: `${message.author.id}`,
})
        
        
        if(!checking) return message.channel.send(new Discord.RichEmbed()
                                                  .setTitle(`${warning} No backups founded.`)
                                                     .setDescription("You dont have backups saved.")
                                                    );
      
        

       
       const ids = userbackup3.map(r => {
         
         let id = `**• ${r.backupid} - **${r.backupInfo.name}\n`
         
         
         return id;
       })
       
       

       
          let allistembed = new Discord.RichEmbed()
          .setTitle("List of all "+message.author.username+" backups.")
          .setDescription("**Usage of id's:**\nb!backup info {id}\nb!backup load {id}\n\n"+ids.join(" "));
       
       return message.channel.send(allistembed);
       
     }
    
    
    
    
          if (args[0] === "load" || args[0] === "l") {
            
              if(!message.guild.me.hasPermission("ADMINISTRATOR")) {
    return message.channel.send('I dont have permissions, `Add me permission "Administrator"`').catch(e => console.log(e));
}
     
     if(!message.member.hasPermission("ADMINISTRATOR") && (message.author.id !== message.guild.ownerID)){
  var missingPermissionsEmbed = new Discord.RichEmbed() 
        .setColor(`#ff0004`)
        .setAuthor(message.author.username, message.author.avatarURL)
        .setTitle('Missing Permissions')
        .setDescription('You need `Administrator` permission to use this command')
    return message.channel.send(missingPermissionsEmbed);
}
            
        let error = client.emojis.get("655704809483141141") || "❌";
        let code = args[1];
        let errorEmbed = new Discord.RichEmbed().setTitle(`${error}  Error`)
          .setDescription(`You forgot to define the argument backup_id. Use b!help backup load for more information.
[Support](https://discord.gg/PPn4Q3)`);
        if (!code) return message.channel.send(errorEmbed);
        let cantfindbackup = new Discord.RichEmbed()
          .setTitle(`${error}  Error`)
          .setTitle(`You have no backup with the id ${code}.`)
          .setDescription("[Support](https://discord.gg/PPn4Q3)")
          .setColor("#a11616");
            
            
            
             let userbackup4 = await backupsdb.findOne({
userID: `${message.author.id}`,
backupid: `${code}`
})
            
            
        if (!userbackup4) {
          return message.channel.send(cantfindbackup);
        }
            
            
            let verifyEmbed = new Discord.RichEmbed()
            .setTitle(`${warning} You really want load backup named ${userbackup4.backupInfo.name} ?`)
            
                    message.channel.send(verifyEmbed).then(msg => {
            setTimeout(() => {
          msg.react("✅") 
          }, 100);
                      
                         setTimeout(() => {
          msg.react("❌") 
          }, 200);



          let yesFilter = (reaction, user) =>
            reaction.emoji.name === "✅" && user.id === message.author.id;
          let noFilter = (reaction, user) =>
            reaction.emoji.name === "❌" && user.id === message.author.id;

          let yes = msg.createReactionCollector(yesFilter, { time: 0 });
          let no = msg.createReactionCollector(noFilter, { time: 0 });
                      
            yes.on("collect", r => {


 message.guild.channels.forEach(channel => {
                            setTimeout(() => {
                  channel.delete("For Loading A Backup");
         }, 700);
  
        });

        message.guild.roles
          .filter(role => !role.managed)
          .forEach(role => {
                                      setTimeout(() => {
                          role.delete("For Loading A Backup");
         }, 700);
          });
       (async () => {
        await userbackup4.backupInfo.roles.forEach(async function(
          role
        ) {
          
                                                setTimeout(() => {
                                  message.guild
            .createRole({
              name: role.name,
              color: role.color,
              permissions: role.permissions,
              hoist: role.hoist,
              mentionable: role.mentionable,
              position: role.position
            })
            .then(role => {
              role.setPosition(role.position);
            });
         }, 1000);

        });

        await userbackup4.backupInfo.channels
          .filter(c => c.type === "category")
          .forEach(async function(ch) {
            message.guild.createChannel(ch.name, {
              type: ch.type,
          //    permissionOverwrites: ch.permissionOverwrites,
            });
          });

        await userbackup4.backupInfo.channels
          .filter(c => c.type !== "category")
          .forEach(async function(ch) {
          
                                                          setTimeout(() => {
                                                            
                                    message.guild.createChannel(ch.name, {
              type: ch.type,
            }).then(c => {
                const parent = message.guild.channels
                  .filter(c => c.type === "category")
                  .find(c => c.name === ch.parent);
                ch.parent ? c.setParent(parent) : "";
                                      
                c.setTopic(ch.topic);
                                      
            //    c.OverwritePermissions(ch.permissionOverwrites);
            });
                                                            
         }, 1000);

          });
        message.guild.setName(userbackup4.backupInfo.name);
            if(userbackup4.backupInfo.icon !== null){
        message.guild.setIcon(userbackup4.backupInfo.icon);
            }
         })().then(m => {
                        let resultPublic2 = new Discord.RichEmbed()
            .setTitle(`${green}  Yeah!`)
            .setDescription(
              `Succefully Loaded Backup With The ID ${code}`
            )
            .setColor("#59C57B");
              
    let channel = client.channels.get(message.guild.systemChannelID || channelID);
   return channel.send(resultPublic2);
       })
              
               let channelID;
    let channels = message.guild.channels;
    channelLoop:
    for (let c of channels) {
        let channelType = c[1].type;
        if (channelType === "text") {
            channelID = c[0];
            break channelLoop;
        }
    }


            
          });

          no.on("collect", r => {
            msg.delete();
            
            message.channel.send("Ok :)")
          });

                    })
       
            
            
      }
    
 
    
    
    
    
      if (!args[0]) {
        const embed = new Discord.RichEmbed()
          .setTitle(
            `**b!backup**
Create & load backups of your servers
__**Commands**__
`
          )
          .setDescription(
            `
                b!backup create        Create a backup
                b!backup delete        Delete one of your backups
                b!backup info          Get information about a backup
                b!backup list          Get a list of your backups
                b!backup load          Load a backup
                b!backup purge         Delete all your backups`
          )
          .addBlankField()
          .setFooter(
            `Use \`b!help [command]\` for more info on a command.
You can also use \`b!help [category]\` for more info on a category.`
          )
          .setColor("#5DBCD2");
        message.channel.send(embed);
        return;
      }
  
  
     } catch (e) {
      throw e;
    }
    
}