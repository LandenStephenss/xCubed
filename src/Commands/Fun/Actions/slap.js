const slaps = [
	'https://media1.tenor.com/images/b6d8a83eb652a30b95e87cf96a21e007/tenor.gif?itemid=10426943',
	'https://media2.giphy.com/media/jLeyZWgtwgr2U/source.gif',
	'https://media1.giphy.com/media/LB1kIoSRFTC2Q/source.gif',
	'https://media1.tenor.com/images/1cf84bf514d2abd2810588caf7d9fd08/tenor.gif?itemid=7679403',
	'https://i.imgur.com/o2SJYUS.gif',
	'https://media.giphy.com/media/10Am8idu3qBYRy/giphy.gif',
	'https://pa1.narvii.com/6807/ac91cef2e5ae98f598665193f37bba223301d75c_hq.gif',
	'https://media3.giphy.com/media/iMCedi21L9MXg1gN43/source.gif'
];
class Slap extends require('../../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'slap',
			description: 'Slap your enemie',
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
						title: `${message.author.username} slaps ${member.user.username}`,
						color: parseInt('877EEB', 16),
						image: {
							url: slaps[Math.floor(Math.random() * slaps.length)]
						}
					}
				};
			}

		};
	}
}

module.exports = Slap;