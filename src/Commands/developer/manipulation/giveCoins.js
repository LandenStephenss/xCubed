module.exports = class giveCoins extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "givecoins",
      category: "developer",
      developer: true,
      aliases: ["gcs"],
      usage: "{c} `<user>` `<amount>`",
    });
  }
  async run({
    client,
    args,
    message: {
      author,
      mentions: { users },
    },
  }) {
    var user = users.first() || author;
    const {
      currency: { wallet },
    } = await client.userDB.findOne({ _id: user.id });
    await client.userDB.updateOne(
      { _id: user.id },
      { $set: { "currency.wallet": wallet + parseInt(args[users.size === 1 ? 1 : 0]) } }
    );
    return `Gave \`${user.tag}\` \`${args[users.size === 1 ? 1 : 0]}\` coins`;
  }
};
