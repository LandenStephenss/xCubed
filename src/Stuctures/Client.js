const { Client, Collection } = require("discord.js");
const { MongoClient } = require("mongodb");
var DEVELOPMENT = process.argv.includes("--dev");
const { readdir } = require("fs");
const { logger } = require("../Assets/util");
class xCubed extends Client {
  constructor(options = {}) {
    super();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.commandsUsed = 0;
    this.logger = logger;
  }
  init() {
    this.config = require(`../../${DEVELOPMENT ? "dev" : "prod"}.config.json`);
    this.initMongo(this.config.MongoURL);
    this.logger.debug(
      `\u001b[39mxCubed started, running in ${
        DEVELOPMENT ? "\u001b[31mdevelopment" : "\u001b[31mproduction"
      } \u001b[39mmode.`
    );
  }

  initMongo(URL) {
    MongoClient.connect(URL, { useUnifiedTopology: true }, (err, response) => {
      if (err) {
        console.error("Could not connect to the database!");
      } else {
        this.userDB = response
          .db(DEVELOPMENT ? "xCubedBeta" : "xCubed")
          .collection("users");
        this.guildDB = response
          .db(DEVELOPMENT ? "xCubedBeta" : "xCubed")
          .collection("guilds");
        this.logger.info(
          "\u001b[31mMongoDB \u001b[38;5;33mconnected successfully\u001b[39m"
        );
      }
    });
  }

  loadCommand(file) {
    if (file.includes(".json")) return;
    if (!file.includes(".js")) {
      readdir(`./src/Commands/${file}`, (err, files) => {
        files.forEach((command) => {
          this.loadCommand(`/${file}/${command}`);
        });
      });
    } else {
      if (file.includes("asset.")) return;
      try {
        const Command = new (require("../Commands/" + file))();
        this.commands.set(Command.help.name, Command);
        Command.config.filePath = file;
        Command.config.aliases.forEach((alias) => {
          this.aliases.set(alias, Command.help.name);
        });
        this.logger.debug(
          `\u001b[38;5;33mCommand \u001b[31m${Command.help.name}\u001b[38;5;33m loaded successfully\u001b[39m`
        );
      } catch (e) {
        this.logger.error(e);
      }
    }
  }
}

module.exports = xCubed;
