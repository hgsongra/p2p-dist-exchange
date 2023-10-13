'use strict'

const { PeerRPCClient }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')

const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCClient(link, {})
peer.init()

const order1 = {
  clientId: 'client1',
  type: 'buy', // buy or 'sell'
  price: 55,
  quantity: 20,
};

const order2 = {
  clientId: 'client2',
  type: 'sell', // buy or 'sell'
  price: 50,
  quantity: 10,
};

peer.request('rpc_test', order2, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err)
    process.exit(-1)
  }
  console.log(data)
})