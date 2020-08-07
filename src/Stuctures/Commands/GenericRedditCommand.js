const fetch = require("node-fetch");
class GenericRedditCommand {
  constructor({
    name = "Command",
    description = "None given!",
    usage = "{c}",
    category = "Miscellaneous",
    timesUsed = 0,
    cooldown = 3000,
    aliases = new Array(),
    botPerms = new Array().concat("SEND_MESSAGES").concat("EMBED_LINKS"),
    userPerms = new Array(),
    nsfw = false,
    args = new Array(),
    developer = false,
    enabled = true,
    endpoint = "/",
  }) {
    this.props = { endpoint };
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
      filePath: null
    };
  }
  async run({ message }) {
    const res = await fetch(
      "https://reddit.com" + this.props.endpoint
    ).then((j) => j.json());
    var body =
      res.data.children[Math.floor(Math.random() * res.data.children.length)];
    return {
      embed: {
        url: "https://reddit.com" + body.data.permalink,
        title: body.data.title,
        image: {
          url: body.data.url,
        },
        footer: { text: `🔼 ${body.data.ups} 🔽 ${body.data.downs}` },
      },
    };
  }
}

module.exports = GenericRedditCommand;
