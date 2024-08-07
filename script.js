const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const movieContainer = document.getElementById('movieContainer');
const loadingIndicator = document.getElementById('loadingIndicator');
const paginationNav = document.getElementById('paginationNav');
const movieDetailsModal = new bootstrap.Modal(document.getElementById('movieDetailsModal'), {});

let moviesData = [];
let currentPage = 1;
const itemsPerPage = 2;

searchBtn.addEventListener('click', () => {
    const query = searchInput.value.toLowerCase();
    if (query) {
        currentPage = 1;
        fetchMovies(query);
    }
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const query = searchInput.value.toLowerCase();
        if (query) {
            currentPage = 1;
            fetchMovies(query);
        }
    }
});

async function fetchMovies(query) {
    showLoading();
    try {
        const response = await fetch('movies.json');
        const movies = await response.json();
        moviesData = movies.filter(movie => movie.Title.toLowerCase().includes(query));
        displayMovies();
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieContainer.innerHTML = '<p class="text-center text-danger">Failed to load movies. Please try again later.</p>';
    }
    hideLoading();
}

function displayMovies() {
    movieContainer.innerHTML = '';
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = moviesData.slice(startIndex, startIndex + itemsPerPage);
    
    if (paginatedMovies.length > 0) {
        paginatedMovies.forEach(movie => {
            const movieCard = document.createElement('div');
            movieCard.classList.add('col-md-4', 'movie-card');
            movieCard.innerHTML = `
                <div class="card" data-toggle="modal" data-target="#movieDetailsModal" onclick="showMovieDetails('${movie.Title}')">
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
    
    setupPagination();
}

function setupPagination() {
    const totalPages = Math.ceil(moviesData.length / itemsPerPage);
    const paginationList = paginationNav.querySelector('ul');
    paginationList.innerHTML = '';
    
    for (let i = 1; i <= totalPages; i++) {
        const pageItem = document.createElement('li');
        pageItem.classList.add('page-item', i === currentPage ? 'active' : '');
        pageItem.innerHTML = `<a class="page-link" href="#">${i}</a>`;
        pageItem.addEventListener('click', (e) => {
            e.preventDefault();
            currentPage = i;
            displayMovies();
        });
        paginationList.appendChild(pageItem);
    }
}

function showLoading() {
    loadingIndicator.style.display = 'block';
    movieContainer.innerHTML = '';
}

function hideLoading() {
    loadingIndicator.style.display = 'none';
}

window.showMovieDetails = (title) => {
    const movie = moviesData.find(movie => movie.Title === title);
    const modalContent = document.getElementById('movieDetailsContent');
    modalContent.innerHTML = `
        <div class="text-center">
            <img src="${movie.Poster}" class="img-fluid" alt="${movie.Title}">
        </div>
        <h4 class="mt-4">${movie.Title}</h4>
        <p><strong>Year:</strong> ${movie.Year}</p>
        <p><strong>Details:</strong> ${movie.Details}</p>
    `;
    movieDetailsModal.show();
};
