module.exports = class Roles extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "roles",
      description: "View all of the roles in a guild",
      category: "information",
    });
  }
  run({ message: { guild } }) {
    return {
      embed: {
        description: guild.roles.cache
          .map((f) => (f.id == guild.id ? "" : `<@&${f.id}>`))
          .join("  "),
        footer: {
          text: `${guild.roles.cache.size} roles!`,
        },
      },
    };
  }
};
