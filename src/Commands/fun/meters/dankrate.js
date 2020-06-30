module.exports = class Dankrate extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "dankrate",
      aliases: ["dr", "howdank"],
      category: "fun",
      args: [{ type: "user", required: false }],
      description: "View how dank a user is!",
      botPerms: ["EMBED_LINKS"]
    });
  }
  async run({ message }) {
    var user = message.mentions.users.first() || message.author;
    const {
      stats: { dankrate },
    } = await client.userDB.findOne({ _id: user.id });
    return {
      embed: {
        title: `${user.username} is ${dankrate}% dank!`,
        color: 8879851,
        description: `${"🟩".repeat(dankrate / 10)}${"⬜".repeat(
          10 - dankrate / 10
        )}`,
      },
    };
  }
};
