const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(path.join(__dirname, "../src/share.js"), "utf8");

function createContext(navigator) {
  const status = { textContent: "" };
  const scope = { querySelector: () => status };
  const button = {
    dataset: {
      shareUrl: "./offer.html",
      shareTitle: "QuoteCash Pro",
      shareText: "行业报价模板：",
    },
    closest: () => scope,
    addEventListener: (_type, handler) => {
      button.handler = handler;
    },
  };
  const context = {
    URL,
    document: {
      title: "Fallback title",
      querySelectorAll: () => [button],
    },
    navigator,
    window: {
      location: { href: "https://venus-zhu.github.io/quotecash-project004/" },
    },
  };

  vm.runInNewContext(source, context);
  return { button, status };
}

(async () => {
  let shared;
  const native = createContext({
    share: async (data) => {
      shared = data;
    },
  });
  await native.button.handler();
  assert.equal(shared.url, "https://venus-zhu.github.io/quotecash-project004/offer.html");
  assert.equal(native.status.textContent, "已打开分享");

  let copied;
  const clipboard = createContext({
    clipboard: {
      writeText: async (text) => {
        copied = text;
      },
    },
  });
  await clipboard.button.handler();
  assert.equal(copied, "行业报价模板：https://venus-zhu.github.io/quotecash-project004/offer.html");
  assert.equal(clipboard.status.textContent, "链接已复制");

  console.log("share tests passed");
})();