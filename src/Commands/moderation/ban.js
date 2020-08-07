module.exports = class Ban extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "ban",
      category: "moderation",
      description: "Ban somebody from your server",
      usage: "{c} `<user>`",
      userPerms: ["BAN_MEMBERS"],
      botPerms: ["BAN_MEMBERS"],
    });
  }
  run({ message, args, client }) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(parseInt(args[0]));
    if (!member) {
      return "You have to mention a user to ban!";
    } else if (member.id === message.author.id) {
      return "You can't ban yourself!";
    } else if (!member.bannable) {
      return "That user can't be banned!";
    } else {
      member.ban(
        `Banned by xCubed. Command ran by ${message.author.tag} (${message.author.id})`
      );
      return `**${member.user.tag}** has been banned.`;
    }
  }
};
