const axios = require("axios");

module.exports = (req, res) => {
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
  axios({
    method: "GET",
    url: "https://yts-am-torrent.p.rapidapi.com/list_movies.json",
    headers: {
      "content-type": "application/octet-stream",
      "x-rapidapi-host": "yts-am-torrent.p.rapidapi.com",
      "x-rapidapi-key": "e3f3918094mshd9ac32aa0744d2fp141a50jsnbeafa4d56abe",
    },
    params: {
      query_term: id,
    },
  })
    .then((response) => {
      if (response.data) {
        res.json(response.data);
      } else {
        res.send(response);
      }
    })
    .catch((error) => {
      console.log(error);
      res.send(error);
    });
};
