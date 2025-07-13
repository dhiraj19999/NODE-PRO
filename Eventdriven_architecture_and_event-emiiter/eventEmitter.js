import EventEmitter from "events";


const emitter = new EventEmitter();

console.log(emitter)// EventEmitter {
//   _events: {},   
//   _eventsCount: 0,
//   _maxListeners: undefined
// }

// 2. Define handler
function handleOrder(data) {
  console.log(`Processing Order #${data.orderId} for ${data.item}`);
}

// 3. Set up listeners
emitter.on('orderPlaced', handleOrder);
emitter.on('orderPlacedforMobile', handleOrder);

// 4. Emit events
emitter.emit('orderPlaced', { orderId: 101, item: 'Laptop' });
emitter.emit('orderPlaced', { orderId: 100, item: 'Apple_Laptop' });
emitter.emit('orderPlacedforMobile', { orderId: 102, item: 'Mobile' });

// 5. Log internal emitter state AFTER listeners are added
console.log(emitter);// EventEmitter {
//   _events: {
//     orderPlaced: [Function: handleOrder],
//     orderPlacedforMobile: [Function: handleOrder]
//   },
//   _eventsCount: 2,
//   _maxListeners: undefined
// }

