module.exports = class GuildInformation extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "guildinfo",
      aliases: ["gi", "guildinformation", "serverinfo"],
      category: "information",
      botPerms: ["EMBED_LINKS"],
    });
  }
  async run({
    message: {
      guild: { id, name, members, channels, roles, region, afkChannelID, icon },
    },
    client,
  }) {
    var GuildData = await client.guildDB.findOne({ _id: id });
    return {
      embed: {
        title: `Information About ${name}`,
        fields: [
          {
            name: "Members",
            value: `${members.cache.filter((f) => !f.user.bot).size} (${
              members.cache.filter((f) => f.user.bot).size
            } bots)`,
            inline: true,
          },
          {
            name: "Channels",
            value: `${channels.cache.size}`,
            inline: true,
          },
          {
            name: `Roles`,
            value: roles.cache.size,
            inline: true,
          },
          {
            name: "Guild ID",
            value: id,
            inline: true,
          },
          {
            name: "Region",
            value: region,
            inline: true,
          },
          {
            name: "AFK Channel",
            value:
              afkChannelID === null
                ? "None"
                : client.channels.cache.get(afkChannelID).name,
            inline: true,
          },
        ],
        footer: {
          text: `${name}'s prefix is ${GuildData.settings.prefix}`,
        },
        thumbnail: {
          url: `https://cdn.discordapp.com/icons/${id}/${icon}.jpg?size=128`,
        },
      },
    };
  }
};
