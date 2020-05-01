class Mute extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "mute",
            description: "Mute a user (also unmutes)",
            userPerms: ["MANAGE_ROLES"],
            botPerms: ["MANAGE_ROLES"],
            category: "moderation",
            usage: "{c} `<user>`"
        })
        this.callback = async ({
            message,
            args
        }) => {
            const {
                modLogs,
                settings: {
                    mod: {
                        muteRole
                    },
                    prefix
                }
            } = await this.client.guildDB.findOne({
                "_id": message.guild.id
            });
            if (muteRole === null) {
                return `It seems you have not set a mute role, please set one with \`${prefix}settings set muteRole <role>\``
            } else {

                var member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                if (!member) {
                    return "Please specify a user to mute!"
                } else {
                    if (member.roles.cache.has(muteRole)) {
                        member.roles.remove(muteRole)
                        var newLogs = [{case: modLogs[modLogs.length - 1].case + 1, user: member.id, action: "Unmute", timestmap: message.createdTimestamp, byWho: message.author.id, reason: null}, ...modLogs]
                        await this.client.guildDB.updateOne({"_id": message.guild.id}, {$set: {"modLogs": newLogs}})
                        return `${member.user.tag} has been unmuted!`
                    } else {
                        member.roles.add(muteRole)
                        var newLogs = [{case: modLogs[modLogs.length - 1].case + 1, user: member.id, action: "Mute", timestmap: message.createdTimestamp, byWho: message.author.id, reason: null}, ...modLogs]
                        await this.client.guildDB.updateOne({"_id": message.guild.id}, {$set: {"modLogs": newLogs}})
                        return `${member.user.tag} has been muted!`
                    }
                }
            }
        }
    }
}

module.exports = Mute;