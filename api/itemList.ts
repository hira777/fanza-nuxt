import request from '~/utils/request'

const get = (params?: { keyword?: string }) => {
  return request({
    url: '/ItemList',
    method: 'get',
    params
  })
}

export const itemListService = {
  get
}
