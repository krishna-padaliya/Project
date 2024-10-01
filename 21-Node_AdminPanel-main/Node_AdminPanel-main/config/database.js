const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1/demoAdmin')

const db = mongoose.connection;

db.once("open", (err) => {
    err ? console.log('DB Not Connected!!') : console.log("DB connected");
})

module.exports = db;