import axios from 'axios'

const instance = axios.create({
  baseURL: 'api',
})
// 添加请求拦截器
instance.interceptors.request.use((config) => {
  return config
})
//相应拦截器
instance.interceptors.response.use((response) => {
  return response.data
})

const getMusic = (id: string) => {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}
const getDetail = <T>(id: string): Promise<T> => {
  return instance.get(`/song/detail?ids=${id}`)
}

export { instance, getMusic, getDetail }
