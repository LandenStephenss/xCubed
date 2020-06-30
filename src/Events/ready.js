const { wrtieFile, writeFile } = require("fs")
class Ready {
  constructor(client) {
    this.client = client;
  }

  async run() {
    console.log(
      `\u001b[31m${this.client.commands.size} \u001b[38;5;33mCommands Loaded, \u001b[31m${this.client.aliases.size} \u001b[38;5;33mAliases, \u001b[31m${this.client._eventsCount} \u001b[38;5;33mEvents!\u001b[39m`
    );
    this.client.channels.cache
      .get(this.client.config.channels.users)
      .setName(`Users: ${this.client.users.cache.size}`);
    this.client.channels.cache
      .get(this.client.config.channels.guilds)
      .setName(`Guilds: ${this.client.guilds.cache.size}`);
    setInterval(() => {
      this.client.channels.cache
        .get(this.client.config.channels.users)
        .setName(`Users: ${this.client.users.cache.size}`);
      this.client.channels.cache
        .get(this.client.config.channels.guilds)
        .setName(`Guilds: ${this.client.guilds.cache.size}`);
    }, 600000);
    writeFile("../commands.json", JSON.stringify(Object.fromEntries(this.client.commands)), () => {
      console.log("\u001b[38;5;33mNew commands file generated\u001b[39m")
    })
  }
}
module.exports = Ready;
