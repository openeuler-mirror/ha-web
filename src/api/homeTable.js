import request from '@/api/request'

export function showClusters(data) {
  return request({
    url: '/clusters',
    method: 'get',
    data
  })
}