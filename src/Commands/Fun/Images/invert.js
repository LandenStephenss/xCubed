class Invert extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "invert",
            usage: "{c} `<user>`",
            description: "Get inverted nerd",
            category: "fun",
            endpoint: "/invert"
        })
    }
}

module.exports = Invert
