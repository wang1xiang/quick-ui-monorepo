import Text from "../Input";

import { shallowMount } from "@vue/test-utils";
import { describe, expect, test } from "vitest";
// 测试分组
describe("Text", () => {
  // mount
  test("mount  @vue/test-utils", () => {
    // @vue/test-utils
    const wrapper = shallowMount(Text, {
      slots: {
        default: "Text",
      },
    });

    // 断言
    expect(wrapper.text()).toBe("Text");
  });
});
describe("color", () => {
  test("default", () => {
    const wrapper = shallowMount(Text, {
      slots: {
        default: "Text",
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
    const wrapper = shallowMount(Text, {
      slots: {
        default: "RedText",
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
    const wrapper = shallowMount(Text, {
      slots: {
        default: "RoundText",
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
    const wrapper = shallowMount(Text, {
      slots: {
        default: "Text",
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
  const wrapper = shallowMount(Text, {
    slots: {
      default: "Text",
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
