const os = require('os')
const dgram = require('dgram')
const uuid = require('uuid/v4')
const Netmask = require('netmask').Netmask

const DISCOVERY_PORT = 41234
const IPVERSION = 4

function getBroadcastAddress(ipversion) {
    const result = []
    const ifaces = os.networkInterfaces()

    for (let iFaceType in ifaces) {
        for (let i in ifaces[iFaceType]) {
            const iface = ifaces[iFaceType][i]
            if (iface.family === `IPv${ipversion}`) {
                result.push(
                    new Netmask(iface.address, iface.netmask)
                )
            }
        }
    }

    return result
}

function sendBroadcastMessage(address, message, ipversion) {
    const data = Buffer.from(message)
    const client = dgram.createSocket(`udp${ipversion}`)

    // client.setBroadcast(true)
    client.send(data, DISCOVERY_PORT, address, err => {
        if (err) {
            console.log(`ERROR: ${err.message}`)
        }
        client.close()
    })
}

const broadcastList = getBroadcastAddress(IPVERSION)
const token = uuid()

for (let i in broadcastList) {
    console.log(`sending message to ${broadcastList[i].broadcast} (${broadcastList[i].base}/${broadcastList[i].mask})`)
    sendBroadcastMessage(broadcastList[i].broadcast, token, IPVERSION)
}
