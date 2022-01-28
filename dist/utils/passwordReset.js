"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const resetPassword = (emailUsuario, newPassword) => {
    const remetente = nodemailer_1.default.createTransport({
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
        }
        else {
            console.log("Email sent: " + info.response);
        }
    });
};
exports.resetPassword = resetPassword;
