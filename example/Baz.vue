<script lang="ts" setup>
import { createLayout } from "../dist/es";
// import { createLayout } from "../src";

const { component: Layout, useRefresh } = createLayout();

useRefresh(()=>{
  console.log('refresh')
})
const refresh = useRefresh();
setTimeout(() => {
  refresh();
}, 3000);
</script>
<template>
  <Layout>
    <template #head>
      <div>head</div>
    </template>
    <template #default>
      <div>body</div>
    </template>
    <template #side>
      <div>side</div>
    </template>
  </Layout>
</template>
