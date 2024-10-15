// Función para cargar el JSON y generar las películas en la página
function loadMovies() {
    fetch('movies.json')
        .then(response => response.json())
        .then(data => {
            const moviesContainer = document.querySelector('.movies');
            moviesContainer.innerHTML = ''; // Limpiar contenido previo
            
            // Iterar sobre las películas en el archivo JSON
            data.movies.forEach(movie => {
                const movieDiv = document.createElement('div');
                movieDiv.classList.add('movie', movie.category);
                
                const movieImage = document.createElement('img');
                movieImage.src = movie.image;
                movieImage.alt = movie.title;
                
                const movieTitle = document.createElement('p');
                movieTitle.textContent = movie.title;
                
                movieDiv.appendChild(movieImage);
                movieDiv.appendChild(movieTitle);
                moviesContainer.appendChild(movieDiv);
            });

            // Volver a aplicar los filtros y búsqueda después de cargar las películas
            applyFilters();
        });
}

// Función para aplicar filtros por categoría
function applyFilters() {
    const filterRadios = document.querySelectorAll('input[name="filter"]');
    const movies = document.querySelectorAll('.movie');

    filterRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            const selectedCategory = radio.id;

            movies.forEach(movie => {
                if (selectedCategory === 'all') {
                    movie.style.display = 'block';
                } else {
                    if (movie.classList.contains(selectedCategory)) {
                        movie.style.display = 'block';
                    } else {
                        movie.style.display = 'none';
                    }
                }
            });
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('keyup', () => {
        const searchValue = searchInput.value.toLowerCase();

        movies.forEach(movie => {
            const movieTitle = movie.querySelector('p').textContent.toLowerCase();
            if (movieTitle.includes(searchValue)) {
                movie.style.display = 'block';
            } else {
                movie.style.display = 'none';
            }
        });
    });
}

// Cargar las películas al cargar la página
window.onload = function() {
    loadMovies();
};
