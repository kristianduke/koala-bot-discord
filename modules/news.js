const NewsAPI = require('newsapi');
const newsapi = new NewsAPI('738840eef37c40d1b4515c65d5d43269');

module.exports.topHeadlines = function topHeadlines(){
    newsapi.v2.topHeadlines({
        country: 'uk'
    }).then(response => {
        console.log(response);
    });
}