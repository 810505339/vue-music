export interface IAr {
  id: string
  name: string
}

export interface IAl {
  id: string
  name: string
  picUrl: string
}

export interface ISongs {
  name: string
  id: string
  ar: IAr[]
  al: IAl
}
