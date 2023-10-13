class OrderBook {
  constructor() {
    this.orders = [];
  }

  getAllOrders() {
    return this.orders
  }

  addOrder(order) {
    this.orders.push(order);
  }

  matchOrder(newOrder) {
    const matchingOrders = [];

    for (let i = this.orders.length - 1; i >= 0; i--) {
      const existingOrder = this.orders[i];

      if (
        existingOrder.type !== newOrder.type && // Opposite order type (buy vs. sell)
        (
          (newOrder.type === 'buy' && newOrder.price >= existingOrder.price) ||
          (newOrder.type === 'sell' && newOrder.price <= existingOrder.price)
        ) &&
        newOrder.quantity > 0
      ) {
        // Match found, add to matchingOrders
        matchingOrders.push(existingOrder);
      }
    }

    return matchingOrders;
  }

  executeTrade(newOrder, matchingOrders) {
    let tradedOrderQty = 0;
    const totalOrderQty = newOrder.quantity
    for (const matchedOrder of matchingOrders) {
      if (newOrder.quantity <= 0) break;

      const tradeQuantity = Math.min(newOrder.quantity, matchedOrder.quantity);

      // Update the order quantities
      newOrder.quantity -= tradeQuantity;
      matchedOrder.quantity -= tradeQuantity;
      tradedOrderQty += tradeQuantity;

      // If the matched order has no remaining quantity, remove it
      if (matchedOrder.quantity === 0) {
        this.orders = this.orders.filter((order) => order !== matchedOrder);
      }
    }

    // If the new order still has quantity left, add it to the order book
    if (newOrder.quantity > 0) {
      this.orders.push(newOrder);
    }
    return { 
      totalOrderQty,
      tradedOrderQty,
      remainingOrderQty: newOrder.quantity
    }
  }
}

module.exports = {
  orderBook: new OrderBook()
}