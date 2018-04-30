const miio = require('miio');

miio.device({ address: '10.7.77.112' })
    .then(device => {

        if(device.matches('type:miio:gateway')) {
            console.log('Connected to', device);

            const children = device.children();
            for(const child of children) {
                // console.log('children: ', device);

                if(device.matches('type:humidifier')) {
                    console.log('actions: ', device);
                }
            }
        }
        
        device.destroy();
    })
    .catch(err => console.log(err));




// const devices = miio.devices({
//     cacheTime: 120
// });

// devices.on('available', device => {
//     if(device.matches('type:miio:gateway')) {
//         console.log('Connected to', device);
//     }

//     // console.log(`${device.model} / ${device.device.model} / parent ${device.parent.model}`);
// });

// devices.on('unavailable', device => {
//     console.log('Unavailable: ', device)
// });
