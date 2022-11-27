const nodemailer = require('nodemailer');

const sendRegisterEmail = async({email,verificationToken}) => {
    const transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: "f976a7916a3aa5",
            pass: "83d663eae4f96b"
        }
    });

    const url = `/users/verify/${verificationToken}`;

    const emailOptions = {
        from: "info@contact.com",
        to: email,
        subject: "Please verify your email",
        html: `<h1> Please open this link: ${url}</h1>`,
        text: `Please open this link: ${url}`
    }
    const responce =  await transport.sendMail(emailOptions);
    console.log("Email sent",responce)
}

module.exports = {
    sendRegisterEmail,
}