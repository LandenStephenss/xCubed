var emojis = ["🍇", "🍌", "💯", "⭐"];
module.exports = class Slots extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "slots",
      category: "currency",
      description: "Play a game of slots",
      usage: "{c} `<amount>`",
      enabled: false,
    });
  }
  async run({ client, message, args }) {
    if (!args[0] || isNaN(args[0])) {
      return "Please specify an amount to bet!";
    } else {
      var {
        currency: { wallet },
      } = await client.userDB.findOne({ _id: message.author.id });
      if (wallet - parseInt(args[0]) < 0) {
        return "You do not have enough coins for that!";
      } else {
        var MiddleRow = [
          emojis[Math.floor(Math.random() * emojis.length)],
          emojis[Math.floor(Math.random() * emojis.length)],
          emojis[Math.floor(Math.random() * emojis.length)],
        ];
        return {
          embed: {
            description: `${MiddleRow.join(" ")}`,
          },
        };
      }
    }
  }
};
