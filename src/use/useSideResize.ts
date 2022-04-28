import { ref,  inject, toRaw } from "vue";
import {  STORE } from "../Symbols";
import gsap from "gsap";
export const useSideResize = () => {
  /** Constant **/
  const SIDEBAR_MIN_WIDTH = 200;
  const GET_HALF_WINDOW_WIDTH = () => window.innerWidth / 2;
  const store = inject(STORE) as Grip.Store;

  const sideWidth = ref(250); // 侧边栏宽度
  const wr = ref(store.sideBar.width); //
  const setSidebarWidth = (w: number) => {
    const halfWindowWidth = GET_HALF_WINDOW_WIDTH();
    if (w < 200) {
      sideWidth.value = SIDEBAR_MIN_WIDTH;
    } else if (w > halfWindowWidth) {
      sideWidth.value = halfWindowWidth;
    } else {
      sideWidth.value = w;
    }
    wr.value = [toRaw(sideWidth.value), window.innerWidth];
    store.sideBar.width = wr.value;
  };

  setSidebarWidth(Math.ceil((window.innerWidth * wr.value[0]) / wr.value[1]));

  window.onresize = () => {
    setSidebarWidth(sideWidth.value);
  };

  let currentAnimate: null | gsap.core.Tween = null;

  const resize = (left:number) => {
    if (left < SIDEBAR_MIN_WIDTH) return;
    if (left > GET_HALF_WINDOW_WIDTH()) return;

    currentAnimate = gsap.to(sideWidth, {
      ease: "none",
      duration: 0.05,
      value: left,
    });
    wr.value = [left, window.innerWidth];
    setSidebarWidth(Math.ceil((window.innerWidth * wr.value[0]) / wr.value[1]));
  };

  const resizeFinish = () => {
    if (currentAnimate === null) return;
    currentAnimate.kill();
  };
  return {
    resize,
    resizeFinish,
    sideWidth
  }
};
