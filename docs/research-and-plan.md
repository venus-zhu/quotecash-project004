# 调研与实践计划

## 调研结论

- GitHub Pages 适合这个项目的第一版，因为它可以从仓库直接发布 HTML、CSS、JavaScript 静态文件。
- Stripe Payment Links 适合无后端 MVP，因为它允许创建可分享的付款链接，并能放到邮件、社媒或网站里。
- 浏览器原生 `window.print()` 可用于打印当前页面，用户可以从系统打印对话框另存 PDF。
- `localStorage` 可跨浏览器会话保存草稿，但正式产品建议通过 HTTP/HTTPS 托管，不把 `file://` 当稳定运行环境。

## 产品形态

第一版不是做一个泛泛的落地页，而是做一个马上可用的工具：

- 左侧编辑报价/发票信息
- 右侧实时预览正式单据
- 一键打印 / PDF
- 一键复制给客户的付款文案
- 导入 / 导出 JSON 草稿

## 变现路径

| 阶段 | 目标 | 具体动作 |
| --- | --- | --- |
| 1 | 验证需求 | 免费发布工具，收集真实用户反馈 |
| 2 | 第一笔收入 | 售卖 29-99 元模板包或品牌定制版 |
| 3 | 服务收入 | 代部署到客户域名，收费 199-999 元 |
| 4 | SaaS 化 | 增加账号、客户库、在线分享、支付回调 |

## 可复制推广文案

标题：我做了一个自由职业者报价单生成器，能直接打印 PDF 并附收款链接。

正文：如果你经常给客户发报价、催尾款，可以试试这个小工具。填项目、数量、单价后自动算合计，能打印成 PDF，也能复制一段付款文案发给客户。适合设计、开发、摄影、咨询和本地服务。

付费钩子：需要替换成你的品牌颜色、Logo、行业模板和独立网址，可以购买定制版。

## 参考来源

- GitHub Pages 官方文档：说明它可以直接从仓库发布 HTML、CSS、JavaScript 静态文件。
  https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages
- Stripe Payment Links 官方文档：说明可以创建并分享付款链接，无需写代码即可收款。
  https://docs.stripe.com/payment-links
- MDN `window.print()`：用于打开浏览器打印对话框，支持另存 PDF 的产品流程。
  https://developer.mozilla.org/en-US/docs/Web/API/Window/print
- MDN `localStorage`：用于保存本地草稿，并提醒 `file://` 下行为不应作为稳定依赖。
  https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage