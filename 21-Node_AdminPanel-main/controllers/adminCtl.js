const admin = require("../model/adminSchema")
const nodemailer = require("../config/mailer")

module.exports.login = (req, res) => {
    res.render("login")
}
module.exports.logout = (req, res) => {
    req.session.destroy((err) => {
        err ? console.log(err) : res.redirect("/")
    })
}
module.exports.dashboard = (req, res) => {
    res.render("dashboard")
}
module.exports.viewAdmin = async (req, res) => {
    let data = await admin.find({});
    data ? res.render("viewAdmin", { data }) : console.log("something went wrong");
}
module.exports.addAdmin = (req, res) => {
    res.render("addAdmin")
}

module.exports.addData = async (req, res) => {
    let data = await admin.create(req.body);
    data ? res.redirect("back") : console.log("data not submitted");
}

module.exports.delete = async(req,res) =>{
    let deleteData = await admin.findByIdAndDelete(req.query.id);
    deleteData ? res.redirect("back") : console.log("Data is not deleted")
}

module.exports.edit = async(req,res) =>{
    let edit = await admin.findById(req.query.id);
    edit ? res.render("editAdmin", { edit }) : console.log("Please try again, Data not found !")
}

module.exports.update = async(req,res) =>{
     let update = await admin.findByIdAndUpdate(req.query.id, req.body);
    update ? res.redirect("/viewAdmin") : console.log("Data not updated");
}

module.exports.loginInfo = (req, res) => {
    res.render("dashboard")
}
module.exports.profile = (req, res) => {
    res.render("profile")
}
module.exports.changePass = (req, res) => {
    res.render("changePass")
}
module.exports.changePassword = async (req, res) => {
    let oldPass = req.user.password;
    let id = req.user.id;

    if (oldPass == req.body.oldPass) {

        if (req.body.oldPass != req.body.newPass) {

            if (req.body.newPass == req.body.confirmPass) {
                console.log(id);
                let adminData = await admin.findByIdAndUpdate(id, { password: req.body.newPass })
                adminData ? res.redirect("/logout") : console.log("something went wrong");
            } else {
                console.log("new password and confirm password are different");
            }

        } else {
            console.log("old password and new password must be different");
        }

    } else {
        console.log("old password is wrong");
    }
}

module.exports.forgetPassword = (req, res) => {
    return res.render("forgetPass")
}
module.exports.lostPass = async (req, res) => {
    let user = await admin.findOne({ email: req.body.email })
    if (!user) {
        return res.redirect("/forgetPass")
    }

    let otp = Math.floor(100000 + Math.random() * 900000);

    nodemailer.sendOtp(req.body.email, otp);

    req.session.otp = otp;
    req.session.adminId = user.id

    res.render("newPass")
    console.log("otp sended");
}

module.exports.checkNewPassword = async (req, res) => {
    let otp = req.session.otp
    let adminId = req.session.adminId

    if (otp == req.body.otp) {
        if (req.body.newPass == req.body.confirmPass) {
            await admin.findByIdAndUpdate(adminId, { password: req.body.newPass })
            res.redirect("/");
        } else {
            res.redirect("/forgetPass");
            console.log("password must be same");
        }
    } else {
        res.redirect("/forgetPass")
        console.log("otp is wrong");
    }
}