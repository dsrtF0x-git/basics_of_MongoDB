const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gespenst.serge@gmail.com",
    subject: "Thanks fro joining in.",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
  });
};

const sendCancelationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "gespenst.serge@yandex.ru",
    subject: "Good bye",
    text: `${name}, hope you come soon`
  });
};

module.exports = {
  sendWelcomeEmail,
  sendCancelationEmail
};