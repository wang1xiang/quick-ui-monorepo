import * as path from "path";
import { config } from "../vite.config";
import { build, defineConfig, InlineConfig, UserConfig } from "vite";
import * as fs from "fs-extra";

const buildAll = async () => {
  // 1. 导入vite.config中的配置，使用vite的build方法进行全量打包
  await build(defineConfig(config as UserConfig) as InlineConfig);

  // 2. 读取文件夹 遍历组件库文件夹
  const srcDir = path.resolve(__dirname, "../src/");

  const outDistDir = config.build.outDir;
  fs.readdirSync(srcDir)
    .filter((name) => {
      // 过滤出文件夹中包含index.ts的文件夹
      const componentDir = path.resolve(srcDir, name);
      const isDir = fs.lstatSync(componentDir).isDirectory();
      return isDir && fs.readdirSync(componentDir).includes("index.ts");
    })
    // 3. 为每个模块定制不同的编译规则，编译规则
    .forEach(async (name) => {
      // name：每个文件夹的名称
      const outDir = path.resolve(outDistDir, name); //./dist/button
      const custom = {
        lib: {
          entry: path.join(srcDir, name),
          name, // 导出模块名 name: button
          fileName: "index",
          format: ["esm", "umd"],
        },
        outDir,
      };
      Object.assign(config.build, custom);
      await build(defineConfig(config as UserConfig) as InlineConfig);

      /*4. 为子模块定制自己的package.json文件 格式
        {
          "name": "quick-ui-vite/Button",
          "main": "index.umd.js",
          "module": "index.umd.js"
        }
       */
      fs.outputFile(
        path.resolve(outDir, `package.json`),
        `{
          "name": "quick-ui-vite/${name}",
          "main": "index.umd.js",
          "module": "index.umd.js"
        }`,
        `utf-8`
      );
    });
};
buildAll();
