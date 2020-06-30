const fetch = require("node-fetch");
const { FormatNumber } = require("../../../Assets/util");
module.exports = class OSUUser extends require("../../../Stuctures/Commands/GenericCommand") {
  constructor() {
    super({
      name: "osuuser",
      category: "information",
      usage: "{c} `<osuName>`",
      description: "View some stats on an osu! player",
      enabled: true,
      botPerms: ["EMBED_LINKS"]
    });
  }
  async run({ message, args, client }) {
    const res = await fetch(
      `https://osu.ppy.sh/api/get_user?k=${client.config.osuKey}&u=${args[0]}`
    ).then((r) => r.json());
    if (res.length === 0) return `User \`${args[0]}\` not found!`;
    return {
      embed: {
        author: {
          icon_url: `https://osu.ppy.sh/a/${res[0].user_id}`,
          name: `osu! Stats for ${res[0].username}`,
        },
        fields: [
          {
            name: "Performance Points:",
            value: FormatNumber(Math.floor(res[0].pp_raw)) + "pp",
            inline: true,
          },
          {
            name: "Accuracy:",
            value: parseFloat(res[0].accuracy).toFixed(2) + "%",
            inline: true,
          },
          {
            name: "Level:",
            value: Math.floor(res[0].level),
            inline: true,
          },
          {
            name: "Rank:",
            value: "#" + FormatNumber(res[0].pp_rank),
            inline: true,
          },
        ],
        color: 8879851,
      },
    };
  }
};
