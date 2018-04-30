
var Hub = require("node-xiaomi-smart-home").Hub;

var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.7.77.114')
 
client.on('connect', () => {

    let hub = new Hub();
    hub.listen();

    hub.on('message', d => {
        console.log(d);

        if (d.model && d.sid && d.data) {
            const props = Object.keys(d.data);

            for (let prop of props) {
                if (d.data.hasOwnProperty(prop)) {
                    const topic = `/xiaomi/${d.model}/${d.sid}/${prop}`;
                    const value = d.data[prop] + '';
                    client.publish(topic, value);
                    console.log(topic, value);
                }
            }
        }

        console.log('');
    });

})
