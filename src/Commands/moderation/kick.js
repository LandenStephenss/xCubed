module.exports = class Kick extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "kick",
      category: "moderation",
      description: "Kick somebody from your server",
      usage: "{c} `<user>`",
      userPerms: ["KICK_MEMBERS"],
      botPerms: ["KICK_MEMBERS"],
    });
  }
  run({ message, args, client }) {
    const member =
      message.mentions.members.first() ||
      message.guild.members.cache.get(parseInt(args[0]));
    if (!member) {
      return "You have to mention a user to kick!";
    } else if (member.id === message.author.id) {
      return "You can't kick yourself!";
    } else if (!member.kickable) {
      return "That user can't be kicked!";
    } else {
      member.kick(
        `Kicked by xCubed. Command ran by ${message.author.tag} (${message.author.id})`
      );
      return `**${member.user.tag}** has been kicked.`
    }
  }
};
