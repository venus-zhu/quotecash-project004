function resolveShareUrl(value) {
  return new URL(value || "./", window.location.href).href;
}

function setShareStatus(button, message) {
  const scope = button.closest(".conversion-actions") || document;
  const status = scope.querySelector("[data-share-status]");
  if (status) status.textContent = message;
}

async function sharePage(button) {
  const data = {
    title: button.dataset.shareTitle || document.title,
    text: button.dataset.shareText || "",
    url: resolveShareUrl(button.dataset.shareUrl),
  };

  try {
    if (navigator.share) {
      await navigator.share(data);
      setShareStatus(button, "已打开分享");
      return;
    }

    await navigator.clipboard.writeText(`${data.text}${data.url}`);
    setShareStatus(button, "链接已复制");
  } catch (error) {
    if (error && error.name === "AbortError") return;
    setShareStatus(button, "分享失败，请复制浏览器地址");
  }
}

document.querySelectorAll("[data-share-url]").forEach((button) => {
  button.addEventListener("click", () => sharePage(button));
});