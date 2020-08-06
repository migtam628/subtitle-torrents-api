const express = require("express");
const app = express();
const fs = require("fs");
const yifysubtitles = require("yifysubtitles");

app.get("/subtitle-search", async (req, res) => {
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
});

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.set({
//     "Content-Type": "text/vtt",
//     "Access-Control-Allow-Origin": "*",
//   });
//   next();
// });

// app.get("/search", async (req, res) => {
//   let id = req.query.id;
//   let language = req.query.lang;
//   console.log(id, language);
//   // let results = search(id, language).then((res) => {
//   //   return res
//   // })
//   // async function search(id, language) {
//   const results = await yifysubtitles(id, {
//     path: "/tmp",
//     // langs: ['ar', 'zh', 'en', 'fr', 'de', 'he', 'it', 'ja', 'pt', 'ru', 'es'],
//     langs: [language],
//   })
//     .then((res) => {
//       return res;
//     })
//     .then((res) => {
//       return res;
//     });
//   console.log(results);
//   let shortLang = results[0].langShort;
//   let lang = results[0].lang;
//   let path = results[0].path;
//   console.log(path);
//   fs.readFile(path, { encoding: "utf-8" }, (err, data) => {
//     if (!err) {
//       res.writeHead(200, { "Content-Type": "application/json" });
//       res.write(data);
//       res.end();
//     } else {
//       console.log(err);
//     }
//   });
//   // res.send(file)
//   // }
// });

app.listen(5000);
module.exports = app;
