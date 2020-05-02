class Deposit extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'deposit',
			usage: '{c} `<amount>`',
			category: 'currency',
			description: 'Put some money in your bank!',
			aliases: ['dep']
		});
		this.callback = async ({
			args,
			message: {
				author
			}
		}) => {
			var amount = parseInt(args[0]);
			const {
				currency: {
					bank,
					wallet
				}
			} = await this.client.userDB.findOne({
				'_id': author.id
			});
			if (args[0].toLowerCase() === 'all') amount = wallet;
			if (!args[0] || !amount || isNaN(amount)) {
				return 'You need to specify a valid amount!';
			}
			if ((wallet - amount) < 0) {
				return 'You do not have enough coins in your bank to do that!';
			} else {
				await this.client.userDB.updateOne({
					'_id': author.id
				}, {
					$set: {
						'currency.bank': bank + amount,
						'currency.wallet': wallet - amount
					}
				});
				return {
					embed: {
						title: 'New Balance',
						fields: [{
							name: 'Wallet 👛',
							value: wallet - amount,
							inline: true
						}, {
							name: 'Bank 💰',
							value: bank + amount,
							inline: true
						}],
						color: parseInt('877EEB', 16)
					}
				};
			}
		};
	}
}

module.exports = Deposit;