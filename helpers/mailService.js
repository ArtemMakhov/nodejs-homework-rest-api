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

    const url = `http://localhost:3000/api/users/verify/${verificationToken}`;

    const emailOptions = {
        from: "info@contact.com",
        to: email,
        subject: "Please verify your email",
        html: `<h1> Authorization </h1> 
        <p>For authorization click on the link: <a href=${url}>${url}</a></p>`,
        text: `Open this link: ${url} to verify your email.`
    }
    const responce =  await transport.sendMail(emailOptions);
    console.log("Email sent", responce)
}

module.exports = {
    sendRegisterEmail,
}