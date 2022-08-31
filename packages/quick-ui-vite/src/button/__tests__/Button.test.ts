import Button from "../Button";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
// 测试分组
describe("Button", () => {
  // mount
  test("mount  @vue/test-utils", () => {
    // @vue/test-utils
    const wrapper = shallowMount(Button, {
      slots: {
        default: "Button",
      },
    });

    // 断言
    expect(wrapper.text()).toBe("Button");
  });
});
describe("color", () => {
  test("default", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "Button",
      },
    });
    console.log(wrapper.classes());
    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("bg-blue-500")
    ).toBe(true);
  });
  test("yellow", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "RedButton",
      },
      props: {
        color: "yellow",
      },
    });
    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("bg-yellow-500")
    ).toBe(true);
  });
});

describe("round", () => {
  test("round", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "RoundButton",
      },
      props: {
        round: true,
      },
    });
    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("rounded-full")
    ).toBe(true);
  });
  test("plain:true", () => {
    const wrapper = shallowMount(Button, {
      slots: {
        default: "Button",
      },
      props: {
        plain: true,
      },
    });

    expect(
      wrapper
        .classes()
        .map((v) => v.replace("\n", ""))
        .includes("bg-blue-100")
    ).toBe(true);
  });
});

test("icon", () => {
  const wrapper = shallowMount(Button, {
    slots: {
      default: "Button",
    },
    props: {
      icon: "edit",
    },
  });

  expect(
    wrapper
      .find("i")
      .classes()
      .map((v) => v.replace("\n", ""))
      .includes("i-ic-baseline-edit")
  ).toBe(true);
});
