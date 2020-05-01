class Triggered extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "triggered",
            usage: "{c} `<user>`",
            description: "You mad bro?",
            category: "fun",
            endpoint: "/triggered",
            aliases: []
        })
    }
}

module.exports = Triggered
