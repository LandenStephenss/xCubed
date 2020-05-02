class Balance extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'balance',
			category: 'currency',
			usage: '{c} `<user>`',
			description: 'View your balance',
			aliases: ['bal', 'money']
		});
		this.callback = async ({
			message
		}) => {
			const member = message.mentions.members.first() || message.member;
			const {
				currency: {
					wallet,
					bank
				}
			} = await this.client.userDB.findOne({
				'_id': member.id
			});

			return {
				embed: {
					title: `${member.user.username}'s Balance`,
					fields: [{
						name: 'Wallet 👛',
						value: wallet,
						inline: true,
					}, {
						name: 'Bank 💰',
						value: bank,
						inline: true,
					}],
					color: parseInt('877EEB', 16)
				}
			};
		};
	}
}

module.exports = Balance;