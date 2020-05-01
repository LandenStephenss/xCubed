class Prison extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "prison",
            usage: "{c} `<user>`",
            description: "Send somebody to prison!",
            category: "fun",
            endpoint: "/prison",
            aliases: []
        })
    }
}

module.exports = Prison
