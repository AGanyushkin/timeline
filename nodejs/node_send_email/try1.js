var mailer = require("nodemailer");
var xoauth2 = require("xoauth2");

var smtpTransport = mailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        type: 'OAuth2',
        user: "",
        pass: ""
    }
});

var mail = {
    from: "Name <acc@gmail.com>",
    to: "acc@xxx.com",
    subject: "Send Email Using Node.js",
    text: "Node.js New world for me",
    html: "<b>Node.js New world for me</b>"
}

smtpTransport.sendMail(mail, function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    smtpTransport.close();
});
