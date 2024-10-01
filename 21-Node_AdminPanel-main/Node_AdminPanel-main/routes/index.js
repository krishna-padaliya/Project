const express = require("express");
const routes = express.Router();
const adminCtl = require("../controllers/adminCtl");
const passport = require("passport");

routes.get("/", adminCtl.login)
routes.get("/logout", passport.checkAuthentication, adminCtl.logout)
routes.get("/dashboard", passport.checkAuthentication,adminCtl.dashboard)
routes.get("/viewAdmin", passport.checkAuthentication,adminCtl.viewAdmin)
routes.get("/addAdmin", passport.checkAuthentication,adminCtl.addAdmin)
routes.get("/profile", passport.checkAuthentication,adminCtl.profile)
routes.get("/changePass", passport.checkAuthentication,  adminCtl.changePass)
routes.get("/forgetPassword", passport.checkAuthentication,adminCtl.forgetPassword)

routes.post("/insert", adminCtl.addData)
routes.get('/deleteData' , adminCtl.delete)
routes.get('/editData' , adminCtl.edit)
routes.post('/updateData' , adminCtl.update)
routes.post("/loginInfo",passport.authenticate("local", { failureRedirect: "/" }), adminCtl.loginInfo)
routes.post("/changePassword", adminCtl.changePassword)
routes.post("/lostPass", adminCtl.lostPass)
routes.post("/checkNewPassword", adminCtl.checkNewPassword)

module.exports = routes;