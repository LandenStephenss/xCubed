const {
    createCanvas,
    loadImage
} = require("canvas")
class Level extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "level",
            description: "View your current level!",
            category: "levels",
            botPerms: ["SEND_FILES"],
            usage: "{c} `<user>`",
            aliases: ["rank"]
        })
        this.levels = require("../../Assets/Configs/Levels");
        this.callback = async ({
            message
        }) => {
            const member = message.mentions.members.first() || message.member;
            const {levels: {level, xp, booster}} = await this.client.userDB.findOne({
                "_id": member.user.id
            })
            const canvas = createCanvas(800, 256);
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = member.displayHexColor === "#000000" ? "#877EEB" : member.displayHexColor
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#23272A"
            ctx.fillRect(8, 8, canvas.width - 16, canvas.height - 16);
            ctx.font = "52px Sans";
            ctx.fillStyle = "white";
            ctx.fillText(member.user.tag, 250, 90);
            ctx.font = "42px Sans";
            ctx.fillText(`Level: ${level}`, 250, 140)
            ctx.fillStyle = "#b0b5b0";
            ctx.fillRect(250, 160, 500, 20);
            ctx.fillStyle = "#31b531";
            ctx.fillRect(250, 160, parseInt((xp / this.levels.find((f) => f.level === level + 1).xp).toString().slice(2, 4)) * 5, 20)
            ctx.font = "32px Sans";
            ctx.fillStyle = "white";
            ctx.fillText(`${xp}/${this.levels.find((f) => f.level === level + 1).xp}`, 650 - (`${xp}/${this.levels.find((f) => f.level === level + 1).xp}`.length * 11), 220);
            ctx.beginPath()
            ctx.arc(125, 125, 100, 0, Math.PI * 2, true)
            ctx.closePath()
            ctx.clip();
            ctx.drawImage((await loadImage(`https://cdn.discordapp.com/avatars/${member.id}/${member.user.avatar}.png?size=512`)), 25, 25, 200, 200)


            return {
                files: [{
                    attachment: canvas.toBuffer('image/png'),
                    name: `${member.id}.png`
                }]
            }


        }
    }
}

module.exports = Level;