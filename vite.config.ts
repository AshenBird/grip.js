import { defineConfig, UserConfigExport } from "vite";
import vue from "@vitejs/plugin-vue";
import jsx from "@vitejs/plugin-vue-jsx";
import * as path from "path";

const isBuild = process.env.NODE_ENV === "production";
const UI_LIB = process.env.UI_LIB;

const uiLibs = {
  naive: {
    moduleName: "naive-ui",
    globalName: "",
  },
};

const options: UserConfigExport = {
  plugins: [vue(), jsx()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "./src/index.ts"),
      name: "grip",
      fileName: (format) => `grip.${format}.js`, //${UI_LIB ? UI_LIB + "." : ""}
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ["vue"],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: "Vue",
        },
      },
    },
  },
  resolve: {
    // 别名
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
};

if (!isBuild) {
  options.root = path.resolve(__dirname, "./example");
} else {
  if (UI_LIB) {
    const lib = uiLibs[UI_LIB] as { moduleName: string; globalName: string };
    // @ts-ignore
    options.build.rollupOptions.external.push(lib.moduleName);
    if (lib.globalName) {
      // @ts-ignore
      options.build.rollupOptions.output.globals[lib.moduleName] =
        lib.globalName;
    } else {
      // @ts-ignore
      options.build.lib.formats = ["es"];
    }
    options.build.outDir = `dist/${UI_LIB}`;
  } else {
    options.build.outDir = `dist/common`;
  }
}

export default defineConfig(options);
