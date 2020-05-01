const express = require("express");
const routes = require("./routes")
module.exports = (bot) => {
    const app = express();
    app.set("view engine", "ejs");
    app.set("views", `${__dirname}/views`);
    app.use("/assets", express.static(`${__dirname}/assets`));
    routes.call(this, app, bot);
    app.listen(80);
    
}