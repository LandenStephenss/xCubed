class Greyscale extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "greyscale",
            usage: "{c} `<user>`",
            description: "Get greyscaled nerd",
            category: "fun",
            endpoint: "/greyscale"
        })
    }
}

module.exports = Greyscale
