import request from '@/api/request'

export function getNodes() {
  return request({
    url: '/nodes',
    method: 'get',
 
  })
}
