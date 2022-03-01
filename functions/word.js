const fetch = require("node-fetch");
// this used to include context, but it screwed up queryStringParameters
// exports.handler = async (event, context) => {
exports.handler = async event => {
    const querystring = event.queryStringParameters;
    const searchable = querystring.searchable || 'democracy';
    // const url = `https://www.dictionaryapi.com/api/v3/references/sd2/json/${searchable}?key=${process.env.M_W_API}`;
    // ${process.env.M_W_API}
    const url = `https://wordsapiv1.p.rapidapi.com/words/?random=true`;
    try {
        const randoWordStream = await fetch(url, {
            mode: 'no-cors',
            method: "GET",
            headers: {
                Accept: 'application/json',
                "x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
                "x-rapidapi-key": process.env.WORDS_KEY  // see config.js
            }
        });
        const randoWord = await randoWordStream.json();

        return {
            statusCode: 200,
            body: JSON.stringify(randoWord)
        };
    } catch (err) {
        return {statusCode: 422, body: err.stack };
    }
};




// fetch("https://wordsapiv1.p.rapidapi.com/words/?random=true", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
// 		"x-rapidapi-key": "be448d7a34mshce4b59ff5f95401p1ec2e1jsn34df96c2908a"
// 	}
// })
// .then(response => {
// 	console.log(response);
// })
// .catch(err => {
// 	console.error(err);
// });







// exports.handler = async () => ({
//     statusCode: 200,
//     body: 'bleep blop bleep blerb bloobob...',
//   });

//       const settings = {
//     	"async": true,
//     	"crossDomain": true,
//       "url": "https://wordsapiv1.p.rapidapi.com/words/?random=true",
//     	"method": "GET",
//     	"headers": {
//     		"x-rapidapi-host": "wordsapiv1.p.rapidapi.com",
//     		"x-rapidapi-key": WORDS_API // see config.js
//     	}
//     };
    
//     $.ajax(settings).done(function (response) {
//       console.log(`%c=> WORDS AIP random response: `, "color:ogoldenrod", response);
//     });