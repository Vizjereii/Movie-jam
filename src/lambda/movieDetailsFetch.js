const axios = require("axios");
const apiConstants = require("../apiConstants");

exports.handler = (event, context, callback) => {
    const {httpMethod, queryStringParameters} = event;
    
    if (httpMethod !== "GET") {
        callback(null, {
            statusCode: 405,
            body: "Method Not Allowed"
        });
    } else {
        axios.get(`${apiConstants.movieDbApiRootUrl}/movie/${queryStringParameters.movieId}`, {
            params: {
                api_key: apiConstants.movieDbApiKey,
                language: 'en-US',
                include_image_language: 'en,null',
                append_to_response: 'videos,images,credits'
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