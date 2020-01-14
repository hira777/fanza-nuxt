import service from '~/utils/request'
import { RequestParameter, Response } from '~/api/itemList.types'

const get = (params?: RequestParameter) => {
  return service.request<Response>({
    url: '/ItemList',
    method: 'get',
    params
  })
}

export const itemListService = {
  get
}
