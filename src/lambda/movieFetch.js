require("dotenv").config();

const axios = require("axios");

const movieDbApiRootUrl = "https://api.themoviedb.org/3";
const movieDbApiKey = process.env.movieDbApiKey;

function getAllPagesRecursive(url, movies, resolve, reject) {
  url = url.replace("&page=d+", "");

  axios
    .get(url)
    .then(response => {
      const fetchedMovies = movies.concat(response.data.results);
      if (response.data.total_pages > response.data.page) {
        getAllPagesRecursive(
          url + `&page=${response.data.page + 1}`,
          fetchedMovies,
          resolve,
          reject
        );
      } else {
        resolve(fetchedMovies);
      }
    })
    .catch(err => {
      reject(err);
    });
}

exports.handler = (event, context, callback) => {
  const { httpMethod } = event;

  const current = new Date();
  current.setDate(current.getDate() - 14);
  const from = current.toISOString().substr(0, 10);
  current.setDate(current.getDate() + 35);
  const to = current.toISOString().substr(0, 10);

  if (httpMethod === "GET") {
    new Promise((resolve, reject) => {
      getAllPagesRecursive(
        `${movieDbApiRootUrl}/discover/movie?api_key=${movieDbApiKey}&language=en-US` +
          `&sort_by=primary_release_date.desc&include_adult=false` +
          `&primary_release_date.gte=${from}&primary_release_date.lte=${to}&vote_count.gte=10`,
        [],
        resolve,
        reject
      );
    })
      .then(res => {
        callback(null, {
          statusCode: 200,
          body: JSON.stringify(res)
        });
      })
      .catch(err => {
        callback(err);
      });
  }
};
