module.exports = {
  license: "MIT",
  keywords: [
    "ethereum",
    "addition"
  ],
  authors: [
    "Name <acc@host.com>"
  ],
  description: "Simple contract to add two numbers",
  version: "0.0.3",
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "7"
    },
    ropsten:  {
      network_id: 3,
      host: "localhost",
      port:  8545,
      gas:   2900000
    }
  },
  mocha: {
    useColors: true
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }
};
