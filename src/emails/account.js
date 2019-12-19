const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mikewofford07@yahoo.com',
        subject: 'Welcome to the app',
        text: `Welcome to the app, ${name}. How's the app?` //These are back ticks, to left of 1 button. Good way to concat. Can't do this with quotes
        //html: 'Can add html if you want'
    })
}

const sendCancelEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'mikewofford07@yahoo.com',
        subject: 'Hate to see you go',
        text: `But love to watch you leave, ${name}`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendCancelEmail
}


// sgMail.send({
//     to: 'mikewofford07@yahoo.com',
//     from: 'mikewofford07@yahoo.com',
//     subject: 'First creation',
//     text: 'Did you receive?'
// })

