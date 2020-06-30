const moment = require("moment");
require("moment-duration-format");
const { FormatNumber } = require("../../../Assets/Util");
module.exports = class Status extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "status",
      description: "view xCubed's status!",
      category: "information",
      aliases: ["stats", "botinfo", "botstatus"],
      botPerms: ["EMBED_LINKS"]
    });
  }
  run({ client }) {
    return {
      embed: {
        author: {
          name: client.user.username,
          icon_url: client.user.displayAvatarURL(),
        },
        color: 8879851,
        fields: [
          {
            name: "Guilds",
            value: FormatNumber(client.guilds.cache.size),
            inline: true,
          },
          {
            name: "Users",
            value: FormatNumber(client.users.cache.size),
            inline: true,
          },
          {
            name: "Commands Used",
            value: FormatNumber(client.commandsUsed),
            inline: true,
          },
          {
            name: "Memory Usage",
            value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
              2
            )} MB`,
            inline: true,
          },
          {
            name: "Uptime",
            value: moment
              .duration(Math.floor(process.uptime() * 1000))
              .format("D [days], H [hours], m [minutes]"),
            inline: true,
          },
        ],
      },
    };
  }
};
