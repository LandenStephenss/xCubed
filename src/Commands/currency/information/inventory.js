const Items = require("../../../Assets/jsons/items.json");
module.exports = class Inventory extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "inventory",
      aliases: ["inv"],
      category: "currency",
      description: "Check out what you have in your pockets",
      enabled: true,
    });
  }
  async run({ message: { author }, client }) {
    var { inv } = await client.userDB.findOne({ _id: author.id });
    inv = Object.entries(inv).filter((f) => f[1] >= 1);
    console.log(inv);
    if (inv.length === 0) {
      return {
        embed: {
          title: `${author.username}'s Inventory`,
          description: "You have nothing in your inventory",
        },
      };
    } else {
      // TODO: actually display inventory
      console.log(Items["cookie"].name);
      return {
        embed: {
          title: `${author.username}'s Inventory`,
          description: `${inv
            .map((f) => `**${Items[f[0]].name}**: ${f[1]}`)
            .join("\n")}`,
        },
      };
    }
  }
};
