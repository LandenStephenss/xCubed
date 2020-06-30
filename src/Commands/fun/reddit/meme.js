const GenericRedditCommand = require("../../../Stuctures/Commands/GenericRedditCommand");
module.exports = class Meme extends GenericRedditCommand {
  constructor() {
    super({
      endpoint: "/r/dankmemes.json?sort=top&t=week",
      name: "meme",
      aliases: ["dankmeme", "meme", "memes", "dankmemes"],
      category: "fun",
      description: "Want some memes m8?",
    });
  }
};
