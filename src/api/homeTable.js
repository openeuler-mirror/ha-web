import request from '@/api/request'

export function getResource() {
  return request({
    url: '/resources',
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
    method: 'PUT',
 
  })
}
export function getMetas() {
  return request({
    url: '/metas',
    method: 'get',
 
  })
}
export function getMetaAttris(type) {
  return request({
    url: '/resources/meta_attributes/'+type,
    method: 'get',
 
  })
}
export function getInstanceAttris(type) {
  return request({
    url: '/meta_attributes/'+type,
    method: 'get',
 
  })}
export function getAttris(url) {
  return request({
    url: url,
    method: 'get',
 
  })
}
export function getOperationAttris(type) {
  return request({
    url: '/meta_attributes/'+type,
    method: 'get',
 
  })


}
