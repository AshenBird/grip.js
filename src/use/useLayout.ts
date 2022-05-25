import { ref, computed, inject, provide } from "vue";
import { useSideResize } from "../use/useSideResize";
import { OPTIONS, STORE, REFRESH, INNER_OPTION } from "../Symbols";
// import CssRender from "css-render";
export const useLaypout = () => {
  /** Inject Base Data**/
  const options = inject(OPTIONS) as Grip.LayoutOptions;
  const store = inject(STORE) as Grip.Store;
  const innerOption = inject(INNER_OPTION) as Grip.InnerOption;
  
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

  /**---- Refresh -----**/

  const refresh = (...args:any[])=>{
    return innerOption.refresh(...args)
  }

  return {
    options,
    store,
    contentStyle,
    onResize,
    onResizeFinish,
    sideWidth,
    headStyle,
    refresh
  };
};
