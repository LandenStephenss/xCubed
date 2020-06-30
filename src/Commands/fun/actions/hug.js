const { titles, images } = require("../../../Assets/jsons/hug.json");
module.exports = class Hug extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "hug",
      category: "fun",
      description: "Give somebody a hug",
    });
  }
  run({ message }) {
    const mention = message.mentions.users.first();
    if (!mention) return "Please mention somebody";
    if (mention.id === message.author.id)
      return "You can't hug yourself! Stop being lonely :(";
    return {
      embed: {
        title: titles[Math.floor(Math.random() * titles.length)]
          .replace("{author}", message.author.username)
          .replace("{mention}", mention.username),
        image: {
          url: images[Math.floor(Math.random() * images.length)],
        },
        color: 8879851,
      },
    };
    return titles[Math.floor(Math.random() * titles.length)];
  }
};
