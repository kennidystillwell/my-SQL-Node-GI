document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('searchForm').addEventListener('submit', function (event) {
      event.preventDefault();
      const movieTitle = document.getElementById('movieTitle').value;
  
      const resultsList = document.getElementById('resultsList');
      resultsList.innerHTML = '';
  
      fetch(`/search?movieTitle=${encodeURIComponent(movieTitle)}`)
        .then(response => response.json())
        .then(movies => {
          movies.forEach(movie => {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = '#';
            link.dataset.movieid = movie.id;
            link.textContent = movie.title;
            listItem.appendChild(link);
            resultsList.appendChild(listItem);
          });
        })
        .catch(error => {
          console.error(error);
        });
    });
  
    document.getElementById('resultsList').addEventListener('click', function (event) {
      event.preventDefault();
      if (event.target.tagName === 'A') {
        const movieId = event.target.dataset.movieid;
  
        fetch(`/similar/${movieId}`)
          .then(response => response.json())
          .then(similarMovies => {
            const resultsList = document.getElementById('resultsList');
            resultsList.innerHTML = '';
  
            similarMovies.forEach(similarMovie => {
              const listItem = document.createElement('li');
              listItem.textContent = similarMovie.title;
              resultsList.appendChild(listItem);
            });
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  });