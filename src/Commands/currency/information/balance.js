module.exports = class Balance extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "balance",
      category: "currency",
      description: "Check your balance",
      botPerms: ["EMBED_LINKS"],
      aliases: ["bal", "wallet"],
    });
  }
  async run({
    message: {
      mentions: { users },
      author,
    },
    client,
  }) {
    const user = users.first() || author;
    const {
      currency: { wallet, bank },
    } = await client.userDB.findOne({ _id: user.id });
    return {
      embed: {
        title: `${user.username}'s Balance`,
        fields: [
          { name: "Wallet", value: wallet },
          { name: "Bank", value: bank },
        ],
      },
    };
  }
};
