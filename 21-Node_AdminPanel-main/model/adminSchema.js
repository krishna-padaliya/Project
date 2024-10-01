const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    mobail: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
})

const admin = mongoose.model("admin", adminSchema);

module.exports = admin;