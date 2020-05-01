class BattleStations extends require("../../../Assets/Structures/Commands/GenericRedditCommand") {
    constructor(client) {
        super(client, {
            name: "battlestation",
            url: "https://www.reddit.com/r/battlestations.json?sort=top&t=week",
            description: "View some epic setups!",
            category: "fun",
            aliases: ["battlestations", "epicpcbro"]
        });
    }
}

module.exports = BattleStations;