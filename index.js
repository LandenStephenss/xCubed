const Client = require('./src/Assets/Structures/Client');
const xCubed = new Client();

const {
	readdir
} = require('fs');
xCubed.login(xCubed.config.token);
readdir('./src/Assets/Events', (err, files) => {
	files.forEach((file) => {
		const eventName = file.split('.')[0];
		const event = new(require('./src/Assets/Events/' + file))(xCubed);
		xCubed.on(eventName, (...args) => {
			event.run(...args);
		});
	});
});

const loadCommand = (file) => {
	if (file.includes('.json')) return;
	if (!file.includes('.js')) {
		readdir(`./src/Commands/${file}`, (err, files) => {
			files.forEach((command) => {
				loadCommand(`/${file}/${command}`);
			});
		});
	} else {
		try {
			const Command = new(require('./src/Commands' + file))(xCubed);
			if(!Command.config.enabled) return;
			xCubed.commands.set(Command.help.name, Command);
			Command.config.aliases.forEach((alias) => {
				xCubed.aliases.set(alias, Command.help.name);
			});
			console.log(`\u001b[32m ${Command.help.name} loaded successfully\u001b[39m`)
		} catch(e) {
			console.log(`\u001b[31m There was a problem loading ${file.split(".js")[0].split("/")[file.split(".js")[0].split("/").length - 1]}\u001b[39m`)
		}
		
	}
};

readdir('./src/Commands', (err, files) => {
	files.forEach((file) => {
		loadCommand(file);
	});
});


// going to make an api for things such as commands eventually