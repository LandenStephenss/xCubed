const Client = require("./src/Stuctures/Client.js");
const xCubed = new Client();
const { readdir } = require("fs");
xCubed.init();

const loadCommand = (file) => {
  if (file.includes(".json")) return;
  if (!file.includes(".js")) {
    readdir(`./src/Commands/${file}`, (err, files) => {
      files.forEach((command) => {
        loadCommand(`/${file}/${command}`);
      });
    });
  } else {
    if(file.includes("asset.")) return;
    try {
      const Command = new (require("./src/Commands/" + file))();
      xCubed.commands.set(Command.help.name, Command);
      Command.config.aliases.forEach((alias) => {
        xCubed.aliases.set(alias, Command.help.name);
      });
      console.log(
        `\u001b[38;5;33mCommand \u001b[31m${Command.help.name}\u001b[38;5;33m loaded successfully\u001b[39m`
      );
    } catch (e) {
      console.log(e);
      console.error(
        `\u001b[31mThere was a problem loading command ${
          file.split(".js")[0].split("/")[
            file.split(".js")[0].split("/").length - 1
          ]
        }\u001b[39m\n${e}`
      );
    }
  }
};

readdir("./src/Commands", (err, files) => {
  files.forEach((file) => {
    loadCommand(file);
  });
});

readdir("./src/Events", (err, files) => {
  files.forEach((file) => {
    const eventName = file.split(".")[0];
    const event = new (require("./src/Events/" + file))(xCubed);
    xCubed.on(eventName, (...args) => {
      event.run(...args);
    });
  });
});
xCubed.login(xCubed.config.token);
