class Treasure extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "treasure",
            usage: "{c} `<user>`",
            description: "Find a treasure",
            category: "fun",
            endpoint: "/treasure",
            aliases: []
        })
    }
}

module.exports = Treasure
