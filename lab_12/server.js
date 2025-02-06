var express = require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
 app.use(express.static('public'))


 app.get('/', function(req, res){
 res.send("Hello world! by express");
});

var spotifyApi = new SpotifyWebApi({
    clientId: 'a07ae88c2087471aa3b9d4d1198edcf2',
    clientSecret: 'dbdd7a396e6747bebb452b3d7a82961d'
});

async function getTracks(searchterm, res) { 

    spotifyApi.searchTracks(searchterm)
        .then(function (data) {
        res.send(JSON.stringify(data.body));
        }, function (err) {
        console.error(err);
        }); 
}

app.get('/searchLove', function (req, res) {
    getTracks('love', res);
});

app.listen(8080);
