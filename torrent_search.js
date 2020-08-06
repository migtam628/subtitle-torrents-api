const TorrentSearchApi = require("torrent-search-api");

module.exports = async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.set({
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  });

  let id = req.query.id;
  let query = req.query.title;
  let type = req.query.type;
  let quality = req.query.quality;
  let season = req.query.s;
  let episode = req.query.e;
  let on = true;

  TorrentSearchApi.enablePublicProviders();
  //   TorrentSearchApi.enableProvider("1337x");
  await searchTorrent(on, type, query, quality, res);
};
async function searchTorrent(on, type, query, quality, res) {
  if (on) {
    console.log("processing");
    if (type === "Movies") {
      const torrents = await TorrentSearchApi.search(
        ["1337x"],
        query,
        type,
        40
      );
      torrents.map(async (torrent) => {
        if (torrent.title.toLowerCase().includes(query.toLowerCase())) {
          if (torrent.title.toLowerCase().includes(quality)) {
            const magnet = await TorrentSearchApi.getMagnet(torrent);
            res.status(200).json({
              result: magnet,
              torrent: torrent,
              all_results: torrents,
            });
          } else {
            const magnet = await TorrentSearchApi.getMagnet(torrent);
            res.status(200).json({
              result: magnet,
              torrent: torrent,
              all_results: torrents,
            });
          }
        } else {
          res.status(404).json({ message: "Nothing was found." });
        }
      });
    }
    if (type === "TV") {
      const torrents = await TorrentSearchApi.search(
        ["1337x"],
        query,
        type,
        40
      );
      torrents.map((torrent) => {
        if (torrent.title.toLowerCase().includes(query.toLowerCase())) {
          res.status(200).json({ result: torrent, all_results: torrents });
        } else {
          res.status(404).json({ message: "Nothing was found." });
        }
      });
    }
    if (type === "All") {
      const torrents = await TorrentSearchApi.search(
        ["1337x"],
        query,
        type,
        40
      );
      torrents.map((torrent) => {
        if (torrent.title.toLowerCase().includes(query.toLowerCase())) {
          res.status(200).json({ result: torrent, all_results: torrents });
        } else {
          res.status(404).json({ message: "Nothing was found." });
        }
      });
    }
  } else {
    res
      .status(400)
      .json({ message: "query, id, or/and type are missing from url" });
  }
}
