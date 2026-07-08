const STORAGE_KEY = "quote-cash-project-004";

const defaultState = {
  docType: "QUOTE",
  docNumber: "QC-0001",
  currency: "CNY",
  dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  sellerName: "晨光设计工作室",
  sellerContact: "hello@example.com / 微信：quote-cash",
  clientName: "客户公司",
  clientContact: "项目负责人",
  discountRate: 0,
  taxRate: 0,
  paymentLink: "",
  notes: "付款条款：确认报价后预付 50%，交付验收后支付尾款。报价有效期为 7 天。",
  items: [
    { name: "品牌落地页设计", quantity: 1, price: 1800 },
    { name: "移动端适配", quantity: 1, price: 600 },
    { name: "交付文件整理", quantity: 1, price: 200 },
  ],
};

let state = loadState();

const moneyConfig = window.QuoteCashConfig || {};
const sampleTemplatePath = "./templates/free-design-sample.json";

const els = {
  docType: document.querySelector("#docType"),
  docNumber: document.querySelector("#docNumber"),
  currency: document.querySelector("#currency"),
  dueDate: document.querySelector("#dueDate"),
  sellerName: document.querySelector("#sellerName"),
  sellerContact: document.querySelector("#sellerContact"),
  clientName: document.querySelector("#clientName"),
  clientContact: document.querySelector("#clientContact"),
  discountRate: document.querySelector("#discountRate"),
  taxRate: document.querySelector("#taxRate"),
  paymentLink: document.querySelector("#paymentLink"),
  notes: document.querySelector("#notes"),
  itemsTable: document.querySelector("#itemsTable"),
  saveState: document.querySelector("#saveState"),
  previewSeller: document.querySelector("#previewSeller"),
  previewSellerContact: document.querySelector("#previewSellerContact"),
  previewType: document.querySelector("#previewType"),
  previewNumber: document.querySelector("#previewNumber"),
  previewDate: document.querySelector("#previewDate"),
  previewClient: document.querySelector("#previewClient"),
  previewClientContact: document.querySelector("#previewClientContact"),
  previewItems: document.querySelector("#previewItems"),
  subtotalValue: document.querySelector("#subtotalValue"),
  discountValue: document.querySelector("#discountValue"),
  taxValue: document.querySelector("#taxValue"),
  totalValue: document.querySelector("#totalValue"),
  previewPaymentLink: document.querySelector("#previewPaymentLink"),
  paymentCta: document.querySelector("#paymentCta"),
  previewNotes: document.querySelector("#previewNotes"),
  templatePackCta: document.querySelector("#templatePackCta"),
  customSetupCta: document.querySelector("#customSetupCta"),
  proHeaderCta: document.querySelector("#proHeaderCta"),
  loadSampleTemplateBtn: document.querySelector("#loadSampleTemplateBtn"),
  loadSampleTemplateBottomBtn: document.querySelector("#loadSampleTemplateBottomBtn"),
};

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultState, ...JSON.parse(raw) } : { ...defaultState };
  } catch (error) {
    return { ...defaultState };
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    els.saveState.textContent = "已自动保存";
  } catch (error) {
    els.saveState.textContent = "当前浏览器未保存";
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: state.currency,
  }).format(value);
}

function documentTypeLabel() {
  return state.docType === "INVOICE" ? "发票" : "报价单";
}

function updateField(key, value) {
  state = { ...state, [key]: value };
  renderPreview();
  saveState();
}

function updateItem(index, key, value) {
  const items = state.items.map((item, itemIndex) =>
    itemIndex === index ? { ...item, [key]: value } : item
  );
  state = { ...state, items };
  renderPreview();
  saveState();
}

function removeItem(index) {
  const items = state.items.filter((_, itemIndex) => itemIndex !== index);
  state = { ...state, items: items.length ? items : [{ name: "", quantity: 1, price: 0 }] };
  render();
}

function renderInputs() {
  Object.keys(defaultState).forEach((key) => {
    if (els[key] && key !== "items") {
      els[key].value = state[key] ?? "";
    }
  });
}

function renderItemsEditor() {
  els.itemsTable.innerHTML = "";
  state.items.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "item-row";
    row.innerHTML = `
      <label>项目<input data-key="name" type="text" value="${escapeAttr(item.name)}" /></label>
      <label>数量<input data-key="quantity" type="number" min="0" step="0.01" value="${escapeAttr(item.quantity)}" /></label>
      <label>单价<input data-key="price" type="number" min="0" step="0.01" value="${escapeAttr(item.price)}" /></label>
      <button class="icon-button" type="button" aria-label="删除项目">×</button>
    `;

    row.querySelectorAll("input").forEach((input) => {
      input.addEventListener("input", (event) => {
        const key = event.target.dataset.key;
        const value = key === "name" ? event.target.value : Number(event.target.value);
        updateItem(index, key, value);
      });
    });

    row.querySelector("button").addEventListener("click", () => removeItem(index));
    els.itemsTable.appendChild(row);
  });
}

