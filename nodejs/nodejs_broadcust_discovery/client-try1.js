const dgram = require('dgram')
const uuid = require('uuid/v4')

const message = Buffer.from(uuid())

const client = dgram.createSocket('udp4')
client.setBroadcast(true)

client.send(message, 41234, 'localhost', err => {
  client.close()
})
