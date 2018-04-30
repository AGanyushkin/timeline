const dgram = require('dgram');
const mqtt = require('mqtt')

const mqttCli  = mqtt.connect('mqtt://10.7.77.114')
const socket = dgram.createSocket({type:'udp4', reuseAddr: true});

const multicastPort = 9898;

const mapping = {
    '86sw1_158d000183cebb_channel_0': {
        state: false,
        title: 'kids_room',
        wbmqtt: '/devices/wb-gpio/controls/EXT1_R3A5/on'
    },
    '86sw1_158d00015f2536_channel_0': {
        state: false,
        title: 'larder',
        wbmqtt: '/devices/wb-gpio/controls/EXT1_R3A6/on'
    },
    '86sw2_158d0001831c4d_channel_1': {
        state: false,
        title: 'hall',
        wbmqtt: '/devices/wb-gpio/controls/EXT1_R3A7/on'
    },
    '86sw2_158d0001831c4d_channel_0': {
        state: false,
        title: 'hall_entrance',
        wbmqtt: '/devices/wb-gpio/controls/EXT1_R3A8/on'
    },
    '86sw2_158d0001831c3f_channel_0': {
        state: false,
        title: 'bathroom',
        wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A2/on'
    },
    '86sw2_158d0001831c3f_channel_1': {
        state: false,
        title: 'toilet',
        wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A3/on'
    },
    '86sw2_158d000128f0c1_channel_0': {
        state: false,
        title: 'kitchen',
        wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A5/on'
    },
    '86sw2_158d000128f0c1_channel_1': {
        state: false,
        title: 'kitchen_table',
        wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A6/on'
    },
};

// '': {
//     state: false,
//     title: 'bedroom_1',
//     wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A7/on'
// },
// '': {
//     state: false,
//     title: 'bedroom_2',
//     wbmqtt: '/devices/wb-gpio/controls/EXT2_R3A8/on'
// },

mqttCli.on('connect', () => {

    for (let key in mapping) {
        if (mapping.hasOwnProperty(key)) {
            mqttCli.publish(mapping[key].wbmqtt, mapping[key].state ? '1' : '0');
        }
    }

    socket.on('message', onMessage);
    socket.on('error', onError);
    socket.on('listening', onListening);
    socket.bind(multicastPort);    
});

function onListening() {
    socket.setBroadcast(true);
    socket.setMulticastTTL(128);
    socket.addMembership('224.0.0.50');

    const whoIsCommand = '{"cmd": "whois"}';
    socket.send(whoIsCommand, 0, whoIsCommand.length, 4321, '224.0.0.50')

}

function onError(err) {
    console.log(err);
}

function onMessage(msgBuffer) {
    try {
        var msg = JSON.parse(msgBuffer.toString());
        handleMsg(msg);
    }
    catch(e) {
        console.log(e);
    }
}

function handleMsg(msg) {
    // console.log(msg);

    if (msg.model && msg.sid) {

        if (msg.model === '86sw1' || msg.model === '86sw2') {
            const data = JSON.parse(msg.data);
            const k = data.channel_0 ? 'channel_0' : (data.channel_1) ? 'channel_1' : '';
            const key = `${msg.model}_${msg.sid}_${k}`;

            let item = mapping[key];
            if (item) {
                item.state = !item.state;

                mqttCli.publish(item.wbmqtt, item.state ? '1' : '0');
                console.log(item.wbmqtt, item.state ? '1' : '0');
            }
        }

        // if (msg.model === 'motion' && msg.sid === '158d00013fb341') {
        //     const data = JSON.parse(msg.data);
        //     const keyForControl = '86sw2_158d0001831c3f_channel_1';
        //     let item = mapping[keyForControl];

        //     if (data.status === 'motion') {
        //         item.state = true;
        //     }
        //     if (data.no_motion === '300') {
        //         item.state = false;
        //     }

        //     mqttCli.publish(item.wbmqtt, item.state ? '1' : '0');
        //     console.log(item.wbmqtt, item.state ? '1' : '0');
        // }

        // let props = {};

        // if (msg.data) {
        //     let data = JSON.parse(msg.data);

        //     props = Object.keys(data)
        //         .reduce((acc, cur, index, arr) => {

        //             if (data.hasOwnProperty(cur)) {
        //                 acc[cur] = data[cur];
        //             }

        //             return acc;
        //         }, {})
        // }

        // ['token', 'ip', 'port'].reduce((acc, cur, index, arr) => {
            
        //     if (msg.hasOwnProperty(cur)) {
        //         props[cur] = msg[cur];
        //     }
            
        //     return acc;
        // }, props);

        // for (let prop in props) {
        //     const topic = `/xiaomi/${msg.model}/${msg.sid}/${prop}`;
        //     const value = props[prop] + '';

        //     mqttCli.publish(topic, value);
        //     console.log(topic, value);
        // }
    }
}