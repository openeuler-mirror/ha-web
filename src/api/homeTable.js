import request from '@/api/request'

export function getResource() {
  return request({
    url: '/resource',
    method: 'get',
 
  })
}
export function getDrdbStatus() {
  return request({
    url: '/drbd_status',
    method: 'get',
 
  })
}
export function easyRequest(req) {
  return request({
    url: req,
    method: 'get',
 
  })
}
