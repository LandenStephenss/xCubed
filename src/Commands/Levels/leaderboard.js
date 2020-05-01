class Leaderboard extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "leaderboard",
            category: "levels",
            description: "View the guild leaderboard",
            aliases: ["lb", "top10"]
        })
        this.callback = async ({
            message
        }) => {
            const embed =  {
                    author: {
                        icon_url: message.guild.iconURL({
                            format: "png"
                        }),
                        name: `${message.guild.name} Leaderboard`,
                        url: `https://xcubed.xyz/leaderboard?id=${message.guild.id}`
                    },
                    color: parseInt("877EEB", 16),
                    fields: []
                }
            

            const arrayOfDB = await this.client.userDB.find().toArray();
            const DBinGuild = arrayOfDB.filter((user) => message.guild.members.cache.has(user._id));
            const SortedLB = DBinGuild.sort((a, b) => b.levels.xp - a.levels.xp).slice(0, 10)
            for (const data of SortedLB) {
                if (data.levels.xp == 0) {

                } else
                if (data._id == SortedLB[0]._id) {
                    embed.fields.push({
                        name: `🏆 ${await this.client.users.cache.get(data._id).username}`,
                        value: `${data.levels.xp} XP`
                    })
                } else {
                    embed.fields.push({
                        name: `${await this.client.users.cache.get(data._id).username}`,
                        value: `${data.levels.xp} XP`
                    })
                }
            }
            return {embed, content: `View the full leaderboard at https://xcubed.xyz/leaderboard?id=${message.guild.id}`};
        }
    }
}
module.exports = Leaderboard