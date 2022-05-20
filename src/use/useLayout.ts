import { ref, computed, inject } from "vue";
import { useSideResize } from "../use/useSideResize";
import { OPTIONS, STORE } from "../Symbols";
import CssRender from "css-render";
export const useLaypout = () => {
  /** Inject **/
  const options = inject(OPTIONS) as Grip.LayoutOptions;
  const store = inject(STORE) as Grip.Store;

  /** Padding **/
  const rightPaddingLeft = ref(30);

  /**----- SideBar -----**/
  const { resize, resizeFinish, sideWidth } = useSideResize();
  const onResize = (e: { left: number }) => {
    resize(e.left);
  };
  const onResizeFinish = () => resizeFinish();

  /**----- HeadBar -----**/
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
    paddingLeft: `${rightPaddingLeft.value}px`,
  });

  /**---- Content -----**/
  // const contentLeftPadding = ref(30);
  const contentStyle = computed(() => ({
    padding: "20px",
    paddingRight: "40px",
    paddingLeft: `${rightPaddingLeft.value}px`,
    paddingBottom: `0`,
  }));

  return {
    options,
    store,
    contentStyle,
    onResize,
    onResizeFinish,
    sideWidth,
    headStyle,
  };
};
