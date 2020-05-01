const Command = require("../../../Assets/Structures/Commands/GenericCommand");
class Clap extends Command {
    constructor(client) {
        super(client, {
            name: "clap",
            aliases: ["👏"],
            description: "You can now talk like this with ease".split(" ").join(" 👏 "),
            category: "fun",
            usage: "{c} `<args>`"
        })
        this.callback = ({
            args
        }) => {
            return args.join(" 👏 ") + " 👏";
        }
    };
}
module.exports = Clap;