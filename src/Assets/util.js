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
const getTime = () => {
  var currentdate = new Date();
  var time =
    currentdate.getDate() +
    "/" +
    (currentdate.getMonth() + 1) +
    "/" +
    currentdate.getFullYear() +
    " " +
    currentdate.getHours() +
    ":" +
    currentdate.getMinutes() +
    ":" +
    currentdate.getSeconds();
  return time;
};
const figlet = require("figlet");
module.exports = {
  Levels,
  Tips: [
    "Want to help support xCubed? Visit <https://patreon.com/Olykir> to help us keep your favorite bot online!",
    "Want to get some boosts on XP and currency? Become a patreon! <https://patreon.com/Olykir>",
  ],
  FormatNumber: (number) => {
    return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  },
  GiveCoins: async (userID, amount, userDB) => {
    var {
      currency: { wallet },
    } = await userDB.findOne({ _id: userID });
    await userDB.updateOne(
      { _id: userID },
      { $set: { "currency.wallet": wallet + amount } }
    );
  },
  logger: {
    error: (s) => {
      console.log(`\u001b[31m[${getTime()} - Error] ||\u001b[39m ${s}`);
    },
    info: (s) => {
      console.log(`\u001b[36m[${getTime()} - Info]  ||\u001b[39m ${s}`);
    },
    debug: (s) => {
      console.log(`\u001b[33m[${getTime()} - Debug] ||\u001b[39m ${s}`);
    },
  },
};
