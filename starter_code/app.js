require('dotenv').config()

const express = require('express');
const hbs = require('hbs');
const app = express();
const axios = require("axios");
const bodyParser = require("body-parser");
const spotifyWebApi = require("spotify-web-api-node")


const qs = require("qs")
const btoa = require("btoa")


// const clientId = process.env.clientId;
// const clientSecret = process.env.clientSecret

global.access_token = ""

global.spotifyApi = new spotifyWebApi({
    clientId: process.env.clientId,
    clientSecret: process.env.clientSecret
});

spotifyApi.clientCredentialsGrant()
    .then(function (data) {
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function (err) {
        console.log('Something went wrong when retrieving an access token', err);
    });


/*exchanging clientId and clientSecret for an access token */
// axios({
//     method: "POST",
//     url: "https://accounts.spotify.com/api/token",
//     headers: {
//         'content-type': 'application/x-www-form-urlencoded',
//         "Authorization": 'Basic ' + btoa(clientId + ':' + clientSecret)
//     },
//     data: qs.stringify({
//         grant_type: "client_credentials",
//         client_id: clientId
//     })
// })
//     .then((response) => {
//         access_token = response.data.access_token
//     })
//     .catch((err) => {
//         debugger
//     })

/*query the Spotify API using the access_token retrieved in step A */
app.get("/search", (req, res) => {
    axios({
        method: "GET",
        headers: { Authorization: `Bearer ${access_token}` },
        url: `https://api.spotify.com/v1/search`,
        params: {
            type: "artist",
            q: "prince"
        }
    })
        .then((response) => {
            debugger
        })
        .catch((err) => {
            debugger
        })
})

// require spotify-web-api-node package here:

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// setting the spotify-api goes here:






// the routes go here:
var indexRoute = require("./routes/index")
var artistsRoute = require("./routes/artists")
app.use("/", indexRoute);
app.use("/", artistsRoute);

app.listen(3000, () => console.log("My Spotify project running on port 3000 🎧 🥁 🎸 🔊"));
