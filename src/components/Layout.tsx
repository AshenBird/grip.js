import { h, Fragment, defineComponent, ref, watch, onMounted, DefineComponent } from "vue";
import { NLayout, NLayoutSider, NLayoutHeader } from "naive-ui";
import { Split } from "./Split";

import { useLayout } from "../use/useLayout";
export default defineComponent((props, ctx) => {
  const {
    options,
    store,
    contentStyle,
    onResize,
    onResizeFinish,
    sideWidth,
    headStyle,
  } = useLayout();
  const Default = ctx.slots["default"];

  /**----- SideBar -----**/
  const SideBar = ctx.slots["side"] || options.sideBar.component; // 侧边栏实际组件

  /**----- HeadBar -----**/
  const HeadBar = ctx.slots["head"] || options.headBar.component;

  const content = ref<null|DefineComponent>(null);
  onMounted(()=>{
    store.content.height = content.value?.$el.querySelector(".n-scrollbar-content")?.clientHeight - 40 as number
    window.addEventListener("resize",()=>{
      store.content.height = content.value?.$el.querySelector(".n-scrollbar-content")?.clientHeight - 40 as number
    })
  })
  return () => (
    <NLayout has-sider={sideWidth.value !== 0}>
      {{
        default: () => (
          <>
            <NLayoutSider
              native-scrollbar={false}
              collapse-mode="transform"
              collapsed-width={options.sideBar.collapsedWidth}
              width={sideWidth.value}
              show-trigger="bar"
              content-style="padding: 15px; padding-top: 56px;"
              // @ts-ignore
              style="height: 100vh"
              bordered
              collapsed={store.collapsed}
              onUpdateCollapsed={(v: boolean) => (store.collapsed = v)}
            >
              {{ default: SideBar }}
            </NLayoutSider>
            {options.sideBar.resizable && !store.collapsed ? (
              <Split onResize={onResize} onFinish={onResizeFinish}></Split>
            ) : (
              ""
            )}
            <NLayout
              // @ts-ignore
              style="height: 100vh"
            >
              {{
                default: () => (
                  <>
                    <NLayoutHeader
                      // @ts-ignore
                      style={headStyle.value}
                      bordered
                    >
                      {{
                        default: () => <HeadBar></HeadBar>,
                      }}
                    </NLayoutHeader>
                    <NLayout
                      position="absolute"
                      content-style={contentStyle.value}
                      // @ts-ignore
                      style="top: 54px; background-color: var(--surface)"
                      native-scrollbar={false}
                      ref={content}
                    >
                      {{ default: Default }}
                    </NLayout>
                  </>
                ),
              }}
            </NLayout>
          </>
        ),
      }}
    </NLayout>
  );
});
