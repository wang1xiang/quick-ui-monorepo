### pnpm搭建Monorepo

1. 修改软件包目录

   ```bash
    ├── packages
    |   ├── quick-ui-vite  # UI组件库
    |   |   ├── package.json
    |   ├── docs-ui # docs文档
    |   |   ├── package.json
    ├── package.json
   ```

   添加packages目录，移动组件库所有文件到quick-ui-vite下
2. 初始化monorepo包

   ```bash
   pnpm init
   ```

   项目中应禁止使用yarn和npm，否则会有兼容问题，使用`preinstall npm hook`钩子，在安装模块前触发，检查代码是否使用pnpm运行，如果不是的话会报错并退出

   ```json
   "scripts": {
     "preinstall": "node ./scripts/preinstall.js"
   }
   ```

   ```js
   // preinstall.js
   if (!/pnpm/.test(process.env.npm_execpath || '')) {
    console.warn(
      `\u001b[33mThis repository requires using pnpm as the package manager` +
        `for scripts to work properly.\u001b[39m\n`
    )
    process.exit(1)
   }

   ```

   或者可以考虑使用

   ```json
   "scripts": {
      "preinstall": "npx only-allow pnpm"
    }
   ```

3. 初始化工作空间
   创建pnpm-workspace.yaml，用于声明所有软件包全部存放在packages目录中
4. 创建新的项目
   - 初始化项目

     ```bash
     mkdir docs-vite
     cd docs-vite
     pnpm init
     ```

   - 安装vite
     如果多个项目同时依赖一个包，需要将依赖安装到workspace中，这样每个包都无需在单独安装，例如vite

     ```bash
     # 安装vite到workspace中 -w表示全局安装 当前项目全局
     pnpm i vite -w
     ```
  
   - 安装vue

     ```bash
     # 如果只安装在子package中，可以使用-r
     # 子package安装
     pnpm i vue -r --filter quick-ui-vite
     # 或者 直接在docs-vite目录下
     pnpm i vue
     ```

   - 将quick-ui-vite安装到docs-vite中

     ```bash  
     # 内部依赖package安装
     pnpm i quick-ui-vite -r --filter docs-vite
     ```

   - 安装后，docs-vite中quick-ui-vite位置会指向workspace，这就是monorepo的精髓所在

     ```json
     ...
     "quick-ui-vite": "workspace:^1.0.0",
     ...
     ```

   - 编辑index.html测试
   - 在scripts中添加dev脚本，pnpm dev启动测试
