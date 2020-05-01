const dickNames = ["pp", "dick", "penis", "hammer", "rictus erectus", "pickle", "peter", "peen", "suasage"]
class Dick extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "dick",
            category: "fun",
            description: "See how large of a pp you got!",
            aliases: ["penis", "cock", "pp"]
        })
        this.callback = async ({
            message
        }) => {
            const member = message.mentions.members.first() || message.member;
            try {
                const {
                    stats: {
                        dick
                    }
                } = await this.client.userDB.findOne({
                    "_id": member.id
                })
                return {
                    embed: {
                        author: {
                            name: `${member.user.username}'s ${dickNames[Math.floor(Math.random() * dickNames.length)].toLowerCase()} is ${dick} inches long`,
                            icon_url: member.user.displayAvatarURL()
                        },
                        description: dick < 0 ? `\`\`\`8${"=".repeat(Math.abs(dick))}D\`\`\``.split("").reverse().join("") : `\`\`\`8${"=".repeat(Math.abs(dick))}D\`\`\``,
                        color: parseInt("877EEB", 16)
                    }
                }
            } catch(e) {
                console.error(e)
                return `Apprently \`${member.user.tag}\` has no dick`
            }
        }
    }
}

module.exports = Dick;