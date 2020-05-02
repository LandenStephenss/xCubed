class Disable extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            developer: true,
            name: "disable",
            description: "Disable a command",
            usage: "{c} <command>",
            category: "developer"
        })
        this.callback = ({
            args
        }) => {
            if (!args[0]) return "Please specify a command!"
            if (!this.client.commands.has(args[0].toLowerCase())) return "No commmand found!"
            const command = this.client.commands.get(args[0].toLowerCase()) || this.client.commands.get(this.client.aliases.get(args[0].toLowerCase()))
            if (command.config.enabled) {
                command.config.enabled = false;
                return `\`${command.help.name}\` has been disabled`
            } else {
                return `\`${command.help.name}\` is already disabled`
            }
        }
    }
}

module.exports = Disable