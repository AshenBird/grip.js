<script lang="ts" setup>
import { createLayout } from "../src/index";

const { component: Layout } = createLayout();
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
