# LIRI-Bot
Assignment for KU Coding Bootcamp

LIRI is a simple Node based bot that currently offers four functions.

- spotify-this-song
- concert-this
- movie-this
- do-what-it-says

Each of these commands will search a separate API for the user's input. spotify-this-song will search Spotify for a track, concert-this will search BandsInTown for an artist's upcoming tour date, and movie-this will search OMDB for a movie. All of these functions were created in JavaScript. The Node packages used are: request, node-spotify-api, and moment. The default Node function fs was also used. In order to recreate LIRI's functionality, you must provide your own Spotify api using your own .env file.

An example of the bot working is provided in the GitHub repository.

![Example](https://i.imgur.com/KfEcMwP.png)