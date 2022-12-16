//здесь мы импортируем ява скрипт либрери
import notie from "../Lib/notie.js"

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
                    .then((data) => {
                        parseData(data, playlistIndices);

                        // тут вот вызываем алерт
                        notie.alert({
                            type: 'success',
                            text: "Lucky this time! You're <b>not</b> a failure!",
                            stay: false,
                            position: 'bottom',
                            time: 2,
                        });
                    })
                    .catch((error) => {

                        // а вот тут вот вызываем алерт
                        notie.alert({
                            type: 'error',
                            text: " 🥳Congratz! You're a <b><i>failure!</i></b>🥳",
                            stay: false,
                            position: 'bottom',
                            time: 2,
                        });
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

function refreshPlaylists() {
    //а вот тут вызываем конфирм

    notie.confirm({
            text: "Do you really want to refresh and very likely become a failure?",
            submitText: "Yes, I know I might become a failure (weird)...",
            cancelText: "No, I don't want to be a failure (right option btw)",
            position: 'top',
        },
        function () {
            notie.alert({type: 'warning', text: 'Questionable choice but ok', time: 2});
            loadPlaylists();
        },
        function () {
            notie.alert({type: 'success', text: 'Well chosen! +100 social credits', time: 2});
        });
}

(() => {
    //а здесь вот меняем шрифт штук
    notie.setOptions({
        classes: {
            textbox: 'my-notie-textbox',
            button: 'my-notie-button',
        }
    });

    const refreshButton = document.querySelector('#refresh-button');
    refreshButton.addEventListener('click', refreshPlaylists);

    const causeErrorButton = document.querySelector('#error-button');
    causeErrorButton.addEventListener('click', causeError);

    loadPlaylists();
})();