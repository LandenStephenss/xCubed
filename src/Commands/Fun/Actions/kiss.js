const kisses = [
    "https://media.giphy.com/media/G3va31oEEnIkM/giphy.gif",
    "https://media.giphy.com/media/ZRSGWtBJG4Tza/giphy.gif",
    "https://media.giphy.com/media/nyGFcsP0kAobm/giphy.gif",
    "https://media.giphy.com/media/nISHppsUAzosM/giphy.gif",
    "https://media.giphy.com/media/bm2O3nXTcKJeU/giphy.gif",
    "https://media.giphy.com/media/10r6oEoT6dk7E4/giphy.gif",
    "https://media.giphy.com/media/11k3oaUjSlFR4I/giphy.gif",
    "https://media.giphy.com/media/ll5leTSPh4ocE/giphy.gif",
    "https://media.giphy.com/media/Ka2NAhphLdqXC/giphy.gif"
]
class Kiss extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "kiss",
            description: "Give that special someone a big ol' kiss",
            category: "fun"
        })
        this.callback = ({
            message
        }) => {
            const member = message.mentions.members.first();
            if (message.mentions.members.first() === undefined || message.mentions.members.first().id === message.author.id) {
                return "Please mention somebody"
            } else {
                return {
                    embed: {
                        title: `${message.author.username} kisses ${member.user.username}`,
                        color: parseInt("877EEB", 16),
                        image: {
                            url: kisses[Math.floor(Math.random() * kisses.length)]
                        }
                    }
                }
            }

        }
    }
}

module.exports = Kiss;