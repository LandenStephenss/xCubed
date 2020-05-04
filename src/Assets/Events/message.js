const User = require('../Structures/Database/User');
const Guild = require('../Structures/Database/Guild');
const NoXP = new Set();
class Message {
	constructor(client) {
		this.client = client;
		this.levels = new Array().concat({
			level: 0,
			xp: 1000
		});
		for (var i = 0; i < 100; i++) {
			this.levels.push({
				level: i + 1,
				xp: Math.floor(this.levels[i].xp * 1.35)
			});
		}
	}
	async run(message) {
		if (message.channel.type === 'dm' || message.author.bot) return;
		if (await this.client.guildDB.countDocuments({
			'_id': message.guild.id
		}, {
			limit: 1
		}).then((res) => res == 0)) {
			this.client.guildDB.insertOne(Guild(message.guild));
		}
		if (await this.client.userDB.countDocuments({
			'_id': message.author.id
		}, {
			limit: 1
		}).then((res) => res == 0)) {
			await this.client.userDB.insertOne(User(message.author));
			console.log(`${message.author.tag} added to the database!`);
		}
		await message.mentions.users.forEach(async (user) => {
			if (await this.client.userDB.countDocuments({
				'_id': user.id
			}, {
				limit: 1
			}).then((res) => res == 0) && !user.bot) {
				await this.client.userDB.insertOne(User(user));
				console.log(`${user.tag} added to the database!`);
			}
		});
		const {
			levels: {
				xp,
				booster,
				level
			}
		} = await this.client.userDB.findOne({
			'_id': message.author.id
		});
		if (!NoXP.has(message.author.id)) {
			await this.client.userDB.updateOne({
				'_id': message.author.id
			}, {
				$set: {
					'levels.level': xp > this.levels.filter((f) => f.level === level)[0].xp ? level + 1 : level,
					'levels.xp': xp + (booster ? Math.floor(Math.random() * 30) + 15 : Math.floor(Math.random() * 15) + 15),
					'avatar': message.author.displayAvatarURL()
				}
			});
			if (xp > this.levels.filter((f) => f.level === level)[0].xp) {
				// message.channel.send(`<@${message.author.id}> you are now level ${level + 1}!`)
			}
			NoXP.add(message.author.id);
			setTimeout(() => {
				NoXP.delete(message.author.id);
			}, 30 * 1000);
		}
		const {
			settings: {
				prefix
			}
		} = await this.client.guildDB.findOne({
			'_id': message.guild.id
		});
		if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
		if (this.client.commands.has(message.content.split(' ')[0].slice(prefix.length)) || this.client.aliases.has(message.content.split(' ')[0].slice(prefix.length))) {
			const Command = this.client.commands.get(message.content.split(' ')[0].slice(prefix.length)) || this.client.commands.get(this.client.aliases.get(message.content.split(' ')[0].slice(prefix.length)));
			const Args = message.content.split(' ').slice(1);
			if(!Command.config.enabled) return;
			// Check arguments here;
			// soonTM


			if (Command.config.developer && !this.client.config.owners.includes(message.author.id)) {
				message.react('👎');
			} else if (message.channel.nsfw && Command.config.nsfw) {
				message.channel.send('You can only run this command in a **NSFW** channel!');
			} else if (!Command.config.userPerms.every((perm) => message.member.hasPermission(perm))) {
				message.channel.send('You are missing permissions to run this command!');
			} else {
				this.client.commandsUsed++;
				Command.help.timesUsed++;
				const Result = await Command.callback({
					args: Args,
					message,
				});
				if (Result) {
					message.channel.send(Result);
				}
			}
		}
	}
}

module.exports = Message;