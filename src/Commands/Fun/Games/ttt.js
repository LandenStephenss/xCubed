const ttt = require("../../../Assets/Games/ttt");
class tictactoe extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "ttt",
            aliases: ["tictactoe"],
            description: "Play some tictactoe",
            category: "fun"
        })
        this.callback = ({
            message
        }) => {
            const member = message.mentions.members.first();
            if (!member || member.id === message.author.id || member.user.bot) {
                return "Please mention a user to play with!"
            } else {
                const TTT = new ttt([message.author.id, member.id], message.channel, this.client)
                TTT.start()
            }
        }
    }
}

module.exports = tictactoe