module.exports = class Ping extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "ping",
      category: "information",
      description: "View the bots ping!",
      botPerms: ["EMBED_LINKS"]
    });
  }
  run({ client }) {
    return {
      embed: { description: `⏳ ${client.ws.ping} ms`, color: 8879851 },
    };
  }
};
