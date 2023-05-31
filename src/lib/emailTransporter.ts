import nodemailer from "nodemailer";
import { env } from "~/env.mjs";

export default async function sendEmail() {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    // host: env.SMTP_HOST,
    // port: Number(env.SMTP_PORT),
    // secure: true, // true for 465, false for other ports
    auth: {
      user: env.SMTP_USER,
      pass: env.SMTP_PASSWORD,
    },
  });
  console.log("----------------", env.SMTP_USER, env.SMTP_PASSWORD);
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"Fred Foo 👻" <arccik@gmail.com>', // sender address
    to: "bar@example.com, arccik@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
