const axios = require("axios");
const apiConstants = require("../apiConstants");

function getAllPagesRecursive(url, movies) {
    url = url.replace("&page=d+", "");

    return axios
        .get(url)
        .then(response => {
            const fetchedMovies = movies.concat(response.data.results);
            if (response.data.total_pages > response.data.page) {
                return getAllPagesRecursive(url + `&page=${response.data.page + 1}`, fetchedMovies);
            } else {
                return fetchedMovies;
            }
        })
        .catch(error => {
            return {
                statusCode: 422,
                body: String(error)
            }
        });
}

exports.handler = async (event, context, callback) => {
    const {httpMethod} = event;

    if (httpMethod !== "GET") {
        callback(null, {
            statusCode: 405,
            body: "Method Not Allowed"
        });
    } else {
        const currentDate = new Date();
        currentDate.setDate(currentDate.getDate() - 14);
        const twoWeeksAgo = currentDate.toISOString().substr(0, 10);
        currentDate.setDate(currentDate.getDate() + 35);
        const threeWeeksFuture = currentDate.toISOString().substr(0, 10);        
        
        await getAllPagesRecursive(
            `${apiConstants.movieDbApiRootUrl}/discover/movie?api_key=${apiConstants.movieDbApiKey}&language=en-US` +
            `&sort_by=primary_release_date.desc&include_adult=false` +
            `&primary_release_date.gte=${twoWeeksAgo}&primary_release_date.lte=${threeWeeksFuture}&vote_count.gte=10`,
            [])
            .then(response => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response)
                });
            })
    }
}