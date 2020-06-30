module.exports = class Invite extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor(client) {
    super({
      name: "invite",
      description: "Invite the bot to your guild",
      category: "information",
      aliases: ["botinvite", "joinserver"],
    });
    this.run = ({ client }) => {
      return `<https://discordapp.com/oauth2/authorize?client_id=${client.user.id}&scope=bot&permissions=469822503>`;
    };
  }
};
