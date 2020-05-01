class GuildBanAdd {
    constructor(client) {
        this.client = client;
    }
    run(guild, user) {
        // TODO; maybe, might add to the modlog in the command itself; although i could add a check here to make sure that it is in the guilds modlog just incase, even though this event will probably be triggered before the modlog is added
    }
}

module.exports = GuildBanAdd;