import { inject } from "vue"
import { messageApiInjectionKey } from "@/components/message/context"
import type { MessageApiInjection } from "@/components/message/messageProvide.vue"

export default function useMessage(): MessageApiInjection {
  const api = inject<MessageApiInjection | null>(messageApiInjectionKey, null)
  if (api === null) {
    throw new Error("错误")
  }

  return api
}