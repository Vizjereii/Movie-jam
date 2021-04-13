require("dotenv").config();

export const movieDbApiKey = process.env.movieDbApiKey;
export const movieDbApiRootUrl = "https://api.themoviedb.org/3";
export const movieDbApiImageBaseUrl = "https://image.tmdb.org/t/p/w780";
export const movieDbApiImageHumanProfileUrl = "https://image.tmdb.org/t/p/w185";
export const movieDbApiImageHqUrl = "https://image.tmdb.org/t/p/original";
export const netlifyAllMoviesFetchUrl = ".netlify/functions/movieFetch";
export const netlifyMovieDetailsFetchUrl = ".netlify/functions/movieDetailsFetch";

export function getYouTubeEmbedUrl(youtubeId) {
    return `https://www.youtube.com/embed/${youtubeId}?&autoplay=0`;
}

export function getYouTubeThumbnailUrl(youtubeId) {
    return `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`;
}