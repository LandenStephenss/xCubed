const {
	Client,
	Collection
} = require('discord.js');
require("discord.js/src/util/Constants").DefaultOptions.ws.properties.$browser = "Discord iOS"
const {
	MongoClient
} = require('mongodb');
class xCubed extends Client {
	constructor(options = {}) {
		super();
		if (process.argv.includes('--dev')) {
			this.config = require('../Configs/devConfig.json');
		} else {
			this.config = require('../Configs/prodConfig.json');
		}
		MongoClient.connect(`mongodb://${this.config.DatabaseUserName}:${this.config.DatabasePwd}@${this.config.DatabaseIP}:27017/?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&ssl=false`, (err, data) => {
			if (err) {
				console.log(err);
			}
			this.userDB = data.db(this.config.Database).collection('users');
			this.guildDB = data.db(this.config.Database).collection('guilds');
		});
		this.commands = new Collection();
		this.aliases = new Collection();
		this.commandsUsed = 0;
	}
}

module.exports = xCubed;