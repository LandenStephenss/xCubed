module.exports = class Blacklist extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "blacklist",
      developer: true,
      usage: "{c} `<user>`",
      category: "developer",
      description: "Blacklist a user from using the bot!",
      aliases: ["bl"]
    });
  }
  async run({
    client,
    message: {
      mentions: { users },
    },
    args,
  }) {
    var user = users.first() || client.users.cache.get(args[0]);
    if (!user) {
      return "You have to mention a user to blacklist!";
    } else {
      var { blacklisted } = await client.userDB.findOne({ _id: user.id });
      switch (blacklisted) {
        case true:
          await client.userDB.updateOne(
            { _id: user.id },
            { $set: { blacklisted: false } }
          );
          return `\`${user.tag}\` unblacklisted`;
          break;
        case false:
          await client.userDB.updateOne(
            { _id: user.id },
            { $set: { blacklisted: true } }
          );
          return `\`${user.tag}\` blacklisted`;
        default:
          await client.userDB.updateOne(
            { _id: user.id },
            { $set: { blacklisted: true } }
          );
          return `\`${user.tag}\` blacklisted`;
      }
    }
  }
};
