class Invite extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "invite",
            category: "information",
            description: "Get an invite link for the bot!"
        })
        this.callback = () => {
            return `<https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=469822503>`
        }
    }
}

module.exports = Invite;