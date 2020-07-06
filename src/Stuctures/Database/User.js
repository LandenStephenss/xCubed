const User = (user) => {
  return {
    _id: user.id,
    donator: false,
    levels: {
      xp: 0,
      level: 0,
      booster: false,
    },
    profile: {
      badges: new Array(),
      partner: null,
    },
    stats: {
      howgay: Math.floor(Math.random() * 100),
      dankrate: Math.floor(Math.random() * 100),
      dick: Math.floor(Math.random() * 13),
      wins: {
        ttt: 0,
        unscram: 0,
        typerace: 0,
        blackjack: 0,
      },
    },
    currency: {
      wallet: 500,
      bank: 0,
      lastUsed: null,
      booster: false,
      weeklyLastUsed: null,
      streak: 0,
    },
    inv: {},
    avatar: user.displayAvatarURL(),
    username: user.username,
    blacklisted: false,
  };
};

module.exports = User;
