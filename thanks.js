const config = window.QuoteCashConfig || {};
const links = config.paymentLinks || {};

const customCta = document.querySelector("#thanksCustomCta");
if (customCta && links.customSetup) {
  customCta.href = links.customSetup;
}