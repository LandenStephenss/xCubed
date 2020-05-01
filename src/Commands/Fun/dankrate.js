class DankRate extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "dankrate",
            category: "fun",
            description: "Find out how dank you are!",
            botPerms: ["EMBED_LINKS"]
        })
        this.callback = async ({
            message
        }) => {
            const member = message.mentions.members.first() || message.member;
            try {
                const {
                    stats: {
                        dankrate
                    }
                } = await this.client.userDB.findOne({
                    "_id": member.id
                })
                return {
                    embed: {
                        author: {
                            name: `${member.user.username} is ${dankrate}% dank`,
                            icon_url: member.user.displayAvatarURL()
                        },
                        description: "🟩".repeat(dankrate / 10) + "⬜".repeat((100 / 10) - (dankrate / 10)),
                        color: parseInt("877EEB", 16)
                    }
                }
            } catch (e) {
                console.error(e)
                return `It looks like \`${member.user.tag}\` is not in the database! Try again.`
            }
        }
    }
}

module.exports = DankRate