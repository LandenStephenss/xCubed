class PadLock extends require('../Structures/ShopItem') {
	constructor(client) {
		super(client, {
			name: '🔒 pad lock',
			description: 'Secure your wallet with a padlock',
			price: 1000,
			id: 'padlock'
		});
	}
	async buy(authorID) {
		var userBal = await this.client.userDB.findOne({
			'_id': authorID
		});
		await this.client.userDB.updateOne({
			'_id': authorID
		}, {
			$set: {
				'inv.padLock': userBal.inv.padLock >= 0 ? userBal.inv.padLock + 1 : 1
			}
		});
	}
}

module.exports = PadLock;