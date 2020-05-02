const { exec } = require('child_process');
const { readdir } = require('fs');

class Update extends require('../../Assets/Structures/Commands/GenericCommand') {
	constructor(client) {
		super(client, {
			developer: true,
			name: 'update',
			aliases: ['u'],
			description: 'Update the bot remotely',
			usage: '{c}',
			category: 'developer'
		});
		this.loadCommand = (file) => {
			if (file.includes('.json')) return;
			if (!file.includes('.js')) {
				readdir(`./src/Commands/${file}`, (err, files) => {
					files.forEach((command) => {
						this.loadCommand(`/${file}/${command}`);
					});
				});
			} else {
				delete require.cache[require.resolve('../../Commands' + file)];
				const Command = new(require('../../Commands' + file))(this.client);
				if(!Command.config.enabled) return;
				this.client.commands.set(Command.help.name, Command);
				Command.config.aliases.forEach((alias) => {
					this.client.aliases.set(alias, Command.help.name);
				});
			}
		};
		this.callback = () => {
			exec('git pull', {
				cwd: __dirname
			}, (err, stdout, stderr) => {
				if(err) {
					console.error(err);
					return 'Check the console!';
				} else {
					this.client.commands.sweep((f) => f);
					readdir('./src/commands', (err, files) => {
						files.forEach((f) => {
							this.loadCommand(f);
						});
					});
				}
			});
			return 'Updated!';
		};
	}
}

module.exports = Update;