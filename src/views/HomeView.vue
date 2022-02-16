<script lang="ts" setup>
import useMessage from '@/components/message/useMessage'

const message = useMessage()
const counterStore = useCounterStore()

const handleClick = () => {
  clearInterval(counterStore.$state.timerId)
  message.info('停止弹窗')
}
</script>

<template>
  <main>
    <button @click="handleClick">按钮</button>
    {{ counterStore.$state.counter }}
  </main>
</template>
