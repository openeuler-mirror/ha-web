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
    url: '/resources/meta_attributes/' + type,
    method: 'get',

  })
}
export function getInstanceAttris(type) {
  return request({
    url: '/meta_attributes/' + type,
    method: 'get',

  })
}
export function getAttris(url) {
  return request({
    url: url,
    method: 'get',

  })
}
export function addItems(data) {
  return request({
    url: '/resources',
    method: 'post',
    data

  })
}
export function deleteItems(url) {
  return request({
    url: url,
    method: 'put',


  })
}
export function updateMigrates(url, data) {
  return request({
    url: url,
    method: 'put',
    data

  })
}
export function updateUnmigrates(url) {
  return request({
    url: url,
    method: 'put',

  })
}

//关系资源位置
export function getResourceRelation(url) {
  return request({
    url: url,
    method: 'get',
  })
}



export function updateLocations(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}
export function updateOrder(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}
export function updateCoordination(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}
export function getRcsDetail(url) {
  return request({
    url: url,
    method: 'get',
  })
}
export function editItem(url, data) {
  return request({
    url: url,
    method: 'put',
    data
  })
}
export function getOperationAttris(type) {
  return request({
    url: '/meta_attributes/' + type,
    method: 'get',
  })


}
export function standbyAction(url) {
  return request({
    url,
    method: 'put',
  })


}
export function runAction(url) {
  return request({
    url,
    method: 'put',
  })


}
