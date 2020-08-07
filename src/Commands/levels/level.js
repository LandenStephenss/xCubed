module.exports = class Level extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "level",
      category: "levels",
      description: "View your level",
      usage: "{c} `<user>`",
    });
  }
  async run({ message, client }) {
    var user = message.mentions.users.first() || message.author;
    const {
      levels: { xp, level },
    } = await client.userDB.findOne({ _id: user.id });
    return {
      embed: {
        title: `${user.tag}'s level`,
        description: `**Level**: ${level}\n**XP**: ${xp}`,
      },
    };
  }
};
