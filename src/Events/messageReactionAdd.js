const { relativeTimeRounding } = require("moment");

class messageReactionAdd {
  constructor(client) {
    this.client = client;
  }
  async run(reaction, user) {
    // const {
    //   channels: { starboard },
    // } = await this.client.guildDB.findOne({
    //   _id: reaction.message.channel.guild.id,
    // });
    // if (reaction._emoji.name === "⭐") {
    //   console.log(starboard);
    //   if (reaction.message.author.id === user.id) return;
    //   if (starboard === null) return;
    //   if (!reaction.message.channel.guild.channels.cache.has(starboard)) return;
    //   reaction.message.channel.guild.channels.cache.get(starboard).send({
    //     embed: {
    //       title: `Message From: ${reaction.message.author.username} (${reaction.message.id})`,
    //       fields: [
    //         { name: "Message Content", value: reaction.message.content },
    //       ],
    //       footer: {
    //         text: `${reaction.count} ⭐'s`,
    //       },
    //     },
    //   });
    // }
  }
}

module.exports = messageReactionAdd;
