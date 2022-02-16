<script lang="ts" setup>
import { RouterView } from 'vue-router'
import MessageProvide from '@/components/message/messageProvide.vue'
</script>

<template>
  <MessageProvide>
    <RouterView />
  </MessageProvide>
</template>
