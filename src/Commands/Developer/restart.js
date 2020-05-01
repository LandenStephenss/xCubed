class Restart extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "restart",
            description: "Restart the bot **Owner Only**",
            developer: true,
            aliases: ["reboot"],
            category: "developer"
        })
        this.callback = () => {
            setTimeout(() => process.kill(0), 400)
            return "Restarting..."
        }
    }
}

module.exports = Restart;