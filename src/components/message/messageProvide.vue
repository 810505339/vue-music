<template>
  <div>
    <slot />
    <Teleport :to="props.to ?? 'body'">
      <div class="message-wrap">
        <div v-for="message in messageList" :key="message.key">
          <Message :context="message.content" />
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script lang="ts" setup>
import { provide, type VNodeChild } from "vue"
import { key, messageApiInjectionKey } from "./context"
import { $ref } from "vue/macros"
import Message from "@/components/message/message.vue"
import { Guid } from "guid-typescript"

type ContentType = string | (() => VNodeChild)

export interface MessageReactive {
  content: ContentType
}

export interface PrivateMessageReactive extends MessageReactive {
  key: Guid
}

export interface MessageApiInjection {
  info: (content: ContentType) => void
}

interface IProps {
  to?: string
}

const api = {
  info: (context: ContentType) => {
    return create(context)
  }
}
const props = defineProps<IProps>()
let messageList = $ref<PrivateMessageReactive[]>([])
provide<IProps>(key, props)
provide<MessageApiInjection>(messageApiInjectionKey, api)
const create = (content: ContentType) => {
  const messageReactive = $ref({
    content,
    key: Guid.create()
  })
  messageList.push(messageReactive)
}
</script>

<style scoped>
.message-wrap {
  position: fixed;
  display: flex;
  align-items: center;
  flex-direction: column;
  top: 12px;
  left: 0;
  right: 0;
  height: 0;
}
</style>