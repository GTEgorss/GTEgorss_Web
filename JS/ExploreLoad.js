const playlistsDBMaxIndex = 7;
let process = false;
let error = false;

function loadPlaylists() {
    if (!process) {
        process = true;

        let spinner = document.querySelector('#playlist-spinner');
        let table = document.querySelector('#loaded-playlists');
        spinner.style.display = 'block';
        table.setAttribute('class', 'is-movie-table-empty');

        const playlistIndices = [];
        playlistIndices[0] = Math.round(Math.random() * playlistsDBMaxIndex);

        do {
            playlistIndices[1] = Math.round(Math.random() * playlistsDBMaxIndex);
        } while (playlistIndices[1] === playlistIndices[0]);

        do {
            playlistIndices[2] = Math.round(Math.random() * playlistsDBMaxIndex);
        } while (playlistIndices[2] === playlistIndices[0] || playlistIndices[2] === playlistIndices[1]);


        setTimeout(
            () => {
                const url = error
                    ? `https://my-json-server.typicode.com/GTEgors/GTEgorss_Web/playlists/`
                    : `https://my-json-server.typicode.com/GTEgorss/GTEgorss_Web/playlists/`;
                const request = fetch(url);

                request.then((response) => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error("Server request failed");
                    }
                })
                    .then((data) => parseData(data, playlistIndices))
                    .catch((error) => {
                        alert("You're a failure!");
                        process = false;
                        spinner.style.display = 'none';
                        console.log(error);
                    });
            },
            1000);
    }
}

function parseData(data, playlistIndices) {
    document.querySelector('#playlist-spinner').style.display = 'none';

    if (!(data.length > 0 && playlistIndices.every(i => i <= data.length))) {
        process = false;
        throw new Error("Something is wrong with the data");
    }

    const table = document.querySelector('#loaded-playlists');
    const tableBody = table.children[0];

    tableBody.querySelectorAll("td").forEach(td => td.parentElement.remove());

    playlistIndices.forEach(i => {
            const tableRow = document.createElement('tr');

            for (let key in data[i]) {
                if (key !== 'id') {
                    const dataTd = document.createElement('td');
                    const dataKey = document.createTextNode(data[i][key]);
                    dataTd.appendChild(dataKey);
                    tableRow.appendChild(dataTd);
                }
            }

            tableBody.appendChild(tableRow);
        }
    );

    if (playlistIndices.length > 0) {
        table.setAttribute('class', 'movie-table explore-movie-table');
    }

    process = false;
}

function causeError() {
    error = !error;

    const errorButton = document.querySelector('#error-button');

    if (error) {
        errorButton.innerHTML = 'Fix error';
    } else {
        errorButton.innerHTML = 'Cause error';
    }
}

(() => {
    loadPlaylists();
})();