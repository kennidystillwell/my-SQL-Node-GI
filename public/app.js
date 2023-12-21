//waits for the HTML document to be fully loaded before executing the code
document.addEventListener('DOMContentLoaded', function () {
  //attachs an event listener to the 'searchForm' when it is submitted
  document.getElementById('searchForm').addEventListener('submit', function (event) {
    //prevents the default form submission behavior
    event.preventDefault();

    //gets the movie title entered by the user
    const movieTitle = document.getElementById('movieTitle').value;

    //gets the element where search results will be displayed
    const resultsList = document.getElementById('resultsList');
    //clear any existing content in the results list
    resultsList.innerHTML = '';

    //fetches movie search results from the server using the entered movie title
    fetch(`/search?movieTitle=${encodeURIComponent(movieTitle)}`)
      .then(response => response.json())
      .then(movies => {
        //iterate through the retrieved movies and display them in the results list
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
        //handles errors by logging them to the console
        console.error(error);
      });
  });

  //attaches an event listener to the 'resultsList' when a link is clicked
  document.getElementById('resultsList').addEventListener('click', function (event) {
    //prevents the default link click behavior
    event.preventDefault();

    //checks if the clicked element is a link (anchor)
    if (event.target.tagName === 'A') {
      //gets the movie ID associated with the clicked link
      const movieId = event.target.dataset.movieid;

      //fetches similar movies from the server based on the selected movie ID
      fetch(`/similar/${movieId}`)
        .then(response => response.json())
        .then(similarMovies => {
          //gets the element where search results will be displayed
          const resultsList = document.getElementById('resultsList');
          //clears any existing content in the results list
          resultsList.innerHTML = '';

          //iterates through the retrieved similar movies and display them in the results list
          similarMovies.forEach(similarMovie => {
            const listItem = document.createElement('li');
            listItem.textContent = similarMovie.title;
            resultsList.appendChild(listItem);
          });
        })
        .catch(error => {
          //handles errors by logging them to the console
          console.error(error);
        });
    }
  });
});