class Pornhub extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "pornhub",
            usage: "{c} `<user>`",
            description: "Woah, is that really you?",
            category: "fun",
            endpoint: "/phvideo",
            aliases: ["phvideo"]
        })
    }
}

module.exports = Pornhub
