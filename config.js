module.exports = {
    InitialState: {
        emailTo: '',
        secretPassword: 'admin',
        status: false,
        counter:0
    },
    emailConfig: {
        /* There are some issues with gmail recommended to use other than gmail*/
        service: "", // outlook,hotmail,gmail or any other
        email: "",
        pass: "",
        username: "" 
    },
    LED:13,
    PIR:2
}