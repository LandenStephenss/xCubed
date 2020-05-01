class Buy extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "buy",
            category: "currency",
            description: "Buy something from the shop"
        })
        this.callback = ({message, args}) => {
            const shopcmd = this.client.commands.get("shop");
            return shopcmd.callback({message, args: ["buy", args[0]]})
        }
    }
}

module.exports = Buy;