const GenericRedditCommand = require("../../../Stuctures/Commands/GenericRedditCommand");
module.exports = class Meme extends GenericRedditCommand {
  constructor() {
    super({
      endpoint: "/r/softwaregore.json?sort=top&t=week",
      name: "softwaregore",
      category: "fun",
      description: "This cant be good.",
    });
  }
};
