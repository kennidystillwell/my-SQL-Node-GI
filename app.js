//importing necessary modules
const express = require('express');
const axios = require('axios');

//create instance of express application
const app = express();
//the server will listen on port 3000
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

//handle requests to root URL ('/')
app.get('/', (req, res) => {
  //send the 'index.html' file when accessing the root URL
  res.sendFile(__dirname + '/index.html');
});

//handle requests to the '/search' endpoint
app.get('/search', async (req, res) => {
  try {
    //API key for movie database
    const apiKey = 'ac401c464aa25311d2eca44e26fccc5c';
    //gets the movie title from the query parameters
    const userInput = req.query.movieTitle;

    //make an asynchronous request to TMDb's search endpoint
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userInput}`
    );

    //extracts the list of movies from the response data
    const movies = response.data.results;
    //sends the list of movies as a JSON response
    res.json(movies);
  } catch (error) {
    //handle errors by logging them and sending a 500 Internal Server Error response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//handles requests to the '/similar/:movieId' endpoint
app.get('/similar/:movieId', async (req, res) => {
  try {
    //API key for movie database
    const apiKey = 'ac401c464aa25311d2eca44e26fccc5c';
    //gets the movie ID from the route parameters
    const movieId = req.params.movieId;

    //makes an asynchronous request to TMDb's similar movies endpoint
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
    );

    //extracts the list of similar movies from the response data
    const similarMovies = response.data.results;
    //send the list of similar movies as a JSON response
    res.json(similarMovies);
  } catch (error) {
    //handle errors by logging them and sending a 500 Internal Server Error response
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

//starts the express server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});