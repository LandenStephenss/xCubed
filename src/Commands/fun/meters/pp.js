module.exports = class Dick extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "pp",
      aliases: ["dick", "howlong", "penis", "bigpp"],
      category: "fun",
      args: [{ type: "user", required: false }],
      description: "Finally find out what hes packin",
      botPerms: ["EMBED_LINKS"]
    });
  }
  async run({ message, client }) {
    var user = message.mentions.users.first() || message.author;
    const {
      stats: { dick },
    } = await client.userDB.findOne({ _id: user.id });
    return {
      embed: {
        title: `${user.username} has a ${dick} inch long pp`,
        color: 8879851,
        description: `8${"=".repeat(dick)}D`,
      },
    };
  }
};
