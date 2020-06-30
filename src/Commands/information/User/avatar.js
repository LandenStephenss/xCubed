module.exports = class Avatar extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "avatar",
      category: "information",
      description: "View a users avatar",
      usage: "{c} `<user|id>`",
      aliases: ["pfp", "av"],
      botPerms: ["EMBED_LINKS"]
    });
  }
  run({ message: { mentions, member: user, guild }, args }) {
    var member =
      mentions.members.first() || guild.members.cache.get(args[0]) || user;
    return {
      embed: {
        image: { url: member.user.displayAvatarURL() },
        title: `${member.user.username}'s Avatar!`,
        color: 8879851,
      },
    };
  }
};
