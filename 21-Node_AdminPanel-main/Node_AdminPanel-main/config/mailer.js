const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "krishnapadaliya011@gmail.com",
        pass: "zceovipcwsruurmm"
    }
})

module.exports.sendOtp = (toEmail, otp) => {
    let mailOption = {
        from: "krishnapadaliya011@gmail.com",
        to: toEmail,
        subject: "Forget password otp",
        text: `you otp is ${otp}`
    }
    transporter.sendMail(mailOption, (err) => {
        if (err) {
            console.log(err);
        }
    })
}