const fs = require("fs");
const path = require("path");

const cookieParser = require("cookie-parser");
const createError = require("http-errors");
const express = require("express");
const helmet = require("helmet");
const NodeCache = require("node-cache");
const md = require('markdown-it')();

const { httpErrorMiddleware } = require("./middleware");
const routes = require("./routes");

const app = express();
const cache = new NodeCache({stdTTL: 100, checkperiod: 120});

app.use(helmet()); // https://expressjs.com/en/advanced/best-practice-security.html#use-helmet
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());

app.use("/", routes);

// render RENDER.md file as html for home page
app.get("/", (_req, res) => {
    let readme = cache.get("readme");
    if (!readme) {
        readme = fs.readFileSync(path.join(__dirname, "../RENDER.md")).toString();
    }
    cache.set("readme", readme, 120);
    res.set('Content-Type', 'text/html;charset=utf-8')
    res.send(`<div>${md.render(readme)}</div>`)
})


// catch 404 and forward to error handler
app.use((_req, _res, next) => {
    next(createError.NotFound());
});

// pass any errors to the error handler
app.use(httpErrorMiddleware);

module.exports = app;