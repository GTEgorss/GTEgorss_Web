let movieCount = 0;
let array = []; //TODO introduce array of movies (class Movie as well i guess)

function addToList() {
    const movie_name = document.getElementById("movieName").value;

    if (movie_name && !/^\s+$/g.test(movie_name)) {
        document.getElementById("movieName").value = "";

        const movieList = document.getElementById("movieList").children[0];

        const movie = document.createElement("tr");
        movie.setAttribute("class", "layout-movie-list-item");

        const check_td = document.createElement("td");
        const check = document.createElement("input");
        check.setAttribute("type", "checkbox");
        check.setAttribute("class", "movie-list--checkbox");
        check_td.appendChild(check);

        const movie_name_element_td = document.createElement("td");
        const movie_name_element = document.createElement("p");
        movie_name_element.textContent = movie_name;
        movie_name_element.setAttribute("class", "movie-list--movie-name");
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
}

function removeFromList(node) {
    node.parentNode.parentNode.parentNode.removeChild(node.parentNode.parentNode);
}

window.onload = () => {
    const input = document.getElementById("movieName");
    input.addEventListener("keyup", function (event) {
        if (event.key === "Enter") {
            addToList();
        }
    })
}