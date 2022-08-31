/// <reference types="vitest" />
import { defineConfig, Plugin } from "vite";
import vueJsx from "@vitejs/plugin-vue-jsx";
import vue from "@vitejs/plugin-vue";
import Unocss from "./config/unocss";
import { UserConfig } from "vite";

const rollupOptions = {
  external: ["vue", "vue-router"],
  output: {
    assetFileNames: "[name].[ext]",
    exports: "named",
    globals: {
      vue: "Vue",
    },
  },
};
export const config = {
  plugins: [
    vue() as Plugin, // 添加JSX插件
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }) as Plugin,
    // 添加UnoCSS插件
    Unocss() as Plugin[]
  ],
  // 添加库模式配置
  build: {
    rollupOptions,
    minify: 'terser', // boolean | 'terser' | 'esbuild' 是否开启混淆 两个混淆工具  terser、esbuild
    sourcemap: true, // 输出单独 source文件
    brotliSize: true,  // 生成压缩大小报告
    cssCodeSplit: true,
    lib: {
      entry: "./src/entry.ts",
      name: "QuickUI",
      fileName: "quick-ui", // 输出文件名的前缀，和模块类型配合组成最终的文件名
      // @ts-ignore
      formats: ["esm", "umd", "iife"], // 导出模块类型
    },
    outDir: "./dist"
  },
  // vitest配置
  test: {
    // enable jest-like global test APIs
    globals: true,
    // simulate DOM with happy-dom
    // (requires installing happy-dom as a peer dependency)
    environment: 'happy-dom',
    // 支持tsx组件，很关键
    transformMode: {
      web: [/.[tj]sx$/]
    }
  }
}
export default defineConfig(config as UserConfig);
