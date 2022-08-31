import { App } from "vue";
import { Button } from "./button";
import SFCButton from "./button/SFCButton.vue";
import JSXButton from "./button/JSXButton";
import 'uno.css';

// 导出单独组件
export { Button, SFCButton, JSXButton };

// 编写一个插件，实现一个install方法

console.log("Button", Button.name);

export default {
  install(app: App): void {
    app.component(Button.name, Button);
    app.component(SFCButton.name, SFCButton);
    app.component(JSXButton.name, JSXButton);
  },
};
