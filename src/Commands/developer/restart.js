module.exports = class Test extends require("../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "restart",
      category: "developer",
      developer: true,
      description: "Restart the bot.",
      aliases: ["r", "kys"],
    });
  }
  run() {
    setTimeout(() => {
      process.kill(0);
    }, 500);
    return "Restarting...";
  }
};
