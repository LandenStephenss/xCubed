const fetch = require('node-fetch');
class RedditCommand {
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
		url = null,
		nsfw = false,
		donator = false,
		timesUsed = 1,
		args = new Array()
	}) {
		this.client = client;
		this.url = url;
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
		this.callback = async () => {
			const {
				data: {
					children
				}
			} = await fetch(this.url).then((res) => res.json());
			const result = children[Math.floor(Math.random() * children.length)];
			return {
				embed: {
					title: result.data.subreddit_name_prefixed,
					description: result.data.title,
					image: {
						url: result.data.url
					},
					color: parseInt('877EEB', 16),
					footer: {
						text: `👍 ${result.data.ups} | 👎 ${result.data.downs} | Posted by ${result.data.author}`,
						icon_url: 'https://yt3.ggpht.com/a-/AN66SAz7xUd-0ATs1LCGybH9HKUTB_kW0R10GNybJQ=s240-mo-c-c0xffffffff-rj-k-no'
					}
				}
			};
		};
	}
}

module.exports = RedditCommand;