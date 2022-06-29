<script lang="ts" setup>
import { createLayout } from "../src";
// import { createLayout } from "../dist/es";

const { component: Layout, useRefresh, useLayout } = createLayout();

useRefresh(()=>{
  console.log('refresh')
}) 

const { store } = useLayout()

const refresh = useRefresh();
setTimeout(() => {
  console.log(store.content)
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
