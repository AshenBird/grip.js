<script lang="tsx" setup>
import { NLayout, NLayoutSider, NLayoutHeader } from "naive-ui";
import Split from "./Split.vue";
import { useLaypout } from "../use/useLayout";
const {
  options,
  store,
  contentStyle,
  onResize,
  onResizeFinish,
  sideWidth,
  headStyle,
} = useLaypout();

/**----- SideBar -----**/
const SideBar = options.sideBar.component; // 侧边栏实际组件

/**----- HeadBar -----**/
const HeadBar = options.headBar.component;
</script>
<template>
  <NLayout :has-sider="sideWidth !== 0">
    <NLayoutSider
      :native-scrollbar="false"
      collapse-mode="transform"
      :collapsed-width="options.sideBar.collapsedWidth"
      :width="sideWidth"
      show-trigger="bar"
      content-style="padding: 15px; padding-top: 56px;"
      style="height: 100vh"
      bordered
      :collapsed="store.collapsed"
      @updateCollapsed="(v: boolean) => (store.collapsed = v)"
    >
      <slot name="side">
        <SideBar></SideBar>
      </slot>
    </NLayoutSider>

    <Split
      v-if="options.sideBar.resizable && !store.collapsed"
      @resize="onResize"
      @finish="onResizeFinish"
    ></Split>

    <NLayout style="height: 100vh">
      <NLayoutHeader :style="headStyle" bordered>
        <slot name="head">
          <HeadBar></HeadBar>
        </slot>
      </NLayoutHeader>
      <NLayout
        position="absolute"
        :content-style="contentStyle"
        style="top: 54px; background-color: var(--surface)"
        :native-scrollbar="false"
      >
        <slot></slot>
      </NLayout>
    </NLayout>
  </NLayout>
</template>
