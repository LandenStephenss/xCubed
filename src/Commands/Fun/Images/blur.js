class Blur extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "blur",
            usage: "{c} `<user>`",
            description: "Get blurred nerd",
            category: "fun",
            endpoint: "/blur"
        })
    }
}

module.exports = Blur
