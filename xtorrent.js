const Xtorrent = require("xtorrent");

global.torrent = {};
global.result = {};
global.magnet = "";

module.exports = (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  let title = req.query.title;
  let episode = req.query.e;
  let season = req.query.s;
  let quality = req.query.quality;
  let type = req.query.type;

  let query =
    (title ? title + " " : "") +
    (season ? "s" + season : "") +
    (episode ? "e" + episode + " " : "") +
    (quality ? quality : "");

  if (type === "Movies") {
    Xtorrent.search({ query: query, category: type }).then((Data) => {
      Xtorrent.info(Data.domain + Data.torrents[0].href).then((data) => {
        let globalmagnet = data.download.magnet;
        let globaltorrent = Data;
        let globalresult = Data.domain + Data.torrents[0].href;
        res.json({
          status: "ok",
          status_message: "Query was successful",
          data: {
            main_result: {
              query: query,
              torrent_url: globalresult,
              magnet: globalmagnet,
            },
            all_torrents: globaltorrent,
          },
        });
      });
    });
  } else if (type === "TV") {
    Xtorrent.search({ query: query, category: type }).then((Data) => {
      Xtorrent.info(Data.domain + Data.torrents[0].href).then((data) => {
        let globalmagnet = data.download.magnet;
        let globaltorrent = Data;
        let globalresult = Data.domain + Data.torrents[0].href;
        res.json({
          status: "ok",
          status_message: "Query was successful",
          data: {
            main_result: {
              query: query,
              torrent_url: globalresult,
              magnet: globalmagnet,
            },
            all_torrents: globaltorrent,
          },
        });
      });
      //   res.json({ query: query, tv_results: Data })
    });
  } else if (type === "Documentaries") {
    Xtorrent.search({ query: query, category: type }).then((Data) => {
      console.log(Data);
      res.json({
        status: "ok",
        status_message: "Query was successful",
        data: { query: query, docu_results: Data },
      });
    });
    res.json({
      status: "ok",
      status_message: "Query was successful",
      data: { query: query },
    });
  } else if (type === "Anime") {
    Xtorrent.search({ query: query, category: type }).then((Data) => {
      console.log(Data);
      res.json({
        status: "ok",
        status_message: "Query was successful",
        data: {
          status: "ok",
          status_message: "Query was successful",
          data: { query: query, anime_results: Data },
        },
      });
    });
    res.json({
      status: "ok",
      status_message: "Query was successful",
      data: { query: query },
    });
  }
};
