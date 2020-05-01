const Levels = new Array().concat({
    level: 0,
    xp: 1000
})

for (var i = 0; i < 100; i++) {
    Levels.push({
        level: i + 1,
        xp: Math.floor(Levels[i].xp * 1.35)
    })
}
module.exports = Levels
// test test test