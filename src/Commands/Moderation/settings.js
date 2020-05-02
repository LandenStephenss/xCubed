class Settings extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'settings',
			description: 'Change the settings of the bot for this specific guild',
			category: 'moderation',
			userPerms: ['ADMINISTRATOR']
		});
		this.callback = async ({
			message,
			args
		}) => {
			if (!args[0]) {
				const {
					settings: {
						prefix,
						mod: {
							muteRole
						}
					}
				} = await this.client.guildDB.findOne({
					'_id': message.guild.id
				});
				return {
					embed: {
						title: `Settings for ${message.guild.name}`,
						description: `**Prefix**: ${prefix}\n**MuteRole**: ${muteRole === null ? 'None' : `<@&${muteRole}>`}`
					}
				};
			} else if (args[0].toLowerCase() === 'set') {
				if (!args[1]) {
					return 'Please specify what you are trying to set!';
				} else {
					const value = args[1].toLowerCase();
					if (value === 'prefix') {
						this.client.guildDB.updateOne({
							'_id': message.guild.id
						}, {
							$set: {
								'settings.prefix': args[2]
							}
						});
						return `Set \`prefix\` to \`${args[2]}\``;
					} else if (value === 'muterole') {
						var role = message.mentions.roles.first() || message.guild.roles.cache.get(args[2]);
						if(!role) return 'I could not find that role!';
						await this.client.guildDB.updateOne({'_id': message.guild.id}, {$set: {'settings.mod.muteRole': role.id}});
						return `Set \`muteRole\` to <@&${role.id}>`;
					} else {
						return 'What are you trying to set?';
					}
				}
			}
		};
	}
}

module.exports = Settings;