import requirer from 'requirer';
import { resolve } from 'path';
import fs from 'fs';
import handlebars from 'handlebars';
import clone from '../utils/clone.js';
import inquirer from "inquirer";
import { log } from '../utils/utils.js';

export default async() => {
  const { name } = await inquirer.prompt([
    {
      type: 'input', /* 选项框 */
      message: '请输入项目名称?',
      name: 'name'
    }
  ])

  log('创建项目: ' + name);
  // 克隆github项目到指定的文件夹
  await clone("github:smarty-team/smarty-ui-app-js-template", name);
  // 生成路由定义
  compile(
    {
      name,
    },
    `./${name}/package.json`,
    `./${name}/template/package.hbs.json`
  );

  log(`
  👌 安装完成：
  To get start:
  ==========================
  cd ${name}
  npm i
  npm run dev
  ==========================
  `)
}

/**
 * 编译模板文件
 * @param meta 数据定义
 * @param filePath 目录文件路径
 * @param templatePath 模板文件路径
 */

function compile(meta, filePath, templatePath) {
  if (fs.existsSync(templatePath)) {
    const content = fs.readFileSync(templatePath).toString();
    const result = handlebars.compile(content)(meta);
    fs.writeFileSync(filePath, result);
    log(`📚 ${filePath} 修改成功`);
  } else {
    log(`❌ ${filePath} 修改失败`);
  }
}