import type { InjectionKey } from "vue"

const key = Symbol("messageProvide") as InjectionKey<string>
const messageApiInjectionKey = Symbol(
  "messageApiInjectionKey"
) as InjectionKey<string>

export { key, messageApiInjectionKey }