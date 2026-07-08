# QuoteCash 自动变现设置

## 当前漏斗

1. 免费工具页：`https://venus-zhu.github.io/quotecash-project004/`
2. Pro 销售页：`https://venus-zhu.github.io/quotecash-project004/offer.html`
3. 付费入口：主页面顶部、主页面底部、销售页价格卡片
4. 配置文件：`src/config.js`

## 你要做的唯一账号动作

创建真实付款链接，然后替换 `src/config.js`：

```js
paymentLinks: {
  templatePack: "你的 39 元模板包付款链接",
  customSetup: "你的 299 元定制服务付款链接"
}
```

可用选择：

- Stripe Payment Links：适合信用卡付款和海外客户。官方文档：https://docs.stripe.com/payment-links
- Gumroad：适合卖数字模板包。官方帮助：https://help.gumroad.com
- 微信/支付宝收款页：适合国内私域成交，可先把链接或二维码页面放到这里。

## 建议价格

| 产品 | 价格 | 交付物 |
| --- | --- | --- |
| QuoteCash Pro 模板包 | ¥39 | 设计 / 摄影 / 开发 / 本地服务 4 套行业模板、付款条款、催款文案 |
| 行业定制报价单 | ¥299 起 | 替换术语、默认项目、品牌色、Logo、收款链接 |
| 代部署到独立域名 | ¥499 起 | GitHub Pages 或独立域名部署、基础修改 |

## 推广节奏

- 第 1 天：发布免费工具，标题强调“自由职业者报价单生成器”。
- 第 2 天：发案例：用它 2 分钟生成一张设计报价单。
- 第 3 天：发付费钩子：需要行业模板和品牌定制可以买 Pro。
- 第 4-7 天：每天换一个行业例子：摄影、开发、装修、咨询。

## 可直接复制的推广文案

### 小红书 / 朋友圈

我做了一个免费的自由职业者报价单生成器：
https://venus-zhu.github.io/quotecash-project004/

填项目、数量、单价就能自动算合计，还能打印 PDF、复制催款文案、加收款链接。适合设计师、摄影师、开发者、咨询和本地服务商。

需要行业模板、品牌色和默认价格，我也做了 Pro 模板包：
https://venus-zhu.github.io/quotecash-project004/offer.html

### 微信群短文案

给接单朋友做了个免费报价单工具，能直接生成 PDF 和收款文案：
https://venus-zhu.github.io/quotecash-project004/

如果你懒得自己配项目和条款，可以买 Pro 模板包或找我定制行业版。

## 统计

`src/config.js` 里可以填写 GA4 Measurement ID：

```js
analytics: {
  ga4MeasurementId: "G-XXXXXXXXXX"
}
```

填写后会自动加载 Google tag，并记录 Pro 入口点击事件。
## 已生成的可售卖交付物

本地已生成完整 Pro 模板包：

```text
outputs/quotecash-pro-template-pack.zip
```

这个 zip 没有提交到公开仓库，适合作为 Gumroad / 网盘 / 私域成交后的交付文件。公开站点只提供免费样例：

```text
src/templates/free-design-sample.json
```

## Gumroad 上架最短流程

1. 新建数字产品，标题用“QuoteCash Pro 模板包”。
2. 价格填 ¥39 或等值美元。
3. 上传 `outputs/quotecash-pro-template-pack.zip`。
4. 商品描述复制 `outputs/pro-template-pack/listing-copy.md`。
5. 发布后把 Gumroad 产品链接填入 `src/config.js` 的 `templatePack`。
## 自动交付注意事项

- 真正的自动赚钱来自付款平台的“付款后自动发文件”，不是 GitHub Pages 本身。
- 公开网站只放免费样例 `src/templates/free-design-sample.json`，完整 Pro 包只上传到 Gumroad / Stripe / 私域交付链接。
- 上架和推广步骤见 `outputs/seller-launch-checklist.md`。