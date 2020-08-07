const Guild = (guild) => {
  return {
    _id: guild.id,
    channels: {
      modlog: null,
      welcome: null,
      starboard: null,
      ignoredChannels: new Array(),
    },
    messages: {
      welcome: "Welcome {user} to {guild}! We hope you enjoy your stay.",
      leave: "Goodbye {user}.",
    },
    modLogs: new Array().concat({
      case: 0,
      user: "626630111004852224",
      action: "Bot Join",
      timestamp: null,
      byWho: "626630111004852224",
      reason: null,
    }),
    settings: {
      prefix: "x!",
      mod: {
        muteRole: null,
        deleteInvites: false,
        modRole: null,
        adminRole: null,
      },
    },
    autoMod: {
      noNoWords: new Array(),
      fastMsg: false,
      massMention: false, // done
      largeMessage: false, // done
      allCaps: false,
      invites: false,
      spoilers: false,
      duplicateText: false,
      allLinks: false,
      imageSpam: false,
      selfbotDetect: false,
      // AutoMod Settings
      mentionCount: 5, // done in mass mention
      autoMuteTime: 10000, // this is in ms btw
      maxEmote: 6,
      maxChars: 1800, // this is done too
    },
  };
};

module.exports = Guild;
