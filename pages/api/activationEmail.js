import nodemailer from 'nodemailer';
import path from 'path';
import jwt from 'jsonwebtoken';

const appEmail = process.env.NEXT_PUBLIC_EMAIL;
const emailPassword = process.env.NEXT_PUBLIC_EMAIL_PASSWORD;
const jwtSecret = process.env.NEXT_PUBLIC_JWT_SECRET;

export default async function verify(req, res) {
 const { activationToken, email } = req.body;

 const verify = jwt.verify(activationToken, jwtSecret);
 const { code } = verify;

 const htmlMessage = ` <!DOCTYPE html>
 <html
  lang="en"
  xmlns="https://www.w3.org/1999/xhtml"
  xmlns:o="urn:schemas-microsoft-com:office:office">
  <head>
   <meta charset="UTF-8" />
   <meta name="viewport" content="width=device-width,initial-scale=1" />
   <meta name="x-apple-disable-message-reformatting" />
   <title></title>
   <!--[if mso]>
    <noscript>
     <xml>
      <o:OfficeDocumentSettings>
       <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
     </xml>
    </noscript>
   <![endif]-->
   <body style="margin: 0; padding: 0">
   <table
   align="center"
    role="presentation"
    style="
     width: 300px;
     border-collapse: collapse;
     border: 0;
     border-spacing: 0;
     background: #ffffff;
    ">
    <tr>
     <td align="center" style="padding: 0">
      <table
       role="presentation"
       style="
        width: 602px;
        border-collapse: collapse;
        border-spacing: 0; ;
       ">
       <tr>
        <td align="center" style="padding: 20px 0 30px 0">
         <img
          src="cid:logo"
          alt=""
          width="100"
          style="height: auto; display: block" />
        </td>
       </tr>
       <tr>
        <td align="center" style="padding: 0">
         <h1 style="font-family: 'Suez One', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;color: #840a73">Activate your account
         </h1>
        </td>
       </tr>
       <tr>
        <td align="center" style="padding: 0">
         <p style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif">
         You recently requested a unique activation code for your account. <br />
         To activate your account, please use the code provided below:
         </p>
        </td>
       </tr>
       <tr>
       <td align="center" style="padding: 0">
       <span
       style="text-decoration: none;
       font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
       display: flex;
       padding: 6px 8px;
       background: #f9eef8;
       border: 1px solid #f9eef8;
       border-radius: 12px;
       font-weight: 700;
       max-width: 200px;
       margin: 16px 0;"
       >
          <p style="display: flex; margin: 0 auto;">
           <span style="margin-left: 5px; color: black; font-size: 36px">${code}</span>
          </p>
         <br />
         </span>
        </td>
       </tr>
       <tr>
        <td align="center" style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; padding: 0; width: 300px;">
         <p
         style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif"
          >This code will expire in 5 minutes.</p
         >
        </td>
       </tr>
       <tr>
        <td align="center" style="padding: 0">
         <p style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif">
          If you did not request this, just ignore this email.
         </p>
         <br>
        </td>
       </tr>
       <tr>
        <td align="center" style="padding: 0">
         <span
          align="center"
          style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; margin-top: 2rem">
          if you are still having troubles, you can reach out to us at
         </span>
        </td>
       </tr>
       <tr>
        <td align="center" style="padding: 0">
         <a
          style="font-family: 'Syne', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; color: black;"
          href="mailto:luciano.polo@fakemail.com"
          >luciano.polo@fakemail.com</a
         >
         <br>
         <br>
         <br>
        </td>
       </tr>
      </table>
     </td>
    </tr>
   </table>
  </body>
   <style>
    table,
    td,
    div,
    h1,
    p {
     font-family: Arial, sans-serif;
    }
   </style>
  </head>
 </html>`;

 const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
   user: appEmail,
   pass: emailPassword,
  },
  tls: {
   rejectUnauthorized: false,
  },
 });

 const imagesPath = {
  logo: path.join(process.cwd(), 'public', 'logo.png'),
 };

 const mailOptions = {
  from: appEmail,
  to: email,
  subject: 'Activate Your Account',
  html: htmlMessage,
  attachments: [
   {
    filename: 'logo.png',
    path: imagesPath.logo,
    cid: 'logo',
   },
  ],
 };

 transporter.sendMail(mailOptions, (err) => {
  if (err) {
   console.error(err);
  } else {
   console.log('email sent successfully');
  }

  return res.status(200).send({
   response: 'email sent successfully',
  });
 });
}
