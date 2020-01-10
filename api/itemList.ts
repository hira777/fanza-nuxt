import request from '~/utils/request'

export const getItemList = (params?: { keyword?: string }) => {
  return request({
    url: '/ItemList',
    method: 'get',
    params
  })
}