function renderPreview() {
  const totals = QuoteKitCalculator.calculateTotals(
    state.items,
    state.taxRate,
    state.discountRate
  );

  els.previewSeller.textContent = state.sellerName || "你的工作室";
  els.previewSellerContact.textContent = state.sellerContact || "联系方式";
  els.previewType.textContent = documentTypeLabel();
  els.previewNumber.textContent = `NO. ${state.docNumber || "QC-0001"}`;
  els.previewDate.textContent = state.dueDate ? `有效 / 到期：${state.dueDate}` : "";
  els.previewClient.textContent = state.clientName || "客户名称";
  els.previewClientContact.textContent = state.clientContact || "客户联系人";
  els.previewNotes.textContent = state.notes || "无";

  els.previewItems.innerHTML = "";
  state.items.forEach((item) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(item.name || "未命名项目")}</td>
      <td>${escapeHtml(item.quantity)}</td>
      <td>${formatMoney(QuoteKitCalculator.toNumber(item.price))}</td>
      <td>${formatMoney(QuoteKitCalculator.calculateLineTotal(item))}</td>
    `;
    els.previewItems.appendChild(row);
  });

  els.subtotalValue.textContent = formatMoney(totals.subtotal);
  els.discountValue.textContent = `-${formatMoney(totals.discount)}`;
  els.taxValue.textContent = formatMoney(totals.tax);
  els.totalValue.textContent = formatMoney(totals.total);

  const hasPaymentLink = /^https?:\/\//i.test(state.paymentLink || "");
  els.previewPaymentLink.textContent = hasPaymentLink ? state.paymentLink : "填写收款链接后显示";
  els.previewPaymentLink.href = hasPaymentLink ? state.paymentLink : "#";
  els.paymentCta.href = hasPaymentLink ? state.paymentLink : "#";
  els.paymentCta.setAttribute("aria-disabled", String(!hasPaymentLink));
}

function renderMonetizationLinks() {
  const links = moneyConfig.paymentLinks || {};
  if (els.templatePackCta && links.templatePack) els.templatePackCta.href = links.templatePack;
  if (els.customSetupCta && links.customSetup) els.customSetupCta.href = links.customSetup;
  if (els.proHeaderCta && links.templatePack) els.proHeaderCta.href = links.templatePack;
}

function render() {
  renderInputs();
  renderItemsEditor();
  renderPreview();
  renderMonetizationLinks();
  saveState();
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function copyPaymentMessage() {
  const totals = QuoteKitCalculator.calculateTotals(
    state.items,
    state.taxRate,
    state.discountRate
  );
  const message = [
    `${state.clientName || "您好"}，这是${documentTypeLabel()} ${state.docNumber || ""}。`,
    `本次应收合计：${formatMoney(totals.total)}。`,
    state.paymentLink ? `可通过此链接付款：${state.paymentLink}` : "我会稍后补充收款链接。",
    state.notes ? `备注：${state.notes}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  navigator.clipboard
    .writeText(message)
    .then(() => {
      els.saveState.textContent = "收款文案已复制";
    })
    .catch(() => {
      els.saveState.textContent = "复制失败，请手动选择文本";
    });
}

function exportJson() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `${state.docNumber || "quote-cash"}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function importJson(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(String(reader.result));
      applyImportedState(parsed, "导入成功");

    } catch (error) {
      els.saveState.textContent = "导入失败：JSON 格式不正确";
    }
  };
  reader.readAsText(file);
}

function applyImportedState(parsed, successMessage) {
  state = {
    ...defaultState,
    ...parsed,
    items: Array.isArray(parsed.items) && parsed.items.length ? parsed.items : defaultState.items,
  };
  render();
  els.saveState.textContent = successMessage;
}

function loadSampleTemplate() {
  els.saveState.textContent = "正在载入免费样例...";
  fetch(sampleTemplatePath)
    .then((response) => {
      if (!response.ok) throw new Error("sample template not found");
      return response.json();
    })
    .then((parsed) => {
      applyImportedState(parsed, "免费样例已载入，可直接修改价格和客户名");
      if (window.gtag) {
        window.gtag("event", "load_free_sample_template", {
          template_path: sampleTemplatePath,
        });
      }
    })
    .catch(() => {
      els.saveState.textContent = "样例载入失败，请下载 JSON 后导入";
    });
}
function bindEvents() {
  Object.keys(defaultState).forEach((key) => {
    if (els[key] && key !== "items") {
      els[key].addEventListener("input", (event) => updateField(key, event.target.value));
    }
  });

  document.querySelector("#addItemBtn").addEventListener("click", () => {
    state = {
      ...state,
      items: [...state.items, { name: "新项目", quantity: 1, price: 0 }],
    };
    render();
  });

  document.querySelector("#sampleBtn").addEventListener("click", () => {
    state = { ...defaultState };
    render();
  });

  document.querySelector("#printBtn").addEventListener("click", () => {
    els.saveState.textContent = "PDF 生成后可升级行业模板";
    window.print();
  });
  document.querySelector("#copyMessageBtn").addEventListener("click", copyPaymentMessage);
  document.querySelector("#exportBtn").addEventListener("click", exportJson);
  document.querySelector("#importFile").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importJson(file);
    event.target.value = "";
  });

  [els.loadSampleTemplateBtn, els.loadSampleTemplateBottomBtn].forEach((button) => {
    if (button) button.addEventListener("click", loadSampleTemplate);
  });
}

bindEvents();
render();
