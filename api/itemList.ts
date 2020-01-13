import request from '~/utils/request'
import { RequestParameter } from '~/api/itemList.types'

const get = (params?: RequestParameter) => {
  return request({
    url: '/ItemList',
    method: 'get',
    params
  })
}

export const itemListService = {
  get
}
