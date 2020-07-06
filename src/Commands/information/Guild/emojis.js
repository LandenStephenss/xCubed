module.exports = class Emojis extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "emojis",
      category: "information",
      description: "View all of the emojis in a guild",
    });
  }
  run({message: {guild}}) {
      return {embed: {title: `${guild.name}'s Emojis`, description: guild.emojis.cache.map((f) => f).join("")}}
  }
};
