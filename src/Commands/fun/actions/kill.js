const jsons = require("../../../Assets/jsons/kill.json");
module.exports = class Kill extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "kill",
      category: "fun",
      description: "This lets you kill somebody 👀",
      aliases: ["murder"],
    });
  }
  run({
    message: {
      author,
      mentions: { users },
    },
  }) {
    var user = users.first();
    if (!user) return "Please mention somebody to kill";
    if (user.id === author.id)
      return "Blam you're dead, now kill somebody else";
    return jsons[Math.floor(Math.random() * jsons.length)]
      .replace("{author}", author.username)
      .replace("{mention}", user.username);
  }
};
