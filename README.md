# Arduino with PIR
## Demo ##
[![Youtube video](https://img.youtube.com/vi/cZqZxsAJVDM/0.jpg)](https://www.youtube.com/watch?v=cZqZxsAJVDM)
## Circuit diagram ##
![Circuit Design](http://www.adrirobot.it/sensori/pir_sensor/immagini/hc-sr501_schema_test.jpg)
## Description ##
Simple PIR Sensor working with arduino using 
1. Jhonny-five (API for communicating with arduino)
2. NodeJS/express for server
3. Socket.io for realtime communication between server and client
4. Nodemailer for emails
## How to use ? ##
1. Upload [StandardFirmataPlus](https://github.com/firmata/arduino/blob/master/examples/StandardFirmataPlus/StandardFirmataPlus.ino) sketch to Arduino  
2. clone repo && npm install
3. Edit email configuration inside config.js 
4. npm start

