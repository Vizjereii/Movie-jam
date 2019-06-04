require("dotenv").config();

const axios = require("axios");

const movieDbApiRootUrl = "https://api.themoviedb.org/3";
const movieDbApiKey = process.env.movieDbApiKey;

exports.handler = (event, context, callback) => {
  const { httpMethod } = event;

  const current = new Date();
  current.setDate(current.getDate() - 14);
  const from = current.toISOString().substr(0, 10);
  current.setDate(current.getDate() + 35);
  const to = current.toISOString().substr(0, 10);

  if (httpMethod === "GET") {
    axios
      .get(
        `${movieDbApiRootUrl}/discover/movie?api_key=${movieDbApiKey}&language=en-US` +
          `&sort_by=primary_release_date.desc&include_adult=false&page=1` +
          `&primary_release_date.gte=${from}&primary_release_date.lte=${to}&vote_count.gte=10`,
        {
          "content-type": "application/json"
        }
      )
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
