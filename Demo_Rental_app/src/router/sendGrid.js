
const nodemailer = require("nodemailer");


class SendMail{ 

 mail = async function sendmail() {
  let testAccount = await nodemailer.createTestAccount();
 
  }

 transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: 'rentup123.123@gmail.com', 
      pass: 'Patel.nenshi', 
    },
  });
}


const obj = new SendMail()

obj.registrationSendMail=async(email)=>{
 //Function call of transpoter
  let info = await obj.transporter.sendMail({
    from: 'rentup123.123@gmail.com', 
    to: email, 
    subject: "About Registration on RentUp",
    html: "You are registered sucessfully in <b>Rentup</b>!", 
   
  });
}

  
 obj.forgetPassword = async (email,id)=>{
   //console.log(email)
  
    if(email){
      let info = await obj.transporter.sendMail({
        from: 'rentup123.123@gmail.com', 
        to: email, 
        subject: "About Forget Password in RentUp", 
        html: `Please<a href='http://localhost:4200/resetPassword/${id}'> click here <a> for resetting the password resetting the password`, 
       
      });
    }
      else{
        throw new Error("email not found!")
        
      }
     }
 
    
 
 

  

module.exports =obj

