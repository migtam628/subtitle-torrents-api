const express = require('express')
const fs = require('fs')
const subtitles = express()
const yifysubtitles = require('yifysubtitles')
const functions = require('firebase-functions')

subtitles.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.set({
    'Content-Type': 'text/vtt',
    'Access-Control-Allow-Origin': '*'
  })
  next()
})

subtitles.get('/', (req, res) => {
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

exports.subtitles = functions.https.onRequest(subtitles)

// subtitles.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', 'YOUR-DOMAIN.TLD') // update to match the domain you will make the request from
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept',
//   )
//   next()
// })

// subtitles.get('/', (req, res) => {
//   let id = req.query.id
//   let language = req.query.language
//   console.log(language)
//   let results = search(id, language).then((res) => {
//     return res
//   })
//   async function search(id, language) {
//     const results = await yifysubtitles(id, {
//       path: '/tmp/',
//       // langs: ['ar', 'zh', 'en', 'fr', 'de', 'he', 'it', 'ja', 'pt', 'ru', 'es'],
//       langs: [language],
//     })
//       .then((res) => {
//         return res
//       })
//       .then((res) => {
//         return res
//       })
//     let shortLang = results[0].langShort
//     let lang = results[0].lang
//     let path = results[0].path

//     fs.readFile(path, { encoding: 'utf-8' }, (err, data) => {
//       if (!err) {
//         res.writeHead(200, { 'Content-Type': 'application/json' })
//         res.write(data)
//         res.end()
//       } else {
//         console.log(err)
//       }
//     })
//     // res.send(file)
//   }
// })

