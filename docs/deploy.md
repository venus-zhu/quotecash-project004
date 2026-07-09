# 发布说明

## 当前发布方式

项目已经发布到 GitHub Pages：

```text
https://venus-zhu.github.io/quotecash-project004/
```

当前采用 `gh-pages` 分支发布。该分支根目录镜像 `src/`，包含工具页、销售页、付款成功页、政策页、脚本、样例模板和站点索引文件。

## 更新发布

修改 `src/` 后，同步更新远程 `gh-pages` 分支即可发布新版。当前仓库的 `main` 分支保留完整项目文档、源码、测试和交付物。

## 本地验证

```powershell
node .\tests\calculator.test.js
node --check .\src\app.js
node --check .\src\calculator.js
```