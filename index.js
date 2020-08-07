const Client = require("./src/Stuctures/Client.js");
const xCubed = new Client();
const { readdir } = require("fs");
xCubed.init();

readdir("./src/Commands", (err, files) => {
  files.forEach((file) => {
    xCubed.loadCommand(file);
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
