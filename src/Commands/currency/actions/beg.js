var Cooldown = new Set();
const JSONS = require("../../../Assets/jsons/beg.json");
module.exports = class Beg extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "beg",
      description: "Beg for some coins",
      category: "currency",
    });
  }
  async run({ message: { author }, client }) {
    const {
      currency: { wallet },
    } = await client.userDB.findOne({ _id: author.id });
    if (Cooldown.has(author.id)) {
      return "You can't use this command yet!";
    } else {
      Cooldown.add(author.id);
      var Coins = Math.floor(Math.random() * 100);
      setTimeout(() => {
        Cooldown.delete(author.id);
      }, 30000);
      await client.userDB.updateOne(
        { _id: author.id },
        { $set: { "currency.wallet": wallet + Coins } }
      );
      return JSONS[Math.floor(Math.random() * JSONS.length)].replace(
        "{coins}",
        `**${Coins}**`
      );
    }
  }
};
