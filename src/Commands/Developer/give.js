class Give extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'give',
			description: 'Give users some coins',
			developer: true,
			usage: '{c} `<user>` `<amount>`',
			args: [{
				type: 'user',
				required: true
			}],
			category: 'developer'
		});
		this.callback = async ({
			message,
			args
		}) => {
			const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
			const amount = parseInt(args[1]);
			if (!member) {
				return 'Please specify a member';
			} else if (!amount || isNaN(args[1])) {
				return 'Please specify a valid amount';
			} else {
				const {
					currency: {
						wallet
					}
				} = await this.client.userDB.findOne({
					'_id': member.id
				});
				await this.client.userDB.updateOne({
					'_id': member.id
				}, {
					$set: {
						'currency.wallet': wallet + amount
					}
				});
				return `Gave ${member.user.username} **${amount}** coins!`;
			}
		};
	}
}

module.exports = Give;