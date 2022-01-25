
import nodemailer from "nodemailer";
require("dotenv").config();

export const resetPassword = (emailUsuario, newPassword) => {
  const remetente = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "dcc68d5b86bd62",
      pass: "ae285c47cc9116"
    },
  });

  const emailRecuperate = {
    from: process.env.EMAIL,
    to: emailUsuario,
    subject: "Recuperação de senha",
    text: `Olá, sua nova senha é: ${newPassword}`,
  };
  remetente.sendMail(emailRecuperate, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = resetPassword