module.exports = class Mute extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "mute",
      category: "moderation",
      userPerms: ["MANAGE_ROLES"],
      botPerms: ["MANAGE_ROLES"],
      usage: "{c} `<user>`",
      description: "Mute a user (also unmutes)",
    });
  }

  async run({ message, args, client }) {
    const {
      settings: {
        mod: { muteRole },
        prefix,
      },
    } = await client.guildDB.findOne({ _id: message.guild.id });
    const member = message.mentions.members.first();
    if (!member) {
      return "You have to mention somebody to mute!";
    } else if (!muteRole) {
      return `You don't seem to have a mute role, you can set one by running \`${prefix}settings muterole ${message.guild.roles.cache.random()}\``;
    } else if (member.id === message.author.id) {
      return "You can't mute yourself!";
    } else {
      if (!member.roles.cache.has(muteRole)) {
        member.roles.add(muteRole);
        return `**${member.user.tag}** has been muted!`;
      } else {
        member.roles.remove(muteRole);
        return `**${member.user.tag}** has been unmuted!`;
      }
    }
  }
};
