const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieContainer = document.getElementById('movieContainer');

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        fetchMovies(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
        if (query) {
            fetchMovies(query);
        }
    }
});

async function fetchMovies(query) {
    const response = await fetch('movies.json');
    const movies = await response.json();
    const filteredMovies = movies.filter(movie => movie.Title.toLowerCase().includes(query));
    displayMovies(filteredMovies);
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';
    if (movies && movies.length > 0) {
        movies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('col-md-4', 'movie-card');
            movieCard.innerHTML = `
                <div class="card">
                    <img src="${movie.Poster}" class="card-img-top" alt="${movie.Title}">
                    <div class="card-body">
                        <h5 class="card-title">${movie.Title}</h5>
                        <p class="card-text">${movie.Year}</p>
                    </div>
                </div>
            `;
            movieContainer.appendChild(movieCard);
        });
    } else {
        movieContainer.innerHTML = '<p class="text-center">No movies found.</p>';
    }
}
