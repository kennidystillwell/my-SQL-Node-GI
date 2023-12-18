const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.get('/search', async (req, res) => {
  try {
    const apiKey = 'ac401c464aa25311d2eca44e26fccc5c';
    const userInput = req.query.movieTitle;

    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${userInput}`
    );

    const movies = response.data.results;
    res.json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/similar/:movieId', async (req, res) => {
  try {
    const apiKey = 'ac401c464aa25311d2eca44e26fccc5c';
    const movieId = req.params.movieId;

    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}`
    );

    const similarMovies = response.data.results;
    res.json(similarMovies);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});