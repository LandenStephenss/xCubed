class Pokemon extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "pokemon",
            usage: "{c} `<user>`",
            description: "",
            category: "fun",
            endpoint: "/whatspokemon",
            aliases: ["whatspokemon"]
        })
    }
}

module.exports = Pokemon
