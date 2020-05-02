class Bet extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'bet',
			category: 'currency',
			description: 'Bet some of those juicy coins',
			usage: '{c} `<amount>`',
			aliases: ['dice']
		});
		this.callback = async ({
			args,
			message: {
				author
			}
		}) => {
			const botRoll = Math.floor(Math.random() * 11);
			const userRoll = Math.floor(Math.random() * 11);
			var amount = parseInt(args[0]);
			const {currency: {wallet}} = await this.client.userDB.findOne({'_id': author.id});
			if(!args[0] || isNaN(args[0]) || !amount) {
				return 'Please specify a valid amount!';
			} else if((wallet - amount) < 0) {
				return 'You do not have enough coins for that!';
			} else {
				var Multi = Math.floor(Math.random() * 100) / 100;
				if(userRoll > botRoll) {
					await this.client.userDB.updateOne({'_id': author.id}, {$set: {'currency.wallet': (wallet - amount) + (amount + Math.floor(amount * Multi))}});
				} else {
					await this.client.userDB.updateOne({'_id': author.id}, {$set: {'currency.wallet': wallet - amount}});
				}
				return {
					embed: {
						title: botRoll === userRoll ? 'You tied!' : botRoll > userRoll ? 'You lost!' : `You won ${amount + Math.floor(amount * Multi)} coins!`,
						fields: [{name: 'Your Roll', value: userRoll}, {name: 'Bot Roll', value: botRoll}],
						color: parseInt('877EEB', 16)
					}    
				};
			}
		};
	}
}

module.exports = Bet;