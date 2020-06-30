class messageUpdate {
  constructor(client) {
    this.client = client;
  }
  async run(oldMessage, newMessage) {
    if (
      oldMessage.author.bot ||
      oldMessage.channel.type === "dm" ||
      oldMessage.content === newMessage.content
    )
      return;
    var {
      channels: { modlog },
    } = await this.client.guildDB.findOne({ _id: oldMessage.guild.id });
    if (modlog === null) return;
    this.client.channels.cache.get(modlog).send({
      embed: {
        color: 8879851,
        title: `Message Edited`,
        fields: [
          { name: "Old Content", value: oldMessage.content },
          { name: "New Content", value: newMessage.content },
        ],
      },
    });
  }
}

module.exports = messageUpdate;
