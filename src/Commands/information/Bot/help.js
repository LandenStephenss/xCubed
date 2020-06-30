module.exports = class Help extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "help",
      category: "information",
      usage: "{c} `<command>`",
      aliases: ["h", "?"],
      botPerms: ["EMBED_LINKS"],
    });
    this.run = async ({ message, args, client }) => {
      const {
        settings: { prefix },
      } = await client.guildDB.findOne({ _id: message.guild.id });
      if (!args[0]) {
        var embed = {
          title: `xCubed Commands! (${client.commands.size})`,
          color: 8879851,
          fields: [],
          footer: { text: `${message.guild.name}'s prefix is ${prefix}` },
        };
        var groups = [];
        client.commands.forEach((command) => {
          if (!groups.includes(command.help.category.toLowerCase())) {
            groups.push(command.help.category.toLowerCase());
          }
        });
        groups.forEach((group) => {
          if (
            group === "developer" &&
            !client.config.developers.includes(message.author.id)
          )
            return;
          embed.fields.push({
            name:
              group.split("")[0].toUpperCase() +
              group.split("").slice(1).join(""),
            value: `\`${client.commands
              .filter(
                (command) =>
                  command.help.category.toLowerCase() === group &&
                  command.config.enabled
              )
              .map((command) => command.help.name)
              .join("`, `")}\``,
          });
        });
        return { embed };
      } else if (
        client.commands.has(args[0].toLowerCase()) ||
        client.aliases.has(args[0].toLowerCase())
      ) {
        const Command =
          client.commands.get(args[0].toLowerCase()) ||
          client.commands.get(client.aliases.get(args[0].toLowerCase()));
        return {
          embed: {
            title:
              Command.help.name.split("")[0].toUpperCase() +
              Command.help.name.slice(1).toLowerCase(),
            color: 8879851,
            fields: [
              { name: "Description", value: Command.help.description },
              {
                name: "Usage",
                value:
                  prefix + Command.help.usage.replace("{c}", Command.help.name),
              },
              {
                name: "Aliases",
                value:
                  Command.config.aliases.length === 0
                    ? "None"
                    : `\`${Command.config.aliases.join("`, `")}\``,
              },
            ],
            footer: {
              text: `This command has been used ${Command.help.timesUsed} time${
                Command.help.timesUsed === 1 ? "" : "s"
              }`,
            },
          },
        };
      } else {
        return {
          embed: {
            title: `Command ${args[0]} not found!`,
            color: 8879851,
            footer: { text: `Use ${prefix}help to view a list of my commands` },
          },
        };
      }
    };
  }
};
