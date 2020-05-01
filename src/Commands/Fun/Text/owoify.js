const faces = ['(・`ω´・)', ';;w;;', 'OwO', 'UwU', '>w<', '^w^']
const owo = (text) => {
    return text
        .replace(/(?:r|l)/g, 'w')
        .replace(/(?:R|L)/g, 'W')
        .replace(/n([aeiou])/g, 'ny$1')
        .replace(/N([aeiou])/g, 'Ny$1')
        .replace(/N([AEIOU])/g, 'NY$1')
        .replace(/ove/g, 'uv')
        .replace(/!+/g, ` ${faces[Math.floor(Math.random() * faces.length)]} `)
        .trim();
}
class OwOify extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "owoify",
            description: owo("OwOify your text!"),
            usage: "{c} `<text>`",
            category: "fun",
            aliases: ["owo"]
        })

        this.callback = ({
            args
        }) => {
            if (!args[0]) {
                return "Please give some text!"
            } else {
                return owo(args.join(" "))
            }
        }
    }
}

module.exports = OwOify;