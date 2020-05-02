const hugs = [
	'https://media.giphy.com/media/od5H3PmEG5EVq/giphy.gif',
	'https://media.giphy.com/media/wnsgren9NtITS/giphy.gif',
	'https://media.giphy.com/media/kvKFM3UWg2P04/giphy.gif',
	'https://media.giphy.com/media/143v0Z4767T15e/giphy.gif',
	'https://media.giphy.com/media/yziFo5qYAOgY8/giphy.gif',
	'https://media.giphy.com/media/HaC1WdpkL3W00/giphy.gif',
	'https://media.giphy.com/media/iMrHFdDEoxT5S/giphy.gif',
	'https://media.giphy.com/media/SLLYpDiMCvKbS/giphy.gif'
];
class Hug extends require('../../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'hug',
			description: 'Give somebody a hug!',
			category: 'fun'
		});
		this.callback = ({
			message
		}) => {
			const member = message.mentions.members.first();
			if (message.mentions.members.first() === undefined || message.mentions.members.first().id === message.author.id) {
				return 'Please mention somebody';
			} else {
				return {
					embed: {
						title: `${message.author.username} hugs ${member.user.username}`,
						color: parseInt('877EEB', 16),
						image: {
							url: hugs[Math.floor(Math.random() * hugs.length)]
						}
					}
				};
			}

		};
	}
}

module.exports = Hug;