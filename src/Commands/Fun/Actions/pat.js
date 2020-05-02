const pats = [
	'https://media.giphy.com/media/ye7OTQgwmVuVy/giphy.gif',
	'https://media.giphy.com/media/5tmRHwTlHAA9WkVxTU/giphy.gif',
	'https://media.giphy.com/media/109ltuoSQT212w/giphy.gif',
	'https://media.giphy.com/media/L2z7dnOduqEow/giphy.gif',
	'https://media.giphy.com/media/4HP0ddZnNVvKU/giphy.gif',
	'https://media.giphy.com/media/osYdfUptPqV0s/giphy.gif',
];
class Pat extends require('../../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'pat',
			description: 'Head pats? Please',
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
						title: `${message.author.username} pats ${member.user.username}`,
						color: parseInt('877EEB', 16),
						image: {
							url: pats[Math.floor(Math.random() * pats.length)]
						}
					}
				};
			}

		};
	}
}

module.exports = Pat;