require("dotenv").config();

const axios = require("axios");

const movieDbApiRootUrl = "https://api.themoviedb.org/3";
const movieDbApiKey = process.env.movieDbApiKey;

exports.handler = (event, context, callback) => {
  const { httpMethod } = event;

  if (httpMethod === "GET") {
    axios
      .get(`${movieDbApiRootUrl}/movie/latest?api_key=${movieDbApiKey}`, {
        "content-type": "application/json"
      })
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res.data)
        });
      })
      .catch(err => {
        callback(err);
      });
  }
};