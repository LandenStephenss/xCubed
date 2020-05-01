class Rich extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "rich",
            description: "View a leaderboard of money",
            botPerms: ["EMBED_LINKS"],
            category: "currency"
        })
        this.callback = async ({message}) => {
            const embed = {
                embed: {
                    author: {
                        icon_url: message.guild.iconURL({
                            format: "png"
                        }),
                        name: `${message.guild.name}'s Richest Users`,
                    },
                    color: parseInt("877EEB", 16),
                    fields: []
                }
            }

            const arrayOfDB = await this.client.userDB.find().toArray();
            const DBinGuild = arrayOfDB.filter((user) => message.guild.members.cache.has(user._id));
            const SortedLB = DBinGuild.sort((a, b) => b.currency.wallet - a.currency.wallet).slice(0, 5)
            for (const data of SortedLB) {
                if (data.currency.wallet == 0) {

                } else
                if (data._id == SortedLB[0]._id) {
                    embed.embed.fields.push({
                        name: `🏆 ${await this.client.users.cache.get(data._id).username}`,
                        value: `${data.currency.wallet}`
                    })
                } else {
                    embed.embed.fields.push({
                        name: `${await this.client.users.cache.get(data._id).username}`,
                        value: `${data.currency.wallet}`
                    })
                }
            }
            return embed;
        }
    }
}

module.exports = Rich;