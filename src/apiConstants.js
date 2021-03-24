require("dotenv").config();

export const movieDbApiKey = process.env.movieDbApiKey;
export const movieDbApiRootUrl = "https://api.themoviedb.org/3";
export const movieDbApiImageBaseUrl = "https://image.tmdb.org/t/p/w780";
export const netlifyAllMoviesFetchUrl = ".netlify/functions/movieFetch";
export const netlifyMovieDetailsFetchUrl = ".netlify/functions/movieDetailsFetch";
