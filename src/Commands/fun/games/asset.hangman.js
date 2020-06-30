const Channels = new Set();
const Words = require("../../../Assets/jsons/randomWords.json");
module.exports = class Hangman {
  constructor(client, channel) {
    this.client = client;
    this.word = Words[Math.floor(Math.random() * Words.length)];
    this.missed = 0;
    this.channel = channel;
    this.maxMissed = 6;
    this.guessed = [];
    this.msg = null;
  }

  async start() {
    if (Channels.has(this.channel.id)) return;
    Channels.add(this.channel.id);
    // description: () => {
    //   switch (cock) {
    //     case 2:
    //       break;
    //   }
    // };
    // change description to do this
    this.msg = await this.channel.send({
      embed: {
        color: 8879851,
        description: `\`\`\`\n|¯¯¯¯¯¯¯| ‫ ‫\n|${
          this.missed >= 1 ? "       O" : ""
        }\n|${this.missed >= 3 ? "      /" : ""}${
          this.missed >= 2 ? `${this.missed === 2 ? "       " : ""}|` : ""
        }${this.missed >= 4 ? "\\" : ""}\n|${
          this.missed >= 5 ? "      /" : ""
        }${
          this.missed >= 6 ? " \\" : ""
        }\n|\n|\_______\`\`\`\nGuess the word!\n ${
          "\\" + "‿ ".repeat(this.word.length)
        }`,
      },
    });

    this.channel
      .awaitMessages((msg) => !msg.author.bot, { max: 1, errors: ["time"] })
      .then(async (collected) => {
        var msg = collected.first();
        if (this.word.split("").includes(msg.content)) {
          this.guessed.push(msg.content.toLowerCase());
        } else {
          this.missed++;
        }
        this.nextGuess();
      })
      .catch((e) => {
        this.nextGuess();
        this.missed++;
      });
  }
  async nextGuess() {
    var noDup = [];
    this.word.split("").forEach((letter) => {
      if (!noDup.includes(letter)) {
        noDup.push(letter);
      }
    });
    if (this.guessed.length == noDup.length) {
      this.msg.delete();
      this.msg = await this.channel.send({
        embed: {
          color: 8879851,
          description: `\`\`\`\n|¯¯¯¯¯¯¯| ‫ ‫\n|${
            this.missed >= 1 ? "       O" : ""
          }\n|${this.missed >= 3 ? "      /" : ""}${
            this.missed >= 2 ? `${this.missed === 2 ? "       " : ""}|` : ""
          }${this.missed >= 4 ? "\\" : ""}\n|${
            this.missed >= 5 ? "      /" : ""
          }${
            this.missed >= 6 ? " \\" : ""
          }\n|\n|\_______\`\`\`\nYou won! The word was \`${this.word}\``,
        },
      });
      Channels.delete(this.channel.id);
    } else if (this.missed >= this.maxMissed) {
      Channels.delete(this.channel.id);
      this.msg.delete();
      this.msg = await this.channel.send({
        embed: {
          color: 8879851,
          description: `\`\`\`\n|¯¯¯¯¯¯¯| ‫ ‫\n|${
            this.missed >= 1 ? "       O" : ""
          }\n|${this.missed >= 3 ? "      /" : ""}${
            this.missed >= 2 ? `${this.missed === 2 ? "       " : ""}|` : ""
          }${this.missed >= 4 ? "\\" : ""}\n|${
            this.missed >= 5 ? "      /" : ""
          }${
            this.missed >= 6 ? " \\" : ""
          }\n|\n|\_______\`\`\`\nYou lost! The word was\n ${this.word}`,
        },
      });
    } else {
      var display = "";
      this.word.split("").forEach((letter) => {
        if (this.guessed.includes(letter)) {
          display = display + letter + " ";
        } else {
          display = display + "‿ ";
        }
      });
      this.msg.delete();
      this.msg = await this.channel.send({
        embed: {
          color: 8879851,
          description: `\`\`\`\n|¯¯¯¯¯¯¯| ‫ ‫\n|${
            this.missed >= 1 ? "       O" : ""
          }\n|${this.missed >= 3 ? "      /" : ""}${
            this.missed >= 2 ? `${this.missed === 2 ? "       " : ""}|` : ""
          }${this.missed >= 4 ? "\\" : ""}\n|${
            this.missed >= 5 ? "      /" : ""
          }${
            this.missed >= 6 ? " \\" : ""
          }\n|\n|\_______\`\`\`\nGuess the word!\n ${display}`,
        },
      });
      this.channel
        .awaitMessages((msg) => !msg.author.bot, { max: 1, errors: ["time"] })
        .then(async (collected) => {
          var msg = collected.first();
          if (this.word.split("").includes(msg.content.toLowerCase())) {
            this.guessed.push(msg.content.toLowerCase());
          } else {
            this.missed++;
          }
          this.nextGuess();
        })
        .catch((e) => {
          this.nextGuess();
          this.missed++;
        });
    }
  }
};
