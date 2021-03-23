const axios = require("axios");
const apiConstants = require("../apiConstants");

exports.handler = async (event, context, callback) => {
    const {httpMethod, queryStringParameters} = event;
    
    if (httpMethod !== "GET") {
        callback(null, {
            statusCode: 405,
            body: "Method Not Allowed"
        });
    } else {
        axios.get(`https://api.themoviedb.org/3/movie/${queryStringParameters.movieId}`, {
            params: {
                api_key: apiConstants.movieDbApiKey,
                language: 'en-US',
                append_to_response: 'videos'
            }
        })
            .then(response => {
                callback(null, {
                    statusCode: 200,
                    body: JSON.stringify(response.data)
                });
            })
            .catch(error => {
                callback(null, {
                    statusCode: 400,
                    body: error.message
                });                
            });
    }
}