class HowGay extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "howgay",
            category: "fun",
            description: "Find out how gay you are!",
            botPerms: ["EMBED_LINKS"]
        })
        this.callback = async ({
            message
        }) => {
            const member = message.mentions.members.first() || message.member;
            try {
                const {
                    stats: {
                        howgay
                    }
                } = await this.client.userDB.findOne({
                    "_id": member.id
                })
                return {
                    embed: {
                        author: {
                            name: `🏳️‍🌈 ${member.user.username} is ${howgay}% gay 🏳️‍🌈`,
                            icon_url: member.user.displayAvatarURL()
                        },
                        description: "🟩".repeat(howgay / 10) + "⬜".repeat((100 / 10) - (howgay / 10)),
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

module.exports = HowGay