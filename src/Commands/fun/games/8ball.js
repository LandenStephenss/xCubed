const res = [
  "It is certain.",
  "It is decidedly so.",
  "Without a doubt.",
  "Yes - Definitely",
  "As i see it, yes.",
  "Most likely",
  "Outlook good",
  "Yes.",
  "Signs point to yes",
  "Reply Hazy, try again.",
  "Ask again later.",
  "Better now tell you now",
  "Cannot predict now.",
  "Concentrate and ask again",
  "Don't count on it.",
  "My reply is no.",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];
module.exports = class EightBall extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "8ball",
      category: "fun",
      description: "See what the magic 8ball has to say about you",
      aliases: ["eightball", "magic8", "magiceight"],
    });
  }
  run({ args }) {
    if (!args[0]) return "You need to ask a question!";
    return `The 8ball says: 🎱 **${
      res[Math.floor(Math.random() * res.length)]
    }** 🎱`;
  }
};
