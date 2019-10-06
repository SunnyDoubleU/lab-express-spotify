var express = require("express");
var app = express();
var axios = require("axios");

//Iteration 3: Search for an Artist
app.post('/artists', (req, res) => {
    spotifyApi.searchArtists(req.body.artist)
        .then(response => {
            let singer = response.body.artists.items
            res.render('artists', { singer })
        })
        .catch(err => {
            console.log(err)
        })
})

//Iteration 4: View albums
app.get('/albums/:artistId', (req, res) => {
    spotifyApi.getArtistAlbums(req.params.artistId)
        .then(response => {
            let album = response.body.items
            res.render('albums', { album })
            // console.log(response.body.items)
        })
        .catch(err => {
            console.log(err)
        })
})

//Iteration 5: View tracks
app.get('/tracks/:albumId', (req, res) => {
    spotifyApi.getAlbumTracks(req.params.albumId)
        .then(response => {
            let track = response.body.items
            res.render('tracks', { track })
        })
        .catch(err => {
            console.log(err)
        })
})

//Iteration 3: Search for an Artist
// app.post("/artists", (req, res) => {
//     axios({
//         method: "GET",
//         headers: { Authorization: `Bearer ${access_token}` },
//         url: `https://api.spotify.com/v1/search`,
//         params: {
//             type: "artist",
//             q: req.body.artist
//         }
//     })
//         .then(response => {
//             let artistName = response.data.artists.items
//             res.render(`artists`, { singer: artistName })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })


//Iteration 4: View Albumns

// app.get("/artists/albums", (req, res) => {
//     // artistId = req.
//     axios({
//         method: "GET",
//         headers: { Authorization: `Bearer ${access_token}` },
//         url: `https://api.spotify.com/v1/artists/`,
//         params: {
//             type: "album",
//             q: "1uNFoZAHBGtllmzznpCI3s"
//         }
//     })
//         .then(response => {
//             let albums = response.data
//             console.log(albums)
//             // res.render(`albums`, { albums })
//         })
//         .catch(err => {
//             console.log(err)
//         })
// })




module.exports = app;