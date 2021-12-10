import request from '@/api/request'

export function getLogs() {
  return request({
    url: '/logs',
    method: 'get',
  })
}

export function getCmds() {
  return request({
    url: '/commands',
    method: 'get',
  })
}

export function getCmdResult(data) {
  return request({
    url: '/commands/'+data,
    method: 'get',
    
  })
}
