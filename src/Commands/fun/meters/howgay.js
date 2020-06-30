module.exports = class Howgay extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "howgay",
      aliases: ["gr", "howgay"],
      category: "fun",
      args: [{ type: "user", required: true }],
      description: "View how gay a user is!",
      botPerms: ["EMBED_LINKS"]
    });
  }
  async run({ message, client }) {
    var user = message.mentions.users.first() || message.author;
    const {
      stats: { howgay },
    } = await client.userDB.findOne({ _id: user.id });
    return {
      embed: {
        title: `${user.username} is ${howgay}% gay!`,
        color: 8879851,
        description: `${"🟩".repeat(howgay / 10)}${"⬜".repeat(
          10 - howgay / 10
        )}`,
      },
    };
  }
};
