import { defineComponent, PropType } from "vue";
import "uno.css";

export type ISize = "small" | "medium" | "large";
// 定义color
export type IColor =
  | "black"
  | "gray"
  | "red"
  | "yellow"
  | "green"
  | "blue"
  | "indigo"
  | "purple"
  | "pink";
export const props = {
  color: {
    type: String as PropType<IColor>,
    default: "blue", // 默认颜色
  },
  icon: {
    type: String,
    default: "",
  },
  size: {
    type: String as PropType<ISize>,
    default: "medium",
  },
  round: {
    type: Boolean,
    default: false,
  },
  plain: {
    type: Boolean,
    default: false,
  },
} as const;
export default defineComponent({
  name: "SButton",
  props,
  setup(props) {
    console.log(`html`, document.querySelector(`#app`)?.innerHTML);
    const { color, size, ...args  } = props;
    const fontSize = {
      small: {
        x: "2",
        y: "1",
        text: "sm",
      },
      medium: {
        x: "3",
        y: "1.5",
        text: "base",
      },
      large: {
        x: "4",
        y: "2",
        text: "lg",
      },
    };

    return () => (
      <input
        class={`
        bg-${props.color}-${props.plain ? "100" : "500"}
        hover:bg-${props.color}-400
        border-${props.color}-${props.plain ? "500" : "500"}
        border-solid
        text-${props.plain ? props.color + "-500" : "white"}
        text-${fontSize[size].text}
        hover:text-white
        transition duration-300 ease-in-out transform hover:scale-105
        mx-1
      `}
       {...args}
      />
    );
  },
});
