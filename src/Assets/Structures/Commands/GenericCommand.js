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
			args
		};
	}
}

module.exports = Command;