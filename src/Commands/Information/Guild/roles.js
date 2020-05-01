module.exports = class Roles extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "roles",
            description: "View the roles that a server has",
            category: "information",
            botPerms: ["EMBED_LINKS"]
        })

        this.callback = ({
            message
        }) => {
            return {
                embed: {
                    title: `${message.guild.name}'s Roles`,
                    description: message.guild.roles.cache.map((f) => f).join(" "),
                    color: parseInt("877EEB", 16)
                }
            }
        }
    }
}