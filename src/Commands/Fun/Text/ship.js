class Ship extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "ship",
            description: "Ship two users!",
            category: "fun",
            usage: "{c} `<user>` `<user>`"
        })
        this.callback = ({
            message,
            args
        }) => {
            if (message.mentions.members.size !== 2) {
                return "Please include two users to ship!"
            } else {
                const Member1 = message.mentions.users.first(2)[0];
                const Member2 = message.mentions.users.first(2)[1]
                return `**${Member1.username}** + **${Member2.username}** = **${Member1.username.slice(0, Member1.username.length / 2) + Member2.username.slice(Member2.username.length / 2)}** 💕`
            }
        }
    }
}
module.exports = Ship;