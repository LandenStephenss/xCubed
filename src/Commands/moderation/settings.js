module.exports = class Settings extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "settings",
      description: "Change the bot settings",
      userPerms: ["MANAGE_GUILD"],
      category: "moderation",
      usage: "{c} `<setting>` `<value>`",
    });
  }
  async run({ args, client, message: { guild } }) {
    const GuildData = await client.guildDB.findOne({ _id: guild.id });
    if (!args[0]) {
      return {
        embed: {
          title: `Settings for ${guild.name}!`,
          description: `Prefix (prefix): \`${
            GuildData.settings.prefix
          }\`\nMod Log Channel (modlog): ${
            GuildData.channels.modlog === null
              ? "`N/A`"
              : `<#${GuildData.channels.modlog}>`
          }\nJoin Leave Channel (joinleave): ${
            GuildData.channels.welcome === null
              ? "`N/A`"
              : `<#${GuildData.channels.welcome}>`
          }\nStarboard Channel (starboard): ${
            GuildData.channels.starboard === null
              ? "`N/A`"
              : `<#${GuildData.channels.starboard}>`
          }\nIgnored Channels (ignored): ${
            GuildData.channels.ignoredChannels.length === 0
              ? "`No ignored channels`"
              : `<#${GuildData.channels.ignoredChannels.join(">, <#")}>`
          }\nWelcome Message (welcomemsg): \`${
            GuildData.messages.welcome
          }\`\nLeave Message (leavemsg): \`${
            GuildData.messages.leave
          }\`\nMute Role (muterole): ${
            GuildData.settings.mod.muteRole === null
              ? "`N/A`"
              : `<@&${GuildData.settings.mod.muteRole}>`
          }\nMod Role (modrole): ${
            GuildData.settings.mod.modRole === null
              ? "`N/A`"
              : `<@&${GuildData.settings.mod.modRole}>`
          }\nAdmin Role (adminrole): ${
            GuildData.settings.mod.adminRole === null
              ? "`N/A`"
              : `<@&${GuildData.settings.mod.adminRole}>`
          }`,
        },
      };
    } else {
      switch (args[0].toLowerCase()) {
        case "prefix":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings prefix x!\``;
          } else if (
            args[1].toLowerCase() === GuildData.settings.prefix.toLowerCase()
          ) {
            return `My prefix is already \`${GuildData.settings.prefix}\``;
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "settings.prefix": args[1] } }
            );
            return `Prefix changed to \`${args[1]}\``;
          }
          break;
        case "modlog":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings modlog channelID\``;
          } else if (!guild.channels.cache.has(args[1])) {
            return "Please choose a valid channel. (You must use the channel ID)";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "channels.modlog": args[1] } }
            );
            return `Mod Logs will now be sent to <#${args[1]}>`;
          }
          break;
        case "joinleave":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings joinleave channelID\``;
          } else if (!guild.channels.cache.has(args[1])) {
            return "Please choose a valid channel. (You must use the channel ID)";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "channels.welcome": args[1] } }
            );
            return `Welcome messages will now be sent to <#${args[1]}>`;
          }
          break;
        case "starboard":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings starboard channelID\``;
          } else if (!guild.channels.cache.has(args[1])) {
            return "Please choose a valid channel (You must use the channel ID)";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "channels.starboard": args[1] } }
            );
            return `Starboard channel is now set as <#${args[1]}>`;
          }
          break;
        case "ignored":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings ignored <disable|enable> channelID\``;
          } else if (!args[2]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings ignored <disable|enable> channelID\``;
          } else {
            switch (args[1]) {
              case "enable":
                if (GuildData.channels.ignoredChannels.includes(args[2])) {
                  return `<#${args[2]}> is already being ignored!`;
                } else if (!guild.channels.cache.has(args[2])) {
                  return "That channel does not exist!";
                } else {
                  client.guildDB.updateOne(
                    { _id: guild.id },
                    {
                      $set: {
                        "channels.ignoredChannels": [
                          ...GuildData.channels.ignoredChannels,
                          args[2],
                        ],
                      },
                    }
                  );
                  return `Now ignoring the channel <#${args[2]}>`;
                }
                break;
              case "disable":
                if (!GuildData.channels.ignoredChannels.includes(args[2])) {
                  return `<#${args[2]}> is not being ignored!`;
                } else if (!guild.channels.cache.has(args[2])) {
                  return "That channel does not exist!";
                } else {
                  client.guildDB.updateOne(
                    { _id: guild.id },
                    {
                      $set: {
                        "channels.ignoredChannels": GuildData.channels.ignoredChannels.filter(
                          (i) => i !== args[2]
                        ),
                      },
                    }
                  );
                  return `No longer ignored the channel <#${args[2]}>`;
                }
                break;
              default:
                return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings ignored <disable|enable> channelID\``;
                break;
            }
          }
          break;
        case "welcomemsg":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings welcomemsg Welcome Message\``;
          } else {
            var welcomeMessage = args.slice(1).join(" ");
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "messages.welcome": welcomeMessage } }
            );
            return `Welcome message is now set to \`${welcomeMessage}\``;
          }
          break;
        case "leavemsg":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings leavemsg Leave Message\``;
          } else {
            var leaveMessage = args.slice(1).join(" ");
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "messages.leave": leaveMessage } }
            );
            return `Leave message is now set to \`${leaveMessage}\``;
          }
          break;
        case "muterole":
          if (!args[1]) {
            return `Invalid Usage! Example: ${GuildData.settings.prefix}settings muterole RoleID`;
          } else if (!guild.roles.cache.has(args[1])) {
            return "That role does not exist!";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "settings.mod.muteRole": args[1] } }
            );
            return `Mute role now set as <@&${args[1]}>`;
          }
          break;
        case "modrole":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings modrole RoleID\``;
          } else if (!guild.roles.cache.has(args[1])) {
            return "That role does not exist!";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "settings.mod.modRole": args[1] } }
            );
            return `Mod Role now set as <@&${args[1]}>`;
          }
          break;
        case "adminrole":
          if (!args[1]) {
            return `Invalid Usage! Example: \`${GuildData.settings.prefix}settings adminrole RoleID\``;
          } else if (!guild.roles.cache.has(args[1])) {
            return "That role does not exist";
          } else {
            client.guildDB.updateOne(
              { _id: guild.id },
              { $set: { "settings.mod.adminRole": args[1] } }
            );
            return `Admin Role now set as <@&${args[1]}>`;
          }
          break;
        default:
          return {
            embed: {
              title: `Settings for ${guild.name}!`,
              description: `Prefix (prefix): \`${
                GuildData.settings.prefix
              }\`\nMod Log Channel (modlog): ${
                GuildData.channels.modlog === null
                  ? "`N/A`"
                  : `<#${GuildData.channels.modlog}>`
              }\nJoin Leave Channel (joinleave): ${
                GuildData.channels.welcome === null
                  ? "`N/A`"
                  : `<#${GuildData.channels.welcome}>`
              }\nStarboard Channel (starboard): ${
                GuildData.channels.starboard === null
                  ? "`N/A`"
                  : `<#${GuildData.channels.starboard}>`
              }\nIgnored Channels (ignored): ${
                GuildData.channels.ignoredChannels.length === 0
                  ? "`No ignored channels`"
                  : `<#${GuildData.channels.ignoredChannels.join(">, <#")}>`
              }\nWelcome Message (welcomemsg): \`${
                GuildData.messages.welcome
              }\`\nLeave Message (leavemsg): \`${
                GuildData.messages.leave
              }\`\nMute Role (muterole): ${
                GuildData.settings.mod.muteRole === null
                  ? "`N/A`"
                  : `<@&${GuildData.settings.mod.muteRole}>`
              }\nMod Role (modrole): ${
                GuildData.settings.mod.modRole === null
                  ? "`N/A`"
                  : `<@&${GuildData.settings.mod.modRole}>`
              }\nAdmin Role (adminrole): ${
                GuildData.settings.mod.adminRole === null
                  ? "`N/A`"
                  : `<@&${GuildData.settings.mod.adminRole}>`
              }`,
            },
          };
          break;
      }
    }
  }
};
