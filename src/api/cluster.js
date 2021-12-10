import request from '@/api/request'

export function getConfigs() {
  return request({
    url: '/configs',
    method: 'get',
  })
}

export function getPriorities() {
  return request({
    url: '/',
    method: 'get',
  })
}
export function update(data) {
  return request({
    url: '/',
    method: 'put',
    data
  })
}
export function updateHB(data) {
  return request({
    url: '/configs',
    method: 'POST',
    data
  })
}