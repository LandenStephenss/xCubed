const { Client, Collection } = require("discord.js");
const { MongoClient } = require("mongodb");
var DEVELOPMENT = process.argv.includes("--dev");
class xCubed extends Client {
  constructor(options = {}) {
    super();
    this.commands = new Collection();
    this.aliases = new Collection();
    this.commandsUsed = 0;
  }
  init() {
    this.config = require(`../../${DEVELOPMENT ? "dev" : "prod"}.config.json`);
    this.initMongo(this.config.MongoURL);
    console.log(
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
        console.log(
          "\u001b[31mMongoDB \u001b[38;5;33mconnected successfully\u001b[39m"
        );
      }
    });
  }
}

module.exports = xCubed;
