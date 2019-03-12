const express = require('express');
const morgan = require("morgan");
const got = require("got");
const app = express();
app.use(morgan("short"));
app.use(express.static(__dirname + "/../public"));

require("dotenv").config();
const binpath = process.env.BINPATH === undefined ? "" : process.env.BINPATH;

const u = require("./u/u.js");
const buster = require("./buster.js");

const moment = require("moment");

app.get('/api/buster', (req, res) => {
    try {
        const text = req.query.text;
        const shuffle = req.query.shuffle;
        const ret = buster.buster(text, shuffle);
        res.send({
            anagrams: ret,
        });
    } catch (err) {
        // let output = [];
        // for (let o of err.output) {
        //     if (o !== null && "data" in o) {
        //         const v = new Buffer(o.data)
        //         output.push(v.toString());
        //     }
        // }
        // res.send({ err: err, output: output, cnt: err.output.length });
        console.log(err);
        res.send({
            err: err
        });
    }
});

app.get("/api/lastupdated/", async (req, res) => {
    let result = await got("https://registry.hub.docker.com/v2/repositories/cranpun/", {
        json: true
    });
    for (let r of result.body.results) {
        if (r.name === "anagrambuster") {
            const mom = moment(r.last_updated);
            const str = mom.format("YYYY-MM-DD HH:mm:ss");
            res.send({ last_updated: str });
            return;
        }
    }
    res.send({ error: "not found updated" });
});

const server = app.listen(80, () => console.log('listening on port 80!'),
    () => {
        console.log("PORT: %d", server.address().port);
    }
);
