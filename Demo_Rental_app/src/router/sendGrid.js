
const nodemailer = require("nodemailer");


async function main() {
 
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: 'rentup123.123@gmail.com', // generated ethereal user
      pass: 'Patel.nenshi', // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: 'rentup123.123@gmail.com', // sender address
    to: "vishakhaagarwal.dcs22n@vnsgu.ac.in", // list of receivers
    subject: "About Registered Sucessfully!", // Subject line
    text: "You are registered sucessfully!!", // plain text body
   
  });



}

main().catch(console.error);


module.exports = main