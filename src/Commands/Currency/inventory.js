class Inventory extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			name: 'inventory',
			category: 'currency',
			description: 'View what you have in your inventory',
			aliases: ['inv']
		});
		this.callback = async ({message}) => {
			const { inv } = await this.client.userDB.findOne({'_id': message.author.id});
			var items = Object.entries(inv);
			var embed = {
				title: `${message.author.username}'s inventory!`,
				fields: [],
				color: parseInt('877EEB', 16),
				footer: {
					text: `Page: 1/${Math.floor(items.length / 10) + 1}`
				}
			};
			items.forEach((item) => {
				if(item[1] === 0) return;
				embed.fields.push({name: item[0], value: item[1]});
			});

			return {embed};
		};
	}
}

module.exports = Inventory;