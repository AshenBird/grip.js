<script lang="ts" setup>
import CssRender from "css-render";
import { onUnmounted, ref, watchEffect, PropType } from "vue";

const emit = defineEmits({
  resize: null,
  finish:null
});
const props = defineProps({
  target:{
    type: Object as PropType<Element>,
    default: ()=>document.body
  }
})
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
  emit("finish");
};
const onMouseMove = (e: MouseEvent) => {
  if (!resizing.value) return;
  const { left, top, right, bottom } = props.target.getBoundingClientRect();
  emit("resize", {
    left: e.clientX - left,
    top: e.clientY - top,
    bottom: bottom - e.clientY ,
    right: right - e.clientX
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


</script>
<template>
  <div class="resize-split" @mousedown="onMouseDown"></div>
</template>
