import Input from "./Input";
import { App } from "vue";

export { Input };
export default {
  install(app: App) {
    app.component(Input.name, Input);
  },
};
