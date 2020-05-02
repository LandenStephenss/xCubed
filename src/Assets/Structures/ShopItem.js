class Item {
	constructor(client, {
		name = String,
		price = Number,
		id = String,
		description = String
	}) {
		this.price = price;
		this.name = name;
		this.id = id;
		this.description = description;
		this.client = client;
	}
}

module.exports = Item;