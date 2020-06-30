const GenericRedditCommand = require("../../../Stuctures/Commands/GenericRedditCommand");
module.exports = class Meme extends GenericRedditCommand {
  constructor() {
    super({
      endpoint: "/r/battlestations.json?sort=top&t=week",
      name: "battlestation",
      aliases: [],
      category: "fun",
      description: "I bet you wish you had these.",
    });
  }
};
