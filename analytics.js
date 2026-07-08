(function () {
  const config = window.QuoteCashConfig || {};
  const measurementId = config.analytics && config.analytics.ga4MeasurementId;
  if (!measurementId) return;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) return;
    window.gtag("event", target.dataset.track, {
      link_url: target.href || "",
      link_text: target.textContent.trim(),
    });
  });
})();