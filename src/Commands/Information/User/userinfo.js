const status = {
    online: "Online",
    idle: "Idle",
    dnd: "Do Not Disturb",
    offline: "Offline"
};
const types = [
    "Playing",
    "Steaming",
    "Listening to",
    "Watching",
    "Custom Status"
];
function checkDays(date) {
	let now = new Date();
	let diff = now.getTime() - date.getTime();
	let days = Math.floor(diff / 86400000);
	return days + (days == 1 ? " day" : " days") + " ago";
};
class UserInfo extends require("../../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "userinfo",
            description: "View some basic information about a user",
            category: "information",
            botPerms: ["EMBED_LINKS"]
        })
        this.callback = ({
            message,
            args
        }) => {
            const member = message.mentions.members.first() || message.member;
            var game;
            var playing = member.presence.status === "offline" || !member.presence.activities[0] ? "Playing" : member.presence.activities[0].name === "Custom Status" ? "Custom Status" : member.presence.activities[0].type.split("")[0] + member.presence.activities[0].type.slice(1).toLowerCase()
            return {
                embed: {
                    author: {
                        name: `${member.user.username} (${member.id})`,
                        icon_url: member.user.displayAvatarURL()
                    },
                    color: parseInt("877EEB", 16),
                    fields: [{
                            name: "Nickname",
                            value: member.nickname === null ? "None" : member.nickname,
                            inline: true
                        }, {
                            name: "Roles",
                            value: member.roles.cache.size,
                            inline: true
                        },
                        {
                            name: "Bot",
                            value: member.user.bot ? "Yes" : "No",
                            inline: true,
                        },
                        {
                            name: playing,
                            value: playing === "Custom Status" ? member.presence.activities[0].state : member.presence.activities[0].name,
                            inline: true
                        }, {
                            name: "Roles:",
                            value: member.roles.cache.size,
                            inline: true
                        }
                    ],
                    footer: {
                        text: `Joined ${checkDays(member.joinedAt)} || Created ${checkDays(member.user.createdAt)}`
                    },
                    thumbnail: {
                        url: member.user.displayAvatarURL()
                    }
                }
            }
        }
    }
}

module.exports = UserInfo;