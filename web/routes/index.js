const CookieParser = require("cookie-parser")
module.exports = (app, bot) => {
    // Actual webpages
    app.get("/", async (req, res) => {
        res.render("landing.ejs", {
            bot
        })
    })
    app.get("/commands", async(req, res) => {
        var filter = req.query.filter;
        res.render("commands.ejs", {
            bot,
            filter
        })
    })
    app.get("/team", async(req, res) => {
        res.render("team.ejs", {
            bot
        })
    })

    app.get("/leaderboard", async(req, res) => {
        if(req.query.id === undefined || await bot.guildDB.countDocuments({"_id": req.query.id}, {limit: 1}).then(res=> res === 0)) {
            res.redirect("/")
        }  else {
            var serverID = req.query.id;
            const arrayOfDB = await bot.userDB.find().toArray();
            const DBinGuild = arrayOfDB.filter((user) => bot.guilds.cache.get(serverID).members.cache.has(user._id));
            const SortedLB = DBinGuild.sort((a, b) => b.levels.xp - a.levels.xp).slice(0, 101)
            res.render("leaderboard.ejs", {
                bot,
                SortedLB,
                levels: require("../../src/Assets/Configs/Levels"),
                serverID
            })
        }
    })
}