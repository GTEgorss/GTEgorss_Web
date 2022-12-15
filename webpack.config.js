const path = require("path");
module.exports = {
    entry: [
        './JS/ScrollMod.js',
        './JS/LoadTime.js',
    ],

    output: {
        path: path.resolve(__dirname, 'Bundle'),
        filename: 'bundle.js'
    }
}