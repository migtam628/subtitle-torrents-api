const express = require("express");
const app = express();

app.get("/subtitle-search", require("./subtitle"));
app.get('/imdb-torrent-search', require("./imdb_torrent"));
app.get('/xtorrent', require("./xtorrent"));

app.listen(5000);

module.exports = app;
