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
  async run({ client, args, message: { author } }) {
    console.log(Items);
    if (!args[0]) {
      return "What are you trying to buy?";
    } else if (
      !Items.some((f) => f[0].toLowerCase() === args[0].toLowerCase())
    ) {
      return "That item does not exist!";
    } else {
      var item = Items.filter(
        (f) => f[0].toLowerCase() === args[0].toLowerCase()
      )[0];
      const {
        currency: { wallet },
        inv,
      } = await client.userDB.findOne({ _id: author.id });
      if (wallet - item[1].price < 0)
        return `You need **${item[1].price}** to buy **${item[1].name}**`;
      var amount = inv[item[0]] || 0;
      // TODO: actually add the item to the users inventory
      return `You bought ${item[1].name}`;
    }
  }
};
