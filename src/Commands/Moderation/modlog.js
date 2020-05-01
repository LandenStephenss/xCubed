const Command = require("../../Assets/Structures/Commands/GenericCommand");
class ModLog extends Command {
    constructor(client) {
        super(client, {
            name: "modlog",
            description: "View the mod logs about a person",
            category: "moderation",
            userPerms: ["VIEW_AUDIT_LOG"],
            aliases: ["modlogs"]
        })
        this.callback = async ({
            message,
            args
        }) => {
            const {
                modLogs
            } = await this.client.guildDB.findOne({
                "_id": message.guild.id
            })
            const member = message.mentions.members.first() || message.member;
            const embed = {
                embed: {
                    title: `Mod logs for ${member.user.tag}: (${modLogs.filter((modLog) => modLog.user === member.id).length})`,
                    fields: [],
                    color: parseInt("877EEB", 16)
                }
            }
            modLogs.filter((modLog) => modLog.user === member.id).forEach((modLog) => embed.embed.fields.push({name: `Case: ${modLog.case}`, value: `**Action**: ${modLog.action}\n**Reason**: ${modLog.reason === null ? "None" : modLog.reason}\n**By Who**: ${message.guild.members.cache.get(modLog.byWho)}`}))
            return embed;
        }
    }
}

module.exports = ModLog