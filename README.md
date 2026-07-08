# Project 004 - QuoteCash

线上地址：https://venus-zhu.github.io/quotecash-project004/

QuoteCash 是一个给自由职业者、小工作室和本地服务商使用的报价单 / 发票生成器。它不需要后端，打开 `src/index.html` 就能录入项目、自动计算金额、生成可打印单据、复制收款文案，并保存为 JSON 方便下次复用。

## 为什么它有赚钱机会

- 目标用户明确：设计师、开发者、摄影师、装修/维修/咨询类小商户都需要快速发报价和催款。
- 第一版成本低：纯 HTML/CSS/JS，可以直接放到 GitHub Pages 这类静态托管服务。
- 收款链路短：把 Stripe Payment Links、Gumroad、微信/支付宝收款页链接填进去，用户即可把单据和付款入口一起发给客户。
- 可收费点清晰：卖模板包、代部署、定制品牌单据、加入多币种/多模板/客户库后做订阅。

## 使用方式

直接用浏览器打开：

```text
E:\codex workspace\project-004-freelance-invoice-kit\src\index.html
```

功能：

- 编辑报价单或发票基本信息
- 添加、删除收费明细
- 自动计算小计、折扣、税费、合计
- 填写收款链接并生成付款入口
- 复制给客户的收款文案
- 打印或另存为 PDF
- 导出 / 导入 JSON 草稿
- 使用 localStorage 自动保存当前内容

## 变现执行建议

1. 先把 `src/index.html` 发布为一个免费工具，标题围绕“自由职业者报价单生成器”。
2. 在页面加入真实支付链接：例如 29-99 元买“无水印模板 + 品牌配色 + 部署教程”。
3. 做 3 个垂直版本：设计师报价单、装修报价单、摄影报价单，每个版本使用不同默认项目和术语。
4. 去小红书、知乎、B 站、微信群发布“免费报价单生成器”，引导到付费定制。
5. 有人愿意付费后，再做登录、客户库、在线分享链接等后端功能。

## 目录

```text
project-004-freelance-invoice-kit/
├── docs/
├── outputs/
├── src/
│   ├── app.js
│   ├── calculator.js
│   ├── index.html
│   └── styles.css
├── tests/
│   └── calculator.test.js
└── README.md
```

## 测试

```powershell
node .\tests\calculator.test.js
```
