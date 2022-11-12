/**
 * Shows the number of current movies in a watch later list
 * @type {number}
 */
let movieCount = 0;

/**
 * Class representing a movie in a watch later list
 * @class
 */
class Movie {
    /**
     * Name of the movie
     * @type {string}
     */
    name;

    /**
     * Boolean field which shows if the movie has been watched or not
     * @type {boolean}
     */
    watched = false;

    /**
     *
     * @param {string } name - Movie name
     * @param {boolean} watched - watched value
     * @constructor
     */
    constructor(name, watched = false) {
        this.name = name;
        this.watched = watched;
    }
}

/**
 * Array containing object of Movie class
 * @type {Movie[]}
 */
let movies = [];

/**
 * Variable that contains function representing current filter state
 * @param watched
 * @returns {boolean}
 */
let filter = (watched) => {
    return true;
};

/**
 * Saves movies array to the local storage
 * @function
 */
function SaveMoviesLocalStorage() {
    try {
        localStorage.setItem("movies", JSON.stringify(movies));
    } catch (e) {
        alert("Something went wrong while saving watch later list to the local storage.");
    }
}

/**
 * Add movie from the text input on the page
 * @function
 */
function addToListFromInput() {
    let movie_name = document.getElementById("movieName").value.trim().replace(/\s+/g, ' ');

    if (movie_name) {
        document.getElementById("movieName").value = "";

        if (movies.findIndex(e => e.name === movie_name) !== -1) {
            alert("A movie with the same name is already in the list.");
        } else {
            addToList(movie_name, false);

            movies.push(new Movie(movie_name));

            SaveMoviesLocalStorage();

            console.log(localStorage.getItem("movies"));
        }
    }
}

/**
 * Adds html element for the movie
 * @param movie_name
 * @param watched
 * @function
 */
function addToList(movie_name, watched) {
    const movieList = document.getElementById("movieList").children[0];

    const movie = document.createElement("tr");
    movie.setAttribute("name", "movieListItem");
    movie.setAttribute("class", "layout-movie-list-item");

    const check_td = document.createElement("td");
    const check = document.createElement("input");
    check.setAttribute("type", "checkbox");
    if (watched) {
        check.setAttribute("checked", "");
    }
    check.setAttribute("class", "movie-list--checkbox");
    check.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            setWatched(event.currentTarget, true);
        } else {
            setWatched(event.currentTarget, false)
        }
    });
    check_td.appendChild(check);

    const movie_name_element_td = document.createElement("td");
    const movie_name_element = document.createElement("p");
    movie_name_element.textContent = movie_name;
    if (watched) {
        movie_name_element.setAttribute("class", "movie-list--movie-name is-movie-watched");
    } else {
        movie_name_element.setAttribute("class", "movie-list--movie-name");
    }
    movie_name_element_td.appendChild(movie_name_element);

    const remove_td = document.createElement("td");
    const remove = document.createElement("div");
    remove.textContent = "Remove";
    remove.setAttribute("class", "button button--remove");
    remove.setAttribute("onclick", "removeFromList(this)");
    remove_td.appendChild(remove);

    movie.appendChild(check_td);
    movie.appendChild(movie_name_element_td);
    movie.appendChild(remove_td);
    movieList.appendChild(movie);

    ++movieCount;
}

/**
 * Sets style for a movie name according to if it has been watched or not
 * @param node
 * @param watched
 * @function
 */
function setWatched(node, watched) {
    const movie_name_element = node.parentNode.nextSibling.childNodes[0];

    if (watched) {
        movie_name_element.setAttribute("class", "movie-list--movie-name is-movie-watched");
        movies.find(e => e.name === movie_name_element.textContent).watched = true;
    } else {
        movie_name_element.setAttribute("class", "movie-list--movie-name");
        movies.find(e => e.name === movie_name_element.textContent).watched = false;
    }

    SaveMoviesLocalStorage();

    console.log(localStorage.getItem("movies"));
}

/**
 * Removes movie from movies array and removes corresponding node from the page
 * @param node
 * @function
 */
function removeFromList(node) {
    node.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode);

    const movie_name = node.parentNode.parentNode.children[1].children[0].textContent;
    movies = movies.filter(e => e.name !== movie_name);

    --movieCount;

    SaveMoviesLocalStorage();

    console.log(localStorage.getItem("movies"));
}

/**
 * Applies filter for the movie nodes in the list on the page
 * @function
 */
function addFilter() {
    const movie_list = document.querySelectorAll('tr[name="movieListItem"]');

    movie_list.forEach(e => {
        const movieName = e.children[1].firstChild.firstChild.textContent;
        if (filter(movies.find(m => m.name === movieName).watched)) {
            e.setAttribute("class", "layout-movie-list-item");
        } else {
            e.setAttribute("class", "is-filtered-out");
        }
    });
}

/**
 * Extracts movies from the local storage
 * @function
 */
function initializeListFromLocalStorage() {
    movies = JSON.parse(localStorage.getItem("movies"));

    for (let i = 0; i < movies.length; ++i) {
        addToList(movies[i].name, movies[i].watched);
    }
}

/**
 * Calls functions on window load
 */
window.onload = () => {
    /**
     * Creates movies array in the local
     */
    try {
        console.log(localStorage.getItem("movies"));
        if (localStorage.getItem("movies") == null)
            localStorage.setItem("movies", "[]");

        console.log(localStorage.getItem("movies"));
    } catch (e) {
        alert("Something went wrong while initializing movies in the local storage.");
    }

    /**
     * Adds event listener to Enter button
     */
    const input = document.getElementById("movieName");
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addToListFromInput();
        }
    });

    /**
     * Adds event listener to filter checkboxes
     */
    const filters = document.querySelectorAll('input[name="movieFilter"]');
    filters.forEach(e => e.addEventListener('change', (event) => {
        if (event.currentTarget.checked) {
            switch (event.currentTarget.id) {
                case "all":
                    filter = (watched) => {
                        return true;
                    };
                    addFilter();
                    break;
                case "watched":
                    filter = (watched) => {
                        return watched
                    };
                    addFilter();
                    break;
                case "notWatched":
                    filter = (watched) => {
                        return !watched
                    };
                    addFilter();
                    break;
                default:
                    break;
            }
        }
    }));

    initializeListFromLocalStorage();
}