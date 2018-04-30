var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://10.7.77.114')
 
client.on('connect', function () {
  client.subscribe('/devices/wb-gpio/controls/EXT1_R3A3')
  // client.subscribe('/devices/wb-adc/controls/Vin');
  client.publish('/devices/wb-gpio/controls/EXT1_R3A3/on', '1');
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString());
  // client.end()
})
