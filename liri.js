// Variables, requirements, and other configurations
require("dotenv").config();
var fs = require("fs");
var request = require("request");
var keys = require("./keys.js");
var Spotify = require('node-spotify-api')
var spotify = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret 
});

var moment = require("moment");

var inputCommand = process.argv[2];
var inputParam = process.argv.slice(3).join(" ");


function doProcess(command, param) {

    switch(command) {
        case 'spotify-this-song':
        spotifyThis(param);
        break;

        case 'concert-this':
        concertThis(param);
        break;

        case 'movie-this':
        movieThis(param);
        break;

        case 'do-what-it-says':
        doWIS();
        break;
    
        default: 
        console.log("Please enter a valid command: spotify-this-song, concert-this, movie-this, or do-what-it-says.")
        return;
    }
}

function spotifyThis(song) {

    if(song == undefined) {
        song = "The Sign by Ace of Base";
    }

    spotify.search({
        type: 'track',
        query: song,
        limit: 5
    }, function(err, data) {
        if(err) {
            console.log(err);
        } else {
        console.log("------------------------------")
        console.log("Artist: " + data.tracks.items[0].artists[0].name);
        console.log("Song: " + data.tracks.items[0].name);
        console.log("Album: " + data.tracks.items[0].album.name);
        if (data.tracks.items[0].preview_url == null) {
            console.log("Preview unavailable");
        } else {
        console.log("Preview: " + data.tracks.items[0].preview_url);
        }
        console.log("------------------------------")
      }
    });
}


function concertThis(artist) {
    let artistQ = artist.split(' ').join('+');

    let queryURL = "https://rest.bandsintown.com/artists/" + artistQ + "/events?app_id=codingbootcamp";
    
    request(queryURL, function(error, response, body) {
    
        if (error) {
            console.log(error);
            return;
        } else {
            var result = JSON.parse(body)[0];
            console.log("------------------------------")
            console.log("Venue: " + result.venue.name);
            console.log("Location: " + result.venue.city);
            console.log("Date: " + moment(result.datetime).format("MM/DD/YYYY"));
            console.log("------------------------------")
        }
    })
 }


function movieThis(movie) {
    if (movie == undefined) {
        movie = "Mr. Nobody";
    }

    let queryURL = 'http://www.omdbapi.com/?t=' + movie +'&y=&plot=long&tomatoes=true&r=json&apikey=trilogy'

    let movieQ = movie.split(' ').join('+');

    request(queryURL, function(error, response, body) {

        if(error) {
            console.log(errror);
        } else {
            let result = JSON.parse(body);
            console.log("------------------------------")
            console.log("Title: " + result["Title"]);
	        console.log("Year: " + result["Year"]);
            console.log("IMDB Rating: " + result["imdbRating"]);
            console.log("Rotten Tomatoes Rating: " + result["tomatoRating"]);
	        console.log("Country: " + result["Country"]);
	        console.log("Language: " + result["Language"]);
	        console.log("Plot: " + result["Plot"]);
	        console.log("Actors: " + result["Actors"]);
            console.log("Rotten Tomatoes URL: " + result["tomatoURL"])
            console.log("------------------------------")
    }
        });
}


function doWIS() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        if(error){
            console.log(error);
        }else {
            var dataSplit = data.split(',');
            var readCommand = dataSplit[0];
            var readParam = dataSplit[1];
            
            for(x = 2; x < dataSplit.length; x++) {
                readParam = readParam + "+" + dataSplit[i];
            };

            doProcess(readCommand, readParam);
        }
    })
}


 doProcess(inputCommand, inputParam);