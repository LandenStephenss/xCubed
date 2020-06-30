module.exports = class Riche extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "rich",
      category: "currency",
      description: "View who in the server is the richest",
    });
  }
  async run({ client, message: { guild } }) {
    var message = {
      embed: {
        author: {
          icon_url: guild.iconURL({ format: "png" }),
          name: `${guild.name}'s Richest Users!`,
        },
        fields: [],
      },
    };

    var arr = await client.userDB.find().toArray();
    arr = arr.filter((user) => guild.members.cache.has(user._id));
    arr = arr.sort((a, b) => b.currency.wallet - a.currency.wallet).slice(0, 5);

    for (const {
      _id,
      currency: { wallet },
    } of arr) {
      if (wallet == 0) return;
      switch (_id) {
        case arr[0]._id:
          message.embed.fields.push({
            name: `${await client.users.cache.get(_id).username}`,
            value: wallet,
          });
          break;
        default:
          message.embed.fields.push({
            name: `${await client.users.cache.get(_id).username}`,
            value: wallet,
          });
          break;
      }
    }
    return message;
  }
};
