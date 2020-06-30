const Levels = new Array().concat({
  level: 0,
  xp: 1000,
});

for (var i = 0; i < 100; i++) {
  Levels.push({
    level: i + 1,
    xp: Math.floor(Levels[i].xp * 1.35),
  });
}
module.exports = {
  Levels,
  Tips: [
    "Want to help support xCubed? Visit <https://patreon.com/Olykir> to help us keep your favorite bot online!",
    "Want to get some boosts on XP and currency? Become a patreon! <https://patreon.com/Olykir>",
  ],
  FormatNumber: (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  },
};
