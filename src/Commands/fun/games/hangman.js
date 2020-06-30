const HangmanGame = require("./asset.hangman");
module.exports = class HangMan extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "hangman",
      aliases: ["hm"],
      description: "Play some hangman!",
      category: "fun",
      botPerms: ["EMBED_LINKS"]
    });
  }
  run({ client, message }) {
    new HangmanGame(client, message.channel).start();
  }
};
