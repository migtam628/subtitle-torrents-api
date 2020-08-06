var express = require('express')
var fs = require('fs')
var app = express()
var yifysubtitles = require('yifysubtitles')
var functions = require('firebase-functions')
var port = 5000;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set({
    'Content-Type': 'text/vtt',
    'Access-Control-Allow-Origin': '*'
  })
  next()
})

app.get('/', (req, res) => {
  let id = req.query.id
  let language = req.query.language
  console.log(language)
  let results = search(id, language).then((res) => {
    return res
  })
  async function search(id, language) {
    const results = await yifysubtitles(id, {
      path: '/tmp/',
      // langs: ['ar', 'zh', 'en', 'fr', 'de', 'he', 'it', 'ja', 'pt', 'ru', 'es'],
      langs: [language],
    })
      .then((res) => {
        return res
      })
      .then((res) => {
        return res
      })
    let shortLang = results[0].langShort
    let lang = results[0].lang
    let path = results[0].path

    fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
      if (!err) {
        res.writeHead(200, { 'Content-Type': 'text/vtt' })
        res.write(data)
        res.end()
      } else {
        console.log(err)
      }
    })
  }
})

app.listen(port)


