class Meme extends require("../../../Assets/Structures/Commands/GenericRedditCommand") {
    constructor(client) {
        super(client, {
            name: "meme",
            url: "https://www.reddit.com/r/dankmemes.json?sort=top&t=week",
            description: "View a nice meme from r/dankmemes",
            category: "fun",
            aliases: ["dankmemes"]
        });
    }
}

module.exports = Meme;