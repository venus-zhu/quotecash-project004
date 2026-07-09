# QuoteCash 卖家上架清单

## 第一步：创建收款产品

- Gumroad / Stripe / 微信小商店任选一个，先创建“QuoteCash Pro 模板包”。
- 价格建议：`¥39` 或 `US$9`。
- 上传交付文件：`outputs/quotecash-pro-template-pack.zip`。
- 商品描述可复制：`outputs/pro-template-pack/listing-copy.md`。

## 第二步：替换网站收款链接

编辑 `src/config.js`：

```js
paymentLinks: {
  templatePack: "你的模板包付款链接",
  customSetup: "你的定制服务咨询链接"
}
```

替换后重新发布 `main` 和 `gh-pages` 分支。付款平台如果支持成功后跳转，填 `https://venus-zhu.github.io/quotecash-project004/thanks.html`。

## 第三步：发布推广内容

免费工具入口：

```text
https://venus-zhu.github.io/quotecash-project004/
```

Pro 销售页：

```text
https://venus-zhu.github.io/quotecash-project004/offer.html
```

隐私、交付与退款规则：

```text
https://venus-zhu.github.io/quotecash-project004/policies.html
```

短文案：

```text
我做了一个免费的自由职业者报价单工具，能生成 PDF、复制收款文案、导入行业模板。
免费用：https://venus-zhu.github.io/quotecash-project004/
需要设计、摄影、开发、本地服务行业模板，可以买 Pro 模板包。
```

## 第四步：第一批成交方式

- 先发朋友圈、小红书、微信群和自由职业者社群。
- 重点卖点：省掉从空白报价单开始的时间、减少报价漏项、看起来更专业。
- 如果有人问能不能按行业改，推荐 `¥299 起` 的定制报价单。