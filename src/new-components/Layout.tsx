import { defineComponent } from "vue";
import { NLayout, NLayoutSider, NLayoutHeader } from "naive-ui";
import Split from "./Split.vue";

import { useLaypout } from "../use/useLayout";
export default defineComponent((props, ctx) => {
  const {
    options,
    store,
    contentStyle,
    onResize,
    onResizeFinish,
    sideWidth,
    headStyle,
  } = useLaypout();

  const Default = ctx.slots["default"];

  /**----- SideBar -----**/
  const SideBar = ctx.slots["side"] || options.sideBar.component; // 侧边栏实际组件

  /**----- HeadBar -----**/
  const HeadBar = ctx.slots["head"] || options.headBar.component;

  return () => (
    <NLayout has-sider={sideWidth.value !== 0}>
      <NLayoutSider
        native-scrollbar={false}
        collapse-mode="transform"
        collapsed-width={options.sideBar.collapsedWidth}
        width={sideWidth.value}
        show-trigger="bar"
        content-style="padding: 15px; padding-top: 56px;"
        style="height: 100vh"
        bordered
        collapsed={store.collapsed}
        onUpdateCollapsed={(v: boolean) => (store.collapsed = v)}
      >
        <SideBar></SideBar>
      </NLayoutSider>
      {options.sideBar.resizable && !store.collapsed ? (
        <Split onResize={onResize} onFinish={onResizeFinish}></Split>
      ) : (
        ""
      )}
      <NLayout style="height: 100vh">
        <NLayoutHeader style={headStyle.value} bordered>
          <HeadBar></HeadBar>
        </NLayoutHeader>
        <NLayout
          position="absolute"
          content-style={contentStyle.value}
          style="top: 54px; background-color: var(--surface)"
          native-scrollbar={false}
        >
          {/**  @ts-ignore */}
          <Default></Default>
        </NLayout>
      </NLayout>
    </NLayout>
  );
});
