const assert = require("node:assert/strict");
const calculator = require("../src/calculator");

const totals = calculator.calculateTotals(
  [
    { name: "Design", quantity: 2, price: 150 },
    { name: "Setup", quantity: 1, price: 80 },
  ],
  10,
  5
);

assert.deepEqual(totals, {
  subtotal: 380,
  discount: 19,
  tax: 36.1,
  total: 397.1,
});

assert.equal(calculator.calculateLineTotal({ quantity: 3, price: 19.995 }), 59.99);
assert.equal(calculator.calculateTotals(null, "bad", "bad").total, 0);

console.log("calculator tests passed");
