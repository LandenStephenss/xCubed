class Avatar extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "avatar",
            description: "View somebodys avatar",
            usage: "{c} `<user>`",
            botPerms: ["EMBED_MESSAGES"],
            category: "information"
        })
        this.callback = ({
            message,
            args
        }) => {
            const member = message.mentions.members.first() || message.member;
            return {
                embed: {
                    title: `${member.user.username}'s Avatar`,
                    image: {
                        url: member.user.displayAvatarURL({size: 2048})
                    },
                    color: parseInt("877EEB", 16)
                }
            }
        }
    }
}

module.exports = Avatar;