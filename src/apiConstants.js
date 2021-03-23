require("dotenv").config();

export const movieDbApiKey = process.env.movieDbApiKey;
export const movieDbApiRootUrl = "https://api.themoviedb.org/3";
export const netlifyAllMoviesFetchUrl = ".netlify/functions/movieFetch";
