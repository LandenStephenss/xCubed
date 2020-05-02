const permissions = require('../../Assets/Configs/Permissions');
class Help extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'help',
			description: 'View a list of commands that the bot has loaded!',
			usage: '{c} `<command>`',
			category: 'information'
		});
		this.callback = async ({
			args,
			message
		}) => {
			const {
				settings: {
					prefix
				}
			} = await this.client.guildDB.findOne({
				'_id': message.guild.id
			});
			if (args.length === 0) {
				var embed = {
					title: `Commands (${this.client.commands.size}):`,
					color: parseInt('877EEB', 16),
					fields: new Array(),
					footer: {
						text: `${message.guild.name}'s prefix is ${prefix}`
					}
				};
				var groups = new Array();
				for (const command of this.client.commands) {
					if (!groups.includes(command[1].help.category.toLowerCase())) {
						if (!command[1].config.nsfw && !message.channel.nsfw) {
							
							groups.push(command[1].help.category.toLowerCase());
						}
					}
				}
				// eventually change this to a <#Array>.forEach()
				for (const category of groups) {
					//if(category.toLowerCase() === "developer" && !this.client.config.owners.includes(message.author.id)) return;

					embed.fields.push({
						name: category.toLowerCase().split('')[0].toUpperCase() + category.split('').slice(1).join(''),
						value: `\`${this.client.commands.filter((f) => f.help.category.toLowerCase() === category && f.config.enabled).map(f => f.help.name).join('`, `')}\``
					});
				}
				return {
					embed
				};
			} else {
				if (this.client.commands.has(args[0].toLowerCase()) || this.client.aliases.has(args[0].toLowerCase())) {
					const Command = this.client.commands.get(args[0].toLowerCase()) || this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()));
					return {
						embed: {
							title: `Command: ${Command.help.name}`,
							fields: [{
								name: 'Description',
								value: Command.help.description
							}, {
								name: 'Usage',
								value: Command.help.usage.replace('{c}', Command.help.name)
							},
							{
								name: 'Aliases',
								value: Command.config.aliases[0] ? `\`${Command.config.aliases.join('`, `')}\`` : 'None'
							}
							],
							color: parseInt('877EEB', 16),
							footer: {
								text: `Command has been ran ${Command.help.timesUsed} time${Command.help.timesUsed >= 2 ? 's' : ''}`
							}
						}
					};
				} else {
					return {
						embed: {
							title: `Can't find command \`${args[0]}\``,
							color: parseInt('877EEB', 16)
						}
					};
				}
			}
		};
	}
}

module.exports = Help;