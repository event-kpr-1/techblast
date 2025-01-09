import nodemailer from 'nodemailer';

export const sendMail = async (toAddress, sub, msg = '', imageUrl = '', htmlTemplate = '') => {
  console.log('Preparing to send email...');
  
  const transporter = nodemailer.createTransport({
    service: 'gmail', // Gmail service
    auth: {
      user: process.env.EMAIL_USER, // Environment variable for email
      pass: process.env.EMAIL_PASS, // Environment variable for app password
    },
  });

  transporter.verify((error, success) => {
    if (error) {
      console.error('Transporter verification failed:', error);
    } else {
      console.log('Transporter verified successfully:', success);
    }
  });

  const mailOptions = {
    from: '"Event 123 KPR" <event6803@gmail.com>', // Sender's email
    to: toAddress, // Recipient's email
    subject: sub, // Subject line
    text: msg, // Plain text message
    ...(htmlTemplate && { html: htmlTemplate }), // Optional HTML template
    attachments: imageUrl
      ? [
          {
            filename: 'yourID.jpg', // Attachment filename
            path: imageUrl, // File path or URL
          },
        ]
      : [], // No attachments if imageUrl is empty
  };

  try {
    console.log('Sending email with options:', mailOptions);
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', info.response);
    return info; // Optional: Return info for further use
  } catch (error) {
    console.error('Error sending email:', error.message);
    throw error; // Throw error to handle it in calling code
  }
};
