class Steal extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "steal",
            description: "Steal some coins from a player!",
            category: "currency",
            aliases: ["rob"]
        })

        this.callback = async ({
            args,
            message
        }) => {
            const member = message.mentions.members.first();

            const userBal = await this.client.userDB.findOne({"_id": message.author.id})
            
            if(userBal.currency.wallet < 250) {
                return "You must have atleast 250 coins in your wallet to rob somebody!"
            } else if(!member) {
                return "Please mention a user to steal coins from!"
            } else if(member.id === message.author.id) {
                return "You can't rob yourself!"
            } else {
                const memberBal = await this.client.userDB.findOne({"_id": member.id})
                if(memberBal < 250) {
                    return "That user does not have enough coins in their wallet!"
                } else {
                    var rand = Math.floor(Math.random() * 100) > 50
                    var amountOwe = Math.floor(Math.random() * 200)
                  //  if(member.id === message.author.id) return "You can't steal from yourself!"
                    if(memberBal.inv.padLock > 0) {
                        await this.client.userDB.updateOne({"_id": message.author.id}, {$set: {"currency.wallet": userBal.currency.wallet - amountOwe}})
                        await this.client.userDB.updateOne({"_id": member.id}, {$set: {"inv.padLock": memberBal.inv.padLock - 1, "currency.wallet": memberBal.currency.wallet + amountOwe}})
                        return `${member.user.tag} had a padlock and you now owe them ${amountOwe} coins!`
                    }
                    if(rand) {
                        var amountStole = Math.floor(Math.random() * 200)
                        await this.client.userDB.updateOne({"_id": message.author.id}, {$set: {"currency.wallet": userBal.currency.wallet + amountStole}})
                        await this.client.userDB.updateOne({"_id": member.id}, {$set: {"currency.wallet": memberBal.currency.wallet - amountStole}})
                        return `You stole ${amountStole} coins from **${member.user.tag}**`
                    } else {
                        await this.client.userDB.updateOne({"_id": message.author.id}, {$set: {"currency.wallet": userBal.currency.wallet - amountOwe}})
                        await this.client.userDB.updateOne({"_id": member.id}, {$set: {"currency.wallet": memberBal.currency.wallet + amountOwe}})
                        return `You were caught trying to steal from **${member.user.tag}** and owe them ${amountOwe} coins`
                    }

                }
            }
        } 
    }
}

module.exports = Steal;