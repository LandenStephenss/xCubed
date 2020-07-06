const { FormatNumber } = require("../../../Assets/util");
module.exports = class Riche extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "rich",
      category: "currency",
      description: "View who in the server is the richest",
    });
  }
  async run({ client, message: { guild, author }, args }) {
    var message = {
      embed: {
        author: {
          icon_url: guild.iconURL({ format: "png" }),
          name: `${guild.name}'s Richest Users!`,
        },
        fields: [],
      },
    };
    var page;
    if (!args[0] || isNaN(args[0])) {
      page = 0;
    } else {
      page = parseInt(args[0]);
    }
    var arr = await client.userDB.find().toArray();
    arr = arr.filter((user) => guild.members.cache.has(user._id));
    arr = arr
      .sort((a, b) => b.currency.wallet - a.currency.wallet)
      .slice(0, 25);
    return {
      embed: {
        footer: {
          text: `Page ${page}/${Math.floor(arr.length / 5)}`,
        },
        author: {
          icon_url: guild.iconURL(),
          name: `${guild.name}'s Richest Users!`,
        },
        description: `${arr
          .slice(0 + page * 5, 5 + page * 5)
          .map(
            (f) =>
              `**${client.users.cache.get(f._id).username}**: ${FormatNumber(
                f.currency.wallet
              )}`
          )
          .join("\n")}`,
      },
    };
  }
};
