# 发布说明

## GitHub Pages 自动发布

项目已内置 GitHub Actions 工作流：

```text
.github/workflows/pages.yml
```

推送到 GitHub 仓库的 `main` 分支后，工作流会把 `src/` 目录发布为 GitHub Pages 站点。

## 发布后的检查

- 打开 GitHub 仓库的 `Settings -> Pages`
- 确认 Source 为 `GitHub Actions`
- 等待 `Deploy QuoteCash to GitHub Pages` 工作流完成
- 打开 Pages 地址检查工具是否可用

## 本地验证

```powershell
node .\tests\calculator.test.js
node --check .\src\app.js
node --check .\src\calculator.js
```
