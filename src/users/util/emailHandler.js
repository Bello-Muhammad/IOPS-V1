const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      user: 'private.practice.ng@gmail.com',
      pass: 'suelhlwajatruykg',
    }
  });

const emailNotification = async (email, firstName, lastName, password) => {
    try {

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Immunization Health Care" <bellomoh250@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Immunization', // Subject line
        text: '',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            margin-top: 20px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .header {
                padding: 5px 0;
            }
            .content {
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome!</h1>
        </div>
        <div class="content">
            <p>Dear ${firstName} ${lastName},</p>
            <p>We are pleased to inform you that your account has been successfully created in our system. Below are your login details:</p>
            <p><strong>Username:</strong> {email}<br>
            <strong>Temporary Password:</strong> ${password}</p>
            <p>Please follow these steps to get started:</p>
            <ol>
                <li>username: ${email}</li>
                <li>password: ${password}</li>
                <li>Visit our login page: <a target=_blank href='localhost:3000/api/v1/auth/login'>Here</a>.</li>
                <li>When login you will be redirect to your dashboard.</li>
                <li>To change password: On login at the bottom of the side menu you will see change password click on it. Please choose a strong and secure password.</li>
            </ol>
            <p>If you encounter any issues or have any questions, our support team is here to assist you. Feel free to reach out to us at <a href="mailto:[Support Email]">[Support Email]</a> or call us at [Support Phone Number].</p>
            <p>Once again, welcome. We look forward to a successful journey together!</p>
            <p>Best regards.</p>
        </div>
    </div>
</body>
</html>`
      });
    } catch (error) {
      console.log(error);
    }
  };

  const postEmail = async (email, firstName, lastName, state, localGovernment) => {
    try {

      // send mail with defined transport object
      await transporter.sendMail({
        from: '"Immunization Health Care" <bellomoh250@gmail.com>', // sender address
        to: email, // list of receivers
        subject: 'Immunization', // Subject line
        text: '',
        html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Account Created</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #4CAF50;
            color: white;
            padding: 10px 0;
            text-align: center;
        }
        .content {
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #777;
            font-size: 12px;
            margin-top: 20px;
        }
        @media (max-width: 600px) {
            .container {
                padding: 10px;
            }
            .header {
                padding: 5px 0;
            }
            .content {
                margin: 10px 0;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Welcome!</h1>
        </div>
        <div class="content">
            <p>Dear ${firstName} ${lastName},</p>
            <p>This to inform you that you have been posted to the follow location state and local government:</p>
            <p><strong>State:</strong> ${state}<br>
            <strong>local government:</strong> ${localGovernment}</p>
            
            <p>Best regards.</p>
        </div>
    </div>
</body>
</html>`
      });
    } catch (error) {
      console.log(error);
    }
  };

module.exports = {
    emailNotification,
    postEmail
}