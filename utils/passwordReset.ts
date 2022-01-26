import nodemailer from "nodemailer";

export const resetPassword = (emailUsuario: string, newPassword: string) => {
  const remetente = nodemailer.createTransport({
    host: "host",
    port: 2525,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSWORD
    },
  });

  const emailRecuperate = {
    from: "senderexample@server.com",
    to: emailUsuario,
    subject: "Redefinição de senha – 1money",
  text: `Olá, vimos que você solicitou uma nova senha. Sua nova senha é: ${newPassword}. Use-a para fazer login!`,
  };
  remetente.sendMail(emailRecuperate, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

