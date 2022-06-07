// import CssRender from "css-render";
import { h, Fragment, onUnmounted, ref, watchEffect, PropType, defineComponent } from "vue";

export const Split = defineComponent({
  props: {
    target: {
      type: Object as PropType<Element>,
      default: () => document.body,
    },
  },
  emits: {
    resize: null,
    finish: null,
  },
  setup: (props, ctx) => {
    const resizing = ref(false);

    watchEffect(() => {
      if (resizing.value) {
        document.body.classList.add("resizing");
      } else {
        document.body.classList.remove("resizing");
      }
    });

    const onMouseDown = (e: MouseEvent) => {
      document.oncontextmenu = () => false;
      document.onselectstart = () => false;
      resizing.value = true;
    };
    const onMouseUp = (e: MouseEvent) => {
      document.oncontextmenu = null;
      document.onselectstart = null;
      resizing.value = false;
      
      ctx.emit("finish");
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!resizing.value) return;
      const { left, top, right, bottom } = props.target.getBoundingClientRect();
      ctx.emit("resize", {
        left: e.clientX - left,
        top: e.clientY - top,
        bottom: bottom - e.clientY,
        right: right - e.clientX,
      });
    };

    const rootListenMap = {
      mouseleave: onMouseUp,
      mousemove: onMouseMove,
      mouseup: onMouseUp,
    };

    for (const [k, v] of Object.entries(rootListenMap)) {
      // @ts-ignore
      document.addEventListener(k, v);
    }

    onUnmounted(() => {
      for (const [k, v] of Object.entries(rootListenMap)) {
        // @ts-ignore
        document.removeEventListener(k, v);
      }
    });
    return () => <div class="resize-split" onMousedown={onMouseDown}></div>;
  },
});
