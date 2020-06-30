module.exports = class UserInfo extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "userinfo",
      aliases: ["whois", "userinformation"],
      category: "information",
      botPerms: ["EMBED_LINKS"],
    });
  }
  run({ message: { member: mem, mentions, guild } }) {
    var member = mentions.members.first() || mem;
    return {
      embed: {
        author: {
          name: `Information about ${member.user.tag}`,
          icon_url: member.user.displayAvatarURL(),
        },
        color: 8879851,
        fields: [
          {
            name: "Joined",
            value: new Date(member.joinedTimestamp).toLocaleString(),
            inline: true,
          },
          {
            name: "Registered",
            value: new Date(member.user.createdTimestamp).toLocaleString(),
            inline: true,
          },
          {
            name: "Roles",
            value: `<@&${member.roles.cache
              .filter((f) => f.id !== guild.id)
              .map((j) => j.id)
              .join(">, <@&")}>`,
          },
        ],
      },
    };
  }
};
