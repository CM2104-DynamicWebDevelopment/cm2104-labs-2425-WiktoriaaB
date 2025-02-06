var express =  require('express');
var app = express();
var SpotifyWebApi = require('spotify-web-api-node');
app.use(express.static('public'));
app.get('/', function(req, res){
    res.send("Hello world! by express");
});
var spotifyApi = new SpotifyWebApi({
    clientId: '307619f0099d47608888f7f73bd463b8',
    clientSecret: '6a03278a9df94716bce210b8446f8d15'
});

spotifyApi.clientCredentialsGrant().then(
    function (data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        spotifyApi.setAccessToken(data.body['access_token']);
    },
    function (err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    }
);
async function getTracks(searchterm, res) {
    spotifyApi.searchTracks(searchterm)
        .then(function (data) {
            var tracks = data.body.tracks.items
            var HTMLResponse = "";
            for(var i=0; i<tracks.length;i++){
                var track = tracks[i];
                console.log(track.name);
                HTMLResponse = HTMLResponse +
                    "<div>" +
                    "<h2>"+track.name+"</h2>"+
                    "<h4>"+track.artists[0].name+"</h4>"+
                    "<img src='"+track.album.images[0].url +"'>"+
                    "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+"</div>";
                console.log(HTMLResponse);
            }
            res.send(HTMLResponse)
        }, function (err) {
            console.error(err);
        });
}
app.get('/search', function (req, res) {
    var searchterm = req.query.searchterm;
    getTracks(searchterm, res);
});
app.get('/searchLove', function (req, res) {
    getTracks('love', res);
});


app.listen(8080);
 