const fs = require("fs");
const yifysubtitles = require("yifysubtitles");

module.exports = async (req, res) => {
  let id = req.query.id;
  let language = req.query.lang;
  console.log({ id, language });
  const results = await yifysubtitles(id, {
    path: "/tmp/",
    langs: [language],
  }).then((res) => {
    console.log(res);
    return res;
  });

  let shortLang = results[0].langShort;
  let lang = results[0].lang;
  let path = results[0].path;
  console.log(path);
  fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
    if (!err) {
      res.writeHead(200, { "Content-Type": "text/vtt" });
      res.write(data);
      res.end();
    } else {
      console.log(err);
    }
  });
};
