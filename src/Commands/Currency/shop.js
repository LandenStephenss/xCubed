const items = require('../../Assets/Shop/index');
class Shop extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'shop',
			category: 'currency',
			description: 'Buy and ~~sell~~ things from the shop!',
			aliases: ['rob']
		});

		this.callback = async ({
			message,
			args
		}) => {
			if (!args[0]) {
				var embed = {
					title: 'Shop!',
					fields: [],
					color: parseInt('877EEB', 16),
					footer: {
						text: 'Use x!shop buy ItemID to buy an item!'
					}
				};
				Object.entries(items).forEach((item) => {
					var Item = new item[1](this.client);
					embed.fields.push({
						name: Item.name,
						value: `${Item.description} \| ${Item.price} \| \`${Item.id}\``
					});
				});
				return {
					embed: embed
				};
			} else if (args[0].toLowerCase() === 'buy') {
				var ItemArray = Object.entries(items);
				if(!args[1]) return 'Please specify an item!';
				if (ItemArray.filter((item) => (new item[1](this.client)).id.toLowerCase() === args[1].toLowerCase()).length >= 1) {
					var item = new(ItemArray.find((item) => (new item[1](this.client)).id.toLowerCase() === args[1].toLowerCase())[1])(this.client);
					var {
						currency: {
							wallet
						}
					} = await this.client.userDB.findOne({
						'_id': message.author.id
					});
					if ((wallet - item.price) < 0) {
						return `You do not have enough to buy the \`${item.name}\`, you need ${Math.abs(wallet - item.price)} more coins for that!`;
					} else {
						item.buy(message.author.id);
						await this.client.userDB.updateOne({'_id': message.author.id}, {$set: {'currency.wallet': wallet - item.price}});
						return `You bought \`${item.name}\` for ${item.price} coins!`;
					}
				}
			}
		};
	}
}

module.exports = Shop;