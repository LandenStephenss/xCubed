class Brazzers extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "brazzers",
            usage: "{c} `<user>`",
            description: "Porn? What's that?",
            category: "fun",
            endpoint: "/brazzers"
        })
    }
}

module.exports = Brazzers
