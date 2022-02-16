<template>
  <div v-if="show" class="message">
    <div>
      {{ context }}
      {{ flag }}
    </div>
    <div class="message-close" @click="handleClose">X</div>
  </div>
</template>
<script lang="ts" setup>
import type { VNodeChild } from "vue"
import { onMounted } from "vue"
import { $computed, $ref } from "vue/macros"

let show = $ref(true)

interface IProps {
  context: string | (() => VNodeChild)
}

const handleClose = () => {
  show = false
}

const flag = $computed(() => {
  const a: string | string[] = []
  return a.includes("1") ? 1 : 0
})

const setTimeoutClose = () => {
  setTimeout(handleClose, 3000)
}
onMounted(() => {
  setTimeoutClose()
})

defineProps<IProps>()
</script>
<style scoped>
.message {
  padding: 10px 20px;
  background: #48484e;
  color: #ffffffd1;
  border-radius: 3px;
  border: none;
  box-shadow: 0 3px 6px -4px #0000001f, 0 6px 16px 0 #00000014,
    0 9px 28px 8px rgba(0, 0, 0, 0.05);
  box-sizing: border-box;
  display: flex;
  align-items: center;
}

.message-close {
  margin-left: 20px;
}
</style>