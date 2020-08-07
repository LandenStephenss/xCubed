const maxMentions = 5;
module.exports = (message, type) => {
  switch (type) {
    case "members":
      var mentions = [];
      for (const mention of message.mentions.members.array()) {
        if (!mentions.includes(mention)) {
          mentions.push(mention);
        }
      }
      if (mentions.length >= maxMentions) {
        mentions.forEach((f) => {
          if (f.user.bot) return;
          f.user.send(
            `You were mentioned in **${message.guild.name}** by **${message.author.tag}**\n\`\`\`${message.content}\`\`\``
          );
        });
        message.delete();
        message.channel
          .send(`<@${message.author.id}> you can't do that!`)
          .then((f) => {
            f.delete({ timeout: 2000 });
          });
      }
      break;
    case "roles":
      var mentions = [];
      for (const mention of message.mentions.roles.array()) {
        if (!mentions.includes(mention)) {
          mentions.push(mention);
        }
      }
      if (mentions.length >= maxMentions) {
        message.delete();
        message.channel
          .send(`<@${message.author.id}> you can't do that!`)
          .then((f) => {
            f.delete({ timeout: 2000 });
          });
      }
      break;
  }
};
