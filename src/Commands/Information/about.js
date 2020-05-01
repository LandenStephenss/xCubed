class About extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "about",
            description: "View some information about the bot",
            category: "information",
            botPerms: ["EMBED_LINKS"]
        })
        this.callback = () => {
            return {
                embed: {
                    title: `About ${this.client.user.username}`,
                    color: parseInt("877EEB", 16),
                    description: `${this.client.user.username} is a multipurpose discord bot with commands to suit any servers needs! Some examples of commands are \`x!leaderboard\`, \`x!balance\`, and \`x!clap\`\n\n**Links**:\n[Website](https://xcubed.xyz)\n[Support](https://discord.gg/kQUpSgw)\n[Patreon](https://www.patreon.com/Olykir)`
                }
            }
        }
    }
}

module.exports = About;