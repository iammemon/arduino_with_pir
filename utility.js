const nodemailer=require('nodemailer');

const emailConfig=require('./config').emailConfig;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: emailConfig.service,
    auth: {
        user: emailConfig.email,
        pass: emailConfig.pass
    }
});

exports.sendEmail=(emailTo,datetime,index,io)=>{
    
    let options={
        from: `"${emailConfig.username}" <${emailConfig.email}>`, // sender address
        to: emailTo, // list of receivers
        subject: 'Security Alert !', // Subject line
        text: `Motion Detected:Suspicious activity detected at ${datetime}`, // plain text body
        html: `<h2>Motion Detected</h2><p>Suspicious activity detected at <b>${datetime}</b></p>` // html body
    }
    transporter.sendMail(options, (error, info) => {
        if (error) {
            io.emit('emailtStatus',{indexNum:index,status:'Failed'})
            return console.log(error);
            
        }
        
        io.emit('emailtStatus',{indexNum:index,status:'Send'})
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
    
    
};
