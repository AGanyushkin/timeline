const dgram = require('dgram')


const DISCOVERY_PORT = 41234
const IPVERSION = 4

function startDiscoveryServer(ipversion) {
    return new Promise((res, rej) => {
        const server = dgram.createSocket(`udp${ipversion}`)

        server.on('error', (err) => {
            server.close()
            rej(err)
        })
        server.on('message', (msg, rinfo) => {
            console.log(`server got: "${msg}" from ${rinfo.address}:${rinfo.port}`)
        })
        server.on('listening', () => {
            res(server.address())
        })
          
        server.bind(DISCOVERY_PORT)
    })
}

startDiscoveryServer(IPVERSION)
    .then(console.log)
    .catch(console.log)
