import axios from 'axios'

const service = axios.create({
  baseURL: 'https://api.dmm.com/affiliate/v3/',
  timeout: 5000
})

service.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    ...{
      api_id: process.env.API_ID,
      affiliate_id: process.env.AFFILIATE_ID,
      site: 'FANZA',
      service: 'digital',
      floor: 'videoa'
    }
  }
  return config
})

export default service
