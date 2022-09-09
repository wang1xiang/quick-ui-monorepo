#!/usr/bin/env node
import figlet from "figlet";
import clear from "clear";
import inquirer from "inquirer";
import chalkAnimation from "chalk-animation";
import { log } from "../lib/utils/utils.js";

log('这里会被clear...')
const opt = {
  "QuickUI应用模版(Vite)": "quick-ui-vite",
  QuickAdmin模版: "admin",
  组件库脚手架: "uitemplate",
  组件库文档网站: "uitemplate",
  退出: "quit",
};

const question = [
  {
    type: "rawlist" /* 选择框 */,
    message: "请选择要创建的项目？",
    name: "operation",
    choices: Object.keys(opt),
  },
];

// 打印欢迎画面
clear();
const logo = figlet.textSync("Quick UI!", {
  // font: "Ghost",
  horizontalLayout: "default",
  verticalLayout: "default",
  width: 80,
  whitespaceBreak: true,
});

const rainbow = chalkAnimation.rainbow(logo);
setTimeout(() => {
  rainbow.stop(); // Animation stops
  query();
}, 500);


async function query() {
  log('欢迎使用quick-ui');
  const answer = await inquirer.prompt(question);

  if (answer.operation === "退出") return;

  const { default: op } = await import(
    `../lib/operations/${opt[answer.operation]}.js`
  );
  await op();
}