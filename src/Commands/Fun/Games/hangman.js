const hang = require("../../../Assets/Games/hangman");
class HangMan extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "hangman",
            aliases: [],
            description: "Play some hangman",
            category: "fun"
        })
        this.callback = ({
            message
        }) => {
            var Hang = new hang(this.client, message.channel);
            Hang.start()
        }
    }
}

module.exports = HangMan