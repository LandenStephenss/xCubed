var Items = Object.entries(require("../../../Assets/jsons/items.json")).filter(
  (f) => f[1].buyable
);
module.exports = class Shop extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "shop",
      category: "currency",
      description: "Buy some goodies",
      botPerms: ["EMBED_LINKS"],
      usage: "{c} `<item>`",
      aliases: ["store"]
    });
  }
  async run({ args }) {
    var page = 1;
    if (args[0] && !isNaN(args[0])) page = parseInt(args[0]);
    if (page > Math.ceil(Items.length / 5)) page = Math.ceil(Items.length / 5);
    return {
      embed: {
        title: "xCubed Shop",
        description: `${Items.slice((page - 1) * 5, 5 + (page - 1) * 5)
          .map(
            (f) =>
              `${f[1].name}\n${
                f[1].description
              } | \`${f[0].toLowerCase()}\` \`${f[1].price}\` *${f[1].type}*`
          )
          .join("\n")}`,
        footer: {
          text: `Page ${page}/${Math.ceil(Items.length / 5)}`,
        },
      },
    };
  }
};
