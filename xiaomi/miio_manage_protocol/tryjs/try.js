#!/home/aganyushkin/.nvm/versions/node/v8.9.4/bin/node

const miio = require('miio');

miio.device({ address: '10.7.77.112', token: 'd0f492f12836afc3470d74151293ae58' })
  .then(device => {
    console.log('Connected to', device)

    if(device.matches('type:power-strip')) {
        console.log('type:power-strip');
    }

    if(device.matches('cap:power')) {
        console.log('cap:power');
    }
    if(device.matches('cap:switchable-power')) {
        console.log('cap:switchable-power');
    }

    if(device.matches('cap:mode')) {
        console.log('cap:mode');
    }
    if(device.matches('cap:switchable-mode')) {
        console.log('cap:switchable-mode');
    }
    
    // return device.setPower(true)

    //return device.power()
    // return device.modes()
    return device.on('power', console.log)
  })
  .then(console.log)
  .catch(console.log);