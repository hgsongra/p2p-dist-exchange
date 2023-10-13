'use strict'

const { PeerRPCServer }  = require('grenache-nodejs-http')
const Link = require('grenache-nodejs-link')
const { orderBook } = require('./order-book')


const link = new Link({
  grape: 'http://127.0.0.1:30001'
})
link.start()

const peer = new PeerRPCServer(link, {
  timeout: 300000
})
peer.init()

const port = 1024 + Math.floor(Math.random() * 1000)
const service = peer.transport('server')
service.listen(port)

setInterval(function () {
  link.announce('rpc_test', service.port, {})
}, 1000)

service.on('request', (rid, key, order, handler) => {
  console.log( Date.now() + ' BEFORE CURRENT ORDERs::: ', orderBook.getAllOrders())
  const matchingOrders = orderBook.matchOrder(order);
  console.log(Date.now() + ' matchingOrders::: ', matchingOrders)
  if (matchingOrders.length > 0) {
    // Execute the trade and update the order book
    const trade = orderBook.executeTrade(order, matchingOrders);
    handler.reply(null, `${trade.tradedOrderQty}/${trade.totalOrderQty} Qty got executed.`)
  } else {
    orderBook.addOrder(order)
    handler.reply(null, `Order of ${order.quantity} Qty placed successfully.`)
  }
  console.log( Date.now() + ' AFTER CURRENT ORDERs::: ', orderBook.getAllOrders())
})
