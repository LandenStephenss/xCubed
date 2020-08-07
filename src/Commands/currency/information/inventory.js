var Items = require("../../../Assets/jsons/items.json");
// Items = Object.entries(Items);
module.exports = class Inventory extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "inventory",
      aliases: ["inv"],
      category: "currency",
      description: "Check out what you have in your pockets",
      enabled: false,
    });
  }
  async run({ message: { author }, client }) {
    var { inv } = await client.userDB.findOne({ _id: author.id });
    inv = Object.entries(inv).filter((f) => f[1] >= 1);
    if (inv.length === 0) {
      return {
        embed: {
          title: `${author.username}'s Inventory`,
          description: "You have nothing in your inventory",
        },
      };
    } else {
      return {
        embed: {
          description: inv
            .map((f) => `**${Items[f[0]].name}**: ${f[1]} *${Items[f[0]].type}*`)
            .join("\n"),
        },
      };
      // return {
      //   embed: {
      //     title: `${author.username}'s Inventory`,
      //     description: inv.map((f) =>
      //       Items.filter((s) => s[0].toLowerCase() === f)
      //     ),
      //   },
      // };
    }
  }
};
