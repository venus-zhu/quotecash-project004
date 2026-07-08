(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.QuoteKitCalculator = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  function toNumber(value) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function roundMoney(value) {
    return Math.round((toNumber(value) + Number.EPSILON) * 100) / 100;
  }

  function calculateLineTotal(item) {
    const quantity = Math.max(0, toNumber(item.quantity));
    const price = Math.max(0, toNumber(item.price));
    return roundMoney(quantity * price);
  }

  function calculateTotals(items, taxRate, discountRate) {
    const safeItems = Array.isArray(items) ? items : [];
    const subtotal = roundMoney(
      safeItems.reduce((sum, item) => sum + calculateLineTotal(item), 0)
    );
    const discount = roundMoney(subtotal * (Math.max(0, toNumber(discountRate)) / 100));
    const taxable = Math.max(0, subtotal - discount);
    const tax = roundMoney(taxable * (Math.max(0, toNumber(taxRate)) / 100));
    const total = roundMoney(taxable + tax);

    return { subtotal, discount, tax, total };
  }

  return {
    calculateLineTotal,
    calculateTotals,
    roundMoney,
    toNumber,
  };
});
