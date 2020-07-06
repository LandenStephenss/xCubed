const Items = Object.entries(
  require("../../../Assets/jsons/items.json")
).filter((f) => f[1].buyable);
module.exports = class Buy extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "buy",
      category: "currency",
      description: "Buy an item from the shop",
      usage: "{c} `<item>`",
    });
  }

  async BuyItem(item, user, client) {
    const { inv } = await client.userDB.findOne({ _id: user.id });
    switch (item) {
      case "cookie":
        var amount = inv.cookie || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.cookie": amount + 1 } }
        );
        break;
      case "laptop":
        var amount = inv.laptop || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.laptop": amount + 1 } }
        );
        break;
      case "padlock":
        var amount = inv.padlock || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.padlock": amount + 1 } }
        );
        break;
      case "icecube":
        var amount = inv.icecube || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.icecube": amount + 1 } }
        );
        break;
      case "fishingpole":
        var amount = inv.fishingpole || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.fishingpole": amount + 1 } }
        );
        break;
      case "flag":
        var amount = inv.flag || 0;
        client.userDB.updateOne(
          { _id: user.id },
          { $set: { "inv.flag": amount + 1 } }
        );
        break;
    }
  }

  async run({ client, args, message: { author } }) {
    const {
      currency: { wallet },
    } = await client.userDB.findOne({ _id: author.id });
    if (!args[0]) {
      return "What are you trying to buy?";
    } else if (
      !Items.some((f) => f[0].toLowerCase() === args[0].toLowerCase())
    ) {
      return "That item does not exist!";
    } else {
      var item = Items.filter((f) => f[0] === args[0].toLowerCase())[0];
      console.log(item);
      if (wallet - item[1].price < 0)
        return `You need ${item[1].price} to buy \`${item[1].name}\``;
      this.BuyItem(args[0].toLowerCase(), author, client);
      client.userDB.updateOne(
        { _id: author.id },
        { $set: { "currency.wallet": wallet - item[1].price } }
      );
      return `You bought \`${item[1].name}\``;
    }
  }
};
