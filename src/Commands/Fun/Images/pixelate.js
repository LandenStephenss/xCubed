class Pixelate extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "pixelate",
            usage: "{c} `<user>`",
            description: "This is what kids on potato pc's look like",
            category: "fun",
            endpoint: "/pixelate",
            aliases: ["potato"]
        })
    }
}

module.exports = Pixelate
