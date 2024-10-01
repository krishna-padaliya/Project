const express = require('express')
const port = 8080
const path = require("path")

const app = express()
const db = require("./config/database")

const passport = require("passport");
const session = require("express-session");
const localSt = require("./config/passport")

app.set("view engine", "ejs");
app.use("/", express.static(path.join(__dirname, "public")))
app.use(express.urlencoded());

app.use(session({
    name: "demoSession",
    secret: 'myBatch',
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: 100 * 100 * 60 }
}))

app.use(passport.session());
app.use(passport.initialize());
app.use(passport.setAuthenticatedUser)

app.use("/", require("./routes"));

app.listen(port , (err) =>{
    err ? console.log('Server not Responding!!') : console.log('Server Responding at:' + port);
})