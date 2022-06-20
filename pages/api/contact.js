import nodemailer from 'nodemailer';
import SMTPTransport from 'nodemailer/lib/smtp-transport';

export default async function handler(req, res) {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mamivarrodoboza.service@gmail.com',
      pass: process.env.PASSWORD,
    },
    secure: true,
  });

  const options = {
    from: 'mamivarrodoboza.service@gmail.com',
    to: 'devvatu@gmail.com',
    subject: 'Mamivarródobozától',
    text: `${req.body.email} ${req.body.message}`,
    html: `<div><p>from: ${req.body.email}</p><p>${req.body.message}</p></div>`,
  };

  if (!req.body.email || !req.body.message) {
    res.status(400).json({ success: false });
  } else {
    try {
      transporter.sendMail(options);
      res.status(200).json({ success: true });
    } catch (error) {
      console.log(error);
    }
  }
}
