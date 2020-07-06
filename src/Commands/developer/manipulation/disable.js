module.exports = class Disable extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "disable",
      description: "Disable a command",
      developer: true,
      usage: "{c} `<command>`",
      category: "developer"
    });
  }
  run({ args, client }) {
    if (!args[0]) {
      return "lol are u stupid";
    } else {
      const command =
        client.commands.get(args[0]) ||
        client.commands.get(client.aliases.get(args[0]));
      if (!command) return "That command does not exist";
      command.config.enabled = false;
      return `\`${command.help.name}\` has been disabled!`;
    }
  }
};
