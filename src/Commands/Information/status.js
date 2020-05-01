const moment = require("moment");
require("moment-duration-format");
const FormatNumber = require("../../Assets/Util/FormatNumber")
class Status extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "status",
            aliases: ["stats", "uptime", "botstats"],
            description: "View some information about the bots status.",
            category: "information",
            botPerms: ["EMBED_LINKS"]
        })

        this.callback = ({message: { guild}}) => {
            return {
                embed: {
                    author: {
                        name: this.client.user.username,
                        icon_url: this.client.user.displayAvatarURL()
                    },
                    color: parseInt("877EEB", 16),
                    fields: [{
                        name: "Guilds:",
                        value: FormatNumber(this.client.guilds.cache.size),
                        inline: true,
                    }, {
                        name: "Users:",
                        value: FormatNumber(this.client.users.cache.size),
                        inline: true,
                    },
                    {
                        name: "Commands Used:",
                        value: this.client.commandsUsed,
                        inline: true,
                    },
                    {
                        name: "Memory Used:",
                        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
                        inline: true,
                    }, {
                        name: "Uptime:",
                        value: moment.duration(Math.floor(process.uptime() * 1000)).format("D [days], H [hours], m [minutes]"),
                        inline: true,
                    },
                    {
                        name: "Shard ID:",
                        value: guild.shardID,
                        inline: true,
                    }]
                }
            }
        }
    }
}

module.exports = Status;