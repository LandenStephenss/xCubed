class Emojis extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "emojis",
            description: "View the emojis that a guild has",
            botPerms: ["EMBED_LINKS"],
            category: "information"
        })

        this.callback = ({
            message
        }) => {
            return {
                embed: {
                    title: `${message.guild.name}'s Emojis`,
                    description: message.guild.emojis.cache.map(f => f).join(" "),
                    color: parseInt("877EEB", 16)
                }
            }
        }
    }
}

module.exports = Emojis;