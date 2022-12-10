(() => {
    fetch('https://my-json-server.typicode.com/GTEgorss/GTEgorss_Web/playlists')
        .then((response) => response.json())
        .then((data) => console.log(data));
})();