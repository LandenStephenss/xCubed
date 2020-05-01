class Gay extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "gay",
            usage: "{c} `<user>`",
            description: "Make somebody gay",
            category: "fun",
            endpoint: "/gay"
        })
    }
}

module.exports = Gay
