class GenericCommand {
  constructor({
    name = "Command",
    description = "None given!",
    usage = "{c}",
    category = "Miscellaneous",
    timesUsed = 0,
    cooldown = 3000,
    aliases = new Array(),
    botPerms = new Array().concat("SEND_MESSAGES"),
    userPerms = new Array(),
    nsfw = false,
    args = new Array(),
    developer = false,
    enabled = true,
  }) {
    this.help = {
      name,
      description,
      usage,
      category,
      timesUsed,
    };
    this.config = {
      aliases,
      botPerms,
      userPerms,
      args,
      nsfw,
      developer,
      enabled,
      cooldown,
    };
  }
}

module.exports = GenericCommand;
