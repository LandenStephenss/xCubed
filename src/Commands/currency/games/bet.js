module.exports = class Bet extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "bet",
      category: "currency",
      description: "Bet your money away!",
      botPerms: ["EMBED_LINKS"],
      aliases: ["gamble"]
    });
  }
  async run({ client, args, message: { author } }) {
    const {
      currency: { wallet },
    } = await client.userDB.findOne({ _id: author.id });
    if (!args[0] || isNaN(args[0])) {
      return "Please specify a valid amount to bet!";
    } else if (wallet - parseInt(args[0]) < 0) {
      return "You do not have enough coins for that!";
    } else {
      var botRoll = Math.floor(Math.random() * 7);
      if (botRoll % 2 == 0) {
        client.userDB.updateOne(
          { _id: author.id },
          { $set: { "currency.wallet": wallet + parseInt(args[0]) } }
        );
        return {
          embed: {
            title: `xCubed rolled a ${botRoll}, you win ${
              parseInt(args[0]) * 2
            } coins!`,
          },
        };
      } else {
        client.userDB.updateOne(
          { _id: author.id },
          { $set: { "currency.wallet": wallet - parseInt(args[0]) } }
        );
        return {
          embed: {
            title: `xCubed rolled a ${botRoll}, you lost ${args[0]} coins!`,
          },
        };
      }
    }
  }
};
