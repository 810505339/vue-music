<script lang="ts" setup>
import { $computed, $ref, RefTypes } from 'vue/macros'
import { onMounted } from 'vue'
import { getDetail, getMusic } from '@/api/server'
import type { ISongs } from '@/stores/types'
import { MenuIcon, PauseIcon, PlayIcon } from '@heroicons/vue/solid'
import dayjs from 'dayjs'
import { NSlider } from 'naive-ui'

let audio = $ref<HTMLAudioElement>() //html audio
let songs = $ref<ISongs[]>([])
let currentTime = $ref<number>(0) //正在播放的时间
let duration = $ref(0) //总时间
let progress = $ref(0) //进度0-100
let isPlaying = $ref(false) //是否正在播放
let isMove = $ref(false) //是否正在拖拽

const currentTimerFormat = $computed(() =>
  dayjs.unix(currentTime).format('mm:ss')
) //显示的正在播放的时间
const durationFormat = $computed(() => dayjs.unix(duration).format('mm:ss')) //显示的总时间
//获取进度条转mm:ss转换成xx秒
const time = $computed<number>(() => (progress * duration) / 100)

const getDetailApi = async () => {
  const data = await getDetail<{ songs: ISongs[] }>('525239752')
  audio.src = getMusic('525239752')
  songs = data.songs
}
//初始化完成以后
const canplay = () => {
  duration = audio.duration
  currentTime = audio.currentTime
}
//点击播放
const play = async () => {
  isPlaying = true
  await audio.play()
}
//点击暂停
const pause = async () => {
  isPlaying = false
  await audio.pause()
}

//播放更新
const updateTime = (e: Event) => {
  const player = e.target as HTMLAudioElement
  if (!isMove) {
    currentTime = player.currentTime
    progress = (currentTime / duration) * 100
  }
}

const updateSlider = (value: number) => {
  progress = value
  currentTime = time as RefTypes.Ref
}

const mouseup = () => {
  isMove = false
  audio.currentTime = currentTime
}
const mousedown = () => {
  isMove = true
}

onMounted(async () => {
  await getDetailApi()
})
</script>
<template>
  <div class="max-w-3xl mx-auto">
    <audio
      ref="audio"
      class="hidden"
      controls
      @canplay="canplay"
      @timeupdate="updateTime" />
    <div
      class="bg-white border-slate-100 dark:bg-slate-800 dark:border-slate-500 border-b rounded-t-xl p-4 pb-6 sm:p-10 sm:pb-8 lg:p-6 xl:p-10 xl:pb-8 space-y-6 sm:space-y-8 lg:space-y-6 xl:space-y-8">
      <div class="flex items-center space-x-4">
        <img
          :src="songs[0]?.al?.picUrl"
          alt
          class="flex-none rounded-lg bg-slate-100"
          height="88"
          width="88" />
        <div class="min-w-0 flex-auto space-y-1 font-semibold">
          <h2
            class="text-slate-500 dark:text-slate-50 text-2xl leading-6 truncate">
            {{ songs[0]?.name }}
          </h2>
          <p class="text-slate-900 dark:text-slate-400 text-sm">
            {{ songs[0]?.ar[0].name }}
          </p>
        </div>
      </div>
      <div class="space-y-2">
        <div class="relative">
          <NSlider
            v-model:value="progress"
            :on-update:value="updateSlider"
            :step="1"
            :tooltip="false"
            @mousedown="mousedown"
            @mouseup="mouseup"></NSlider>
        </div>
        <div
          v-if="audio"
          class="flex justify-between text-sm leading-6 font-medium tabular-nums">
          <div class="text-cyan-500 dark:text-slate-100">
            {{ currentTimerFormat }}
          </div>
          <div class="text-slate-500 dark:text-slate-400">
            {{ durationFormat }}
          </div>
        </div>
      </div>
    </div>
    <div
      class="bg-slate-50 text-slate-500 dark:bg-slate-600 dark:text-slate-200 rounded-b-xl flex items-center">
      <div class="flex-auto flex items-center justify-evenly">
        <button
          aria-label="Previous"
          class="hidden sm:block lg:hidden xl:block"
          type="button">
          <svg fill="none" height="24" width="24">
            <path
              d="m10 12 8-6v12l-8-6Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
            <path
              d="M6 6v12"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
          </svg>
        </button>
      </div>
      <button
        class="flex-none -my-2 mx-auto w-20 h-20 flex items-center justify-center"
        type="button">
        <PlayIcon
          v-if="!isPlaying"
          class="text-slate-100 w-14 h-14"
          @click="play" />
        <PauseIcon v-else class="text-slate-100 w-14 h-14" @click="pause" />
      </button>
      <div class="flex-auto flex items-center justify-evenly">
        <button
          aria-label="Next"
          class="hidden sm:block lg:hidden xl:block"
          type="button">
          <svg fill="none" height="24" width="24">
            <path
              d="M14 12 6 6v12l8-6Z"
              fill="currentColor"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
            <path
              d="M18 6v12"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2" />
          </svg>
        </button>
        <button
          aria-label="Next"
          class="hidden sm:block lg:hidden xl:block"
          type="button">
          <MenuIcon class="h-6 w-6" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped></style>
