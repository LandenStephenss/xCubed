const fs = require('fs');
class Ready {
	constructor(client) {
		this.client = client;
	}
	run() {
		console.log(`\u001b[95m Logged in as ${this.client.user.tag} on shard ${this.client.shard}\u001b[39m`);
		// `Shard: ${this.client.guilds.cache.first().shardID}`
		this.client.user.setPresence({ activity: { name: `with ${this.client.users.cache.size} users on shard: ${this.client.guilds.cache.first().shardID}` }, status: 'online' });
		this.client.guilds.cache.get('621410459144159242').channels.cache.get('663898511611396113').setName(`Users: ${this.client.users.cache.size}`);
		this.client.guilds.cache.get('621410459144159242').channels.cache.get('663898578955272202').setName(`Guilds: ${this.client.guilds.cache.size}`);
		setInterval(() => {
			this.client.guilds.cache.get('621410459144159242').channels.cache.get('663898511611396113').setName(`Users: ${this.client.users.cache.size}`);
			this.client.guilds.cache.get('621410459144159242').channels.cache.get('663898578955272202').setName(`Guilds: ${this.client.guilds.cache.size}`);
		}, 120000);
		// fs.writeFile('commands.json', JSON.stringify(Object.fromEntries(this.client.commands)), () => {
		// 	console.log('\u001b[95m Made new commands.json file\u001b[39m');
		// });
	}
}

module.exports = Ready;