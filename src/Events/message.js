const User = require("../Stuctures/Database/User.js");
const Guild = require("../Stuctures/Database/Guild.js");
const NoXP = new Set();
const { Levels } = require("../Assets/util");
// Other events for AutoMod

class Message {
  constructor(client) {
    this.client = client;
    this.levels = Levels;
  }
  async run(message) {
    if (message.author.bot || message.channel.type === "dm") return;
    if (
      await this.client.guildDB
        .countDocuments({ _id: message.guild.id }, { limit: 1 })
        .then((res) => res === 0)
    ) {
      await this.client.guildDB.insertOne(Guild(message.guild));
    }
    if (
      await this.client.userDB
        .countDocuments({ _id: message.author.id }, { limit: 1 })
        .then((res) => res === 0)
    ) {
      await this.client.userDB.insertOne(User(message.author));
    }
    message.mentions.users.forEach(async (user) => {
      if (user.bot) return;
      if (
        await this.client.userDB
          .countDocuments({ _id: user.id }, { limit: 1 })
          .then((res) => res === 0)
      ) {
        this.client.userDB.insertOne(User(user));
      }
    });

    if (!NoXP.has(message.author.id)) {
      const {
        levels: { xp, booster, level },
      } = await this.client.userDB.findOne({
        _id: message.author.id,
      });
      await this.client.userDB.updateOne(
        {
          _id: message.author.id,
        },
        {
          $set: {
            "levels.level":
              xp > this.levels.filter((f) => f.level === level)[0].xp
                ? level + 1
                : level,
            "levels.xp":
              xp +
              (booster
                ? Math.floor(Math.random() * 30) + 15
                : Math.floor(Math.random() * 15) + 15),
            avatar: message.author.displayAvatarURL(),
            username: message.author.username,
          },
        }
      );
      if (xp > this.levels.filter((f) => f.level === level)[0].xp) {
        // message.channel.send(`<@${message.author.id}> you are now level ${level + 1}!`)
      }
      NoXP.add(message.author.id);
      setTimeout(() => {
        NoXP.delete(message.author.id);
      }, 30 * 1000);
    }

    // AutoMod Shits
    // here is the mention shit
    const MassMention = require("../Assets/AutoMod/MassMention");
    const maxMentions = 5;
    if (message.mentions.members.size >= maxMentions) {
      MassMention(message, "members");
    } else if (message.mentions.roles.size >= maxMentions) {
      MassMention(message, "roles");
    }

    // max chars
    const MaxChar = require("../Assets/AutoMod/1800.js");
    if (message.content.length >= 1800) {
      MaxChar(message);
    }

    // command handling
    const {
      settings: { prefix },
    } = await this.client.guildDB.findOne({ _id: message.guild.id });
    if (message.content.startsWith(prefix)) {
      var Command = message.content
        .split(" ")[0]
        .slice(prefix.length)
        .toLowerCase();
      const Args = message.content.split(" ").slice(1);
      if (
        this.client.commands.has(Command) ||
        this.client.aliases.has(Command)
      ) {
        // TODO; Implement arg handling eventually, might not be added until V11 release;
        Command =
          this.client.commands.get(Command) ||
          this.client.commands.get(this.client.aliases.get(Command));
        if (
          !this.client.config.developers.includes(message.author.id) &&
          Command.config.developer
        ) {
          message.channel.send({
            embed: {
              title: "You must be a developer to run this command!",
              color: 8879851,
            },
          });
        } else if (!Command.config.enabled) {
          return;
        } else if (
          !Command.config.botPerms.every((perm) =>
            message.guild.member(this.client.user).hasPermission(perm)
          )
        ) {
          message.channel.send(
            `I require \`${Command.config.botPerms
              .filter(
                (perm) =>
                  !message.guild.member(this.client.user).hasPermission(perm)
              )
              .map((r) => r.split("_").join(" "))
              .join(", ")}\` permissions`
          );
        } else if (
          !Command.config.userPerms.every((perm) =>
            message.member.hasPermission(perm)
          )
        ) {
          message.channel.send(
            `You require \`${Command.config.userPerms
              .filter((perm) => !message.member.hasPermission(perm))
              .map((r) => r.split("_").join(" "))
              .join(", ")}\` permissions`
          );
        } else {
          this.client.commandsUsed++;
          Command.help.timesUsed++;
          var { blacklisted } = await this.client.userDB.findOne({
            _id: message.author.id,
          });
          if (blacklisted) return;
          var res = await Command.run({
            client: this.client,
            message,
            args: Args,
          });
          if (res) {
            if (typeof res === "string" || typeof res === "object") {
              this.client.logger.debug(
                `\u001b[31m${message.author.tag}\u001b[38;5;33m ran command \u001b[31m${Command.help.name}\u001b[39m ("${message.content}")`
              );
              if (res.embed && !res.embed.color) {
                res.embed.color = 8879851;
              }
              message.channel.send(res);
            }
          }
        }
      }
    }
  }
}

module.exports = Message;
