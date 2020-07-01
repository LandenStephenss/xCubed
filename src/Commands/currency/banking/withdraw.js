module.exports = class Withdraw extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "withdraw",
      aliases: ["with"],
      category: "currency",
      botPerms: ["EMBED_LINKS"],
      description: "Withdraw some coins from your bank",
      usage: "{c} `<amount>`",
    });
  }
  async run({ message: { author }, client, args }) {
    const {
      currency: { wallet, bank },
    } = await client.userDB.findOne({ _id: author.id });
    if (args[0].toLowerCase() === "all") args[0] = bank.toString();
    if (!args[0] || isNaN(args[0])) {
      return "Please specify a valid amount!";
    } else if (bank - parseInt(args[0]) < 0) {
      return "You do not have enough coins in your wallet!";
    } else {
      await client.userDB.updateOne(
        { _id: author.id },
        {
          $set: {
            "currency.wallet": wallet + parseInt(args[0]),
            "currency.bank": bank - parseInt(args[0]),
          },
        }
      );
      return `You put **${args[0]}** coins in your wallet!`;
    }
  }
};
