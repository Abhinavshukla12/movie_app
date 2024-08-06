const movies = [
    {
        title: "The Shawshank Redemption",
        year: "1994",
        poster: "https://via.placeholder.com/200x300?text=The+Shawshank+Redemption"
    },
    {
        title: "The Godfather",
        year: "1972",
        poster: "https://via.placeholder.com/200x300?text=The+Godfather"
    },
    {
        title: "The Dark Knight",
        year: "2008",
        poster: "https://via.placeholder.com/200x300?text=The+Dark+Knight"
    },
    {
        title: "Pulp Fiction",
        year: "1994",
        poster: "https://via.placeholder.com/200x300?text=Pulp+Fiction"
    },
    {
        title: "Forrest Gump",
        year: "1994",
        poster: "https://via.placeholder.com/200x300?text=Forrest+Gump"
    }
];

document.getElementById('search-button').addEventListener('click', function() {
    const query = document.getElementById('search-input').value.toLowerCase();
    searchMovies(query);
});

function searchMovies(query) {
    const results = movies.filter(movie => movie.title.toLowerCase().includes(query));
    displayMovies(results);
}

function displayMovies(movies) {
    const movieContainer = document.getElementById('movie-container');
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        
        movieElement.innerHTML = `
            <img src="${movie.poster}" alt="${movie.title}">
            <h3>${movie.title}</h3>
            <p>${movie.year}</p>
        `;

        movieContainer.appendChild(movieElement);
    });
}
