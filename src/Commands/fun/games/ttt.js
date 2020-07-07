var ttt = require("./asset.ttt");
module.exports = class TTT extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "ttt",
      aliases: ["tictactoe"],
      description: "Play some rounds of tictactoe",
      enabled: false
    });
  }

  run({ message, client }) {
    var user = message.mentions.users.first();
    if (!user || user.id === message.author.id)
      return "You have to mention somebody, you can't play by yourself!";
    new ttt([message.author.id, user.id], message.channel, client).Start();
  }
};
