class messageDelete {
  constructor(client) {
    this.client = client;
  }
  async run(message) {
    if (message.channel.type === "dm") return;
    var {
      channels: { modlog },
    } = await this.client.guildDB.findOne({ _id: message.guild.id });
    if (modlog === null || message.author.bot) return;
    this.client.channels.cache.get(modlog).send({
      embed: {
        title: `Message deleted`,
        color: 8879851,
        fields: [
          {
            name: "Content",
            value: message.content,
          },
          {
            name: "Author",
            value: `${message.author.tag} (${message.author.id})`,
          },
        ],
      },
    });
  }
}

module.exports = messageDelete;
