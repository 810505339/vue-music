import { defineStore } from 'pinia'
import type { ISongs } from '@/stores/types'

interface ISongList {
  songs: ISongs[]
  index: number
}

const songListStore = defineStore<string, ISongList>('songList', {
  state: () => ({
    songs: [],
    index: 0, //目前是哪首歌
  }),
  actions: {},
})

export default songListStore
