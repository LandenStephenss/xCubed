const fetch = require("node-fetch")
const FormatNumber = require("../../Assets/Util/FormatNumber")
class Cov extends require("../../Assets/Structures/Commands/GenericCommand") {
    constructor(client) {
        super(client, {
            name: "covid",
            aliases: ["cov", "covid-19"],
            description: "View COVID-19 statistics for countries",
            usage: "{c} `<country>`",
            category: "information"
        })
        this.callback = async ({
            args
        }) => {
            if (args[0]) {
                const result = await fetch("https://corona.lmao.ninja/v2/countries/" + args.join("%20").toLowerCase()).then((res) => res.json());
                if(!result.message === "Country not found or doesn't have any cases" || result.message === undefined) {
                    return {
                        embed: {
                            color: parseInt("877EEB", 16),
                            title: `COVID-19 Statistics for ${result.country}`,
                            fields: [{
                                    name: "Total Cases",
                                    value: FormatNumber(result.cases),
                                    inline: true
                                }, {
                                    name: "Cases Today",
                                    value: FormatNumber(result.todayCases),
                                    inline: true,
                                }, {
                                    name: "Total Deaths",
                                    value: FormatNumber(result.deaths),
                                    inline: true,
                                }, {
                                    name: "Deaths Today",
                                    value: FormatNumber(result.todayDeaths),
                                    inline: true
                                },
                                {
                                    name: "Cases Recovered",
                                    value: FormatNumber(result.recovered),
                                    inline: true
                                }
                            ]
                        }
                    }
                } else {
                    return {
                        embed: {
                            color: parseInt("877EEB", 16),
                            title: `\`${args.join(" ")}\` not found!`
                        }
                    }                    
                }             
            } else {
                const result = await fetch("https://corona.lmao.ninja/v2/all").then((res) => res.json())
                return {
                    embed: {
                        color: parseInt("877EEB", 16),
                        title: "COVID-19 Global Statistics",
                        fields: [{
                            name: "Total Cases",
                            value: FormatNumber(result.cases),
                            inline: true
                        }, {
                            name: "Total Deaths",
                            value: FormatNumber(result.deaths),
                            inline: true
                        }, {
                            name: "Total Recovered",
                            value: FormatNumber(result.recovered),
                            inline: true
                        }],
                    }
                }
            }
        }
    }
}

module.exports = Cov