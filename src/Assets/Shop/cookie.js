class Cookie extends require('../Structures/ShopItem') {
	constructor(client) {
		super(client, {
			name: 'Cookie',
			description: 'Do u want a cookie?',
			price: 100,
			id: 'cookie'
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
				'inv.cookie': userBal.inv.cookie >= 0 ? userBal.inv.cookie + 1 : 1
			}
		});
	}
}

module.exports = Cookie;