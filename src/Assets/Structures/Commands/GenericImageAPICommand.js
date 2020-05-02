const fetch = require('node-fetch');
class Command {
	constructor(client, {
		name = null,
		description = 'N/A',
		category = 'Miscellaneous',
		usage = '{c}',
		enabled = true,
		aliases = new Array(),
		botPerms = new Array().concat('SEND_MESSAGES'),
		userPerms = new Array(),
		developer = false,
		nsfw = false,
		donator = false,
		timesUsed = 1,
		endpoint = null,
		args = new Array()
	}) {
		this.client = client;
		this.help = {
			name,
			description,
			category,
			usage,
			timesUsed,
		};
		this.config = {
			aliases,
			botPerms,
			userPerms,
			enabled,
			developer,
			nsfw,
			donator,
			endpoint,
			args
		};
		this.callback = async ({
			args,
			message
		}) => {
			const member = message.mentions.members.first() || message.member;
			var res = await fetch(`https://eclyssia-api.tk/api/v1/${this.config.endpoint}?url=${member.user.displayAvatarURL({format: 'png'})}&username=${message.author.username}1!1!`, {
				method: 'GET',
			});
			return {
				embed: {
					image: {
						url: res.url.toString()
					},
					color: parseInt('877EEB', 16)
				}
			};
		};
	}
}

module.exports = Command;