class Ban extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "ban",
            description: "Ban a user from the guild",
            userPerms: ["BAN_MEMBERS"],
            botPerms: ["BAN_MEMBERS"],
            category: "moderation",
            usage: "{c} `<user>` `<reason>`"
        })
        this.callback = async ({
            message,
            args
        }) => {
            const member = message.mentions.members.first() || message.guild.members.cache.get(args[0])
            if (!args[0] || !member) {
                return "Please mention a user!"
            } else {
                const reason = args.slice(1).join(" ")
                const {
                    modLogs
                } = await this.client.guildDB.findOne({
                    "_id": message.guild.id
                })
                var modLogs2 = [{
                    case: modLogs[0].case + 1,
                    user: member.id,
                    action: "Ban",
                    timestmap: message.createdTimestamp,
                    byWho: message.author.id,
                    reason: reason.length === 0 ? null : reason
                }, ...modLogs]
                await this.client.guildDB.updateOne({"_id": message.guild.id}, {$set: {"modLogs": modLogs2}});
                member.ban(reason.length === 0 ? `No reason given - ${message.author.tag}` : reason)
                return `${member.user.username} has been banned!`
            }
        }
    }
}

module.exports = Ban;