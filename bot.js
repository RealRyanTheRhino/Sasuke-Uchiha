const Discord = require("discord.js");
const bot = new Discord.Client();
const config = require('./config.json')
const math = require("math-expression-evaluator")
const pokegif = require('pokemon-gif');
const webdict = require('webdict');
const Kitsu = require('kitsu');

bot.on("ready", () => {
console.log(`${bot.user.username} is ready for your orders!`)
bot.user.setStatus("online")
})

bot.on("message", (message) => {

if (message.author.bot) return; 
if (!message.guild) {
    return bot.guilds.get(`409442464223723520`).channels.get(`409469714356502528`).send({embed: new Discord.RichEmbed()
        .addField(`Message`, message.content)
        .setFooter(message.author.username, message.author.avatarURL)
    }).catch((e) => console.log(e));
}

	let command = message.content.split(" ")[0];
	command = command.slice(config.pf.length);
	
	let args = message.content.split(" ").slice(1);
	
///cmds without prefix

	if (message.author.bot) return;

	if(message.content.toLowerCase() == "no u") {
    	message.channel.send('no u')
    }
	if (message.content.startsWith("2 + 2 is 4")) {
		message.channel.send("- 1 that's 3 QUICK MAFFS")
	}
	if (message.content.startsWith("gay") || message.content.startsWith("Gay")) {
		message.channel.send(`Excuse me, cunt`)
	}
	if (message.content.toLowerCase() == "to the pedo mobile!") {
		var embed = new Discord.RichEmbed()
		.setTitle("Tanananana!")
		.setImage("https://static.fjcdn.com/pictures/Pedo_36e86c_44042.jpg")
		.setColor('e407a9')
		message.channel.send({embed: embed})
	}
	if (message.content.toLowerCase() == "hi") {
        if(args[0]) return
        message.reply("Hi")
    }

///cmds with prefix

	if (!message.content.startsWith(config.pf)) return;
	
	if (command === "ping") {
		var embed = new Discord.RichEmbed()
		.addField('Ping:', Math.round(bot.ping))
		.setColor('e407a9')
		message.channel.send({embed: embed})
	}
	if (command === "say") {
		message.channel.send(`${args.join(" ")}`)
	}
	if (command === "sayd") {
		message.channel.send(`${args.join(" ")}`)
		message.delete(5)
	}
	if (command === "avatar") {
		let mention = message.mentions.members.first();
		var embed = new Discord.RichEmbed()
		if(!args[0]) {
			message.reply("Mention someone you dummy!")
		}
		else { 
			message.channel.send(mention.user.avatarURL)
		}
	}
	if (command === "embed") {
		var embed = new Discord.RichEmbed()
		.setTitle(`${args.join(" ")}`)
		.setColor('e407a9')
		message.channel.send({embed: embed})
	}
	if (command === "embedd") {
		var embed = new Discord.RichEmbed()
		.setTitle(`${args.join(" ")}`)
		.setColor('e407a9')
		message.channel.send({embed: embed})
		message.delete(10)
	}
	if (command === "dm") {
		if(!args[0]) {
			message.reply("Say something you dummy!")
		}
		else {
		message.author.send(`${args.join(" ")}`)
		}
	}
	else if (command === "help") {
       message.author.send({embed: new Discord.RichEmbed()
        .setTitle("Help")
        .addField("Prefix", ">>")
        .addField("ping", "The bot says Pong!")
        .addField("say", "Make the bot say something")
        .addField("sayd", "Make the bot say something and delete your message")
        .addField("avatar", "The bot shows someone's pfp")
        .addField("embed", "Make the bot say something in a little box")
        .addField("embedd", "Make the bot say something in a litle box an delete your message")
        .addField("calc", "Make the bot do your maths homework")
        .addField("invite", "The bot gives you a link to invite it on a server")
        .addField("pokegif", "The bot shows a gif with the pokemon that you mention")
        .addField("8ball", "The bot will answer a yes or no question")
        .addField("ud", "The bot will tell you the deffinition of a word from the urbandictionary")
        .addField("bots", "The bot gives u a link to the website with other bots")
        .setColor(0xe407a9)
        .setThumbnail(bot.user.avatarURL)
        .setFooter(message.author.username, message.author.avatarURL)
})
}
    else if (command === 'pokegif') {
    	try {

    		message.channel.send({embed: new Discord.RichEmbed()
    			.setDescription(`\`${args.join(' ')}\``)
    			.setImage(pokegif(args.join(' ')))
    			.setColor('e407a9')
    		})

    	} catch (err) {
    		message.channel.send(`There's no pokemon with that name ${message.author.username}`);
    	}
    }
    
    else if (command === 'invite') {
    	message.channel.send('https://discordapp.com/oauth2/authorize?client_id=402175691107598346&scope=bot&permissions=854752318')
    }

    else if (command === 'bots') {
    	message.channel.send('https://bots.discord.pw')
    }
	
////randomizers

	var ball = ["yes", "no", "hopefully not", "hopefully"]
	let Picked = ball[Math.floor(Math.random() * ball.length)]
	
	if (command === "8ball"){
		if(!args[0]) {
			message.reply("Say something you dummy!")
		}
		else { 
		message.channel.send(Picked)
	 }
	}
////big boi commands	
	
	if (command === "calc" || command === "calculate" || command === "solve") {
	let question = message.content.split(' ').slice(1).join(' ');
    if (question == '' || question === undefined) return message.channel.send('Make an equation (2+2)');
    if (question) {
        try {
        let answer = math.eval(question);
        let mathEmbed = new Discord.RichEmbed()
            .setDescription('Equation:' + ' `' + `${question}` + '`')
            .addField('Answer:' ,  ' `' + `${answer}` + '`')
            .setColor('e407a9')
            .setFooter(message.author.username, message.author.avatarURL)
            message.channel.send({embed: mathEmbed}).catch(message.error);
        } catch(e) {
            message.channel.send(`**:x: Invalid Equation:**` + ' `' + `${e.message}` + '`');
        }
    }
  }

  	if (command === "ud") {
  		let toDefine = args.join(' ');

		if (!toDefine) return message.channel.send("Say something you dummy!")

		webdict('urbandictionary', toDefine).then(resp => {
        let result = resp.definition
        try {
        var defineEmbed = new Discord.RichEmbed()
                .setDescription(`Word: \`${toDefine}\``)
                .addField('Def:' , `${result}`)
                .setFooter(message.author.tag, message.author.avatarURL)
                .setColor(`e407a9`)
        if (resp.definition) return message.channel.send({embed: defineEmbed})
        else return message.channel.send(`Could not find \`${toDefine}\`.`);
    } catch (e) {
        message.channel.send(`:x: | \`${e.message}\``);
    }
    })
  }

 ////owner commands

	if (command === "setgame") {
		if(!args[0]) {
			message.reply("Say something you dummy!")
		}
		else {
			if (message.author.id != (config.ownerID)) {
				message.reply('you are not my master')
			} else {
		message.channel.send(`Game set to: ${args.join(" ")}`)	
		bot.user.setGame(`${args.join(" ")}`)
		}
	}
	}
	
	if (command === "setname") {
		if(!args[0]) {
			message.reply("Say something you dummy!")
		}
		else {
			if (message.author.id != (config.ownerID)) {
				message.reply('you are not my master')
			} else {
			bot.user.setUsername(`${args.join(" ")}`)
			message.channel.send(`Name changed to: ${args.join(" ")}`)
	}
	}}
	else if (command == "dms") {
    if (message.author.id !== "297719754246979585") return message.channel.send("only owner can do that you dummy");

    try {
   
    	let mention = bot.users.get(args[0])

      if (!args[1]) return message.channel.send("**Gotta type something there dummy**");

      if (!mention) return message.channel.send("idk who that is dummy")
      message.delete(10)
      mention.send(args.slice(1).join(" "))
    }
    catch(error) {
      message.channel.send("`" + error.message + "`")
    }
  }
  if (message.author.bot) return;
if (!message.guild) {
  bot.guilds.get("409442464223723520").channels.get("409469714356502528").send({embed: new Discord.RichEmbed()
   .setDescription(`Message from: **${message.author.tag}**(${message.author.id})`)
   .addField("Message:", message.content)
   .setColor("0x" + randomHex.generate().slice("#"))
   .setFooter(message.author.username ,message.author.avatarURL.replace('?size=2048', ''))
 })
}

if (command === "eval") {
         if (message.author.id !== (config.ownerID)) return message.reply("You can't.")
         try {
             var code = args.join(" ")
             var evaled = eval(code)

             var embed = new Discord.RichEmbed()
             .addField('\`\`\`INPUT\`\`\`', '\`\`\`' + `${code}` + '\`\`\`')
             .addField('\`\`\`OUTPUT\`\`\`', '\`\`\`' + ("x1", clean(evaled)) + '\`\`\`')
             .setColor('e407a9')

             if (typeof evaled !== "string")
                 evaled = require("util").inspect(evaled)

             message.channel.send({embed: embed})
         } catch(err) {

             var erro = new Discord.RichEmbed()
             .setTitle('\`ERROR\`')
             .setDescription(`\`\`\`${clean(err)}\`\`\``)

             message.channel.send(err);
         }
     } 

/// END MESSAGE THING
	function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
})
bot.login(process.env.BOT_TOKEN);
