<script lang="tsx">
import { ref, computed, inject, defineComponent } from "vue";
import { NLayout, NLayoutSider, NLayoutHeader } from "naive-ui";
import Split from "./Split.vue";
import { OPTIONS, STORE } from "../Symbols";
import { useSideResize } from "../use/useSideResize";

export default defineComponent(() => {
  /** Inject **/
  const options = inject(OPTIONS) as Grip.LayoutOptions;
  const store = inject(STORE) as Grip.Store;

  /**----- SideBar -----**/
  const SideBar = options.sideBar.component; // 侧边栏实际组件

  const { resize, resizeFinish, sideWidth } = useSideResize();

  const onResize = (e: { left: number }) => {
    resize(e.left);
  };

  const onResizeFinish = () => resizeFinish();

  /**----- HeadBar -----**/
  const HeadBar = options.headBar.component;
  const headStyle = ref({
    height: (() => {
      const h = options.headBar.height;
      if (typeof h === "string") {
        return h;
      }
      return h + "px";
    })(),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 18px",
  });

  /**---- Content -----**/
  const contentLeftPadding = ref(60);
  const contentStyle = computed(() => ({
    padding: "20px",
    paddingRight: "40px",
    paddingLeft: `${contentLeftPadding.value}px`,
    paddingBottom: `0`,
  }));

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
          <slot></slot>
          {/**<slot>{options.useRouter ? <router-view></router-view> : ""}</slot>*/}
        </NLayout>
      </NLayout>
    </NLayout>
  );
});
</script>
<style>
.resizing .n-layout-sider {
  transition: color 0.3s var(--n-bezier), border-color 0.3s var(--n-bezier),
    min-width 0 var(--n-bezier), max-width 0 var(--n-bezier),
    transform 0 var(--n-bezier), background-color 0.3s var(--n-bezier) !important;
}
</style>
