module.exports = class Level extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "leaderboard",
      category: "levels",
      description: "View the guilds leaderboard",
      usage: "{c}",
    });
  }
  async run({ message: { guild }, client }) {
    var fields = [];

    const a = await client.userDB.find().toArray();
    const b = a.filter((user) => guild.members.cache.has(user._id));
    const c = b.sort((d, e) => e.levels.xp - d.levels.xp).splice(0, 10);
    for (const f of c) {
      if (f.levels.xp === 0) return;
      if (f._id === c[0]._id) {
        fields.push({
          name: `🏆 ${await client.users.cache.get(f._id).username}`,
          value: `${f.levels.xp} XP`,
        });
      } else {
        fields.push({
          name: `${await client.users.cache.get(f._id).username}`,
          value: `${f.levels.xp} XP`,
        });
      }
    }
    return {
      embed: {
        author: {
          icon_url: guild.iconURL(),
          name: `${guild.name}'s Leaderboard`,
        },
        color: parseInt("877EEB", 16),
        fields,
      },
    };
  }
};
