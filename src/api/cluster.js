import request from '@/api/request'

export function getConfigs() {
  return request({
    url: '/configs',
    method: 'get',
  })
}

export function getPriorities() {
  return request({
    url: '/v1/clusters/1',
    method: 'get',
  })
}