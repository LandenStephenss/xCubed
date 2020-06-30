module.exports = class About extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "about",
      description: "View some helpful tips about the bot",
      category: "information",
      aliases: ["aboutxcubed", "abt"],
      botPerms: ["EMBED_LINKS"],
    });
  }
  run() {
    return {
      embed: {
        title: "About xCubed",
        color: 8879851,
        description:
          "xCubed is a multipurpose discord bot made for any server!\n\n**Links**:\n[Support Server](https://discord.gg/kQUpSgw)\n[Patreon](https://patreon.com/Olykir)\n[Website](https://xcubed.xyz)",
      },
    };
  }
};
