const config = window.QuoteCashConfig || {};
const links = config.paymentLinks || {};

function bindLink(id, href) {
  const el = document.querySelector(id);
  if (el && href) el.href = href;
}

function setText(id, text) {
  const el = document.querySelector(id);
  if (el && text) el.textContent = text;
}

bindLink("#offerBuyTop", links.templatePack);
bindLink("#offerBuyPack", links.templatePack);
bindLink("#offerBuyBottom", links.templatePack);
bindLink("#offerBuyCustom", links.customSetup);
setText("#templatePackPrice", config.templatePackPrice);
setText("#customSetupPrice", config.customSetupPrice);