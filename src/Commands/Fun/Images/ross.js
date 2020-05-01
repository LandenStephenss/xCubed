class Ross extends require("../../../Assets/Structures/Commands/GenericImageAPICommand") {
    constructor(client) {
        super(client, {
            name: "ross",
            usage: "{c} `<user>`",
            description: "Some happy little trees",
            category: "fun",
            endpoint: "/bobross",
            aliases: ['bobross']
        })
    }
}

module.exports = Ross
