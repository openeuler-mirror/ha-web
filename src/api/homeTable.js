import request from '@/api/request';
import { CLUSTER } from '@/utils/config'

// 获取资源
export function getResource() {
  return request({
    url: `${CLUSTER}/resources`,
    method: 'get',
  })
}

// 添加资源
export function addItems(data) {
  return request({
    url: `${CLUSTER}/resources`,
    method: 'post',
    data
  })
}

// 修改资源信息
export function editItem({id, data}) {
  return request({
    url: `${CLUSTER}/resources/${id}`,
    method: 'put',
    data
  })
}

// 资源操作
export function easyRequest(data) {
  return request({
    url: `${CLUSTER}/resources/${data.id}/${data.action}`,
    method: 'put',
  })
}
export function deleteItems(id) {
  return request({
    url:  `${CLUSTER}/resources/${id}/delete`,
    method: 'put',
  })
}
export function updateMigrates({id, data}) {
  return request({
    url: `${CLUSTER}/resources/${id}/migrate`,
    method: 'put',
    data
  })
}
export function updateLocations({id, data}) {
  return request({
    url: `${CLUSTER}/resources/${id}/location"`,
    method: 'put',
    data
  })
}
export function updateOrder({id, data}) {
  return request({
    url: `${CLUSTER}/resources/${id}/order`,
    method: 'put',
    data
  })
}
export function updateCoordination({id, data}) {
  return request({
    url: `${CLUSTER}/resources/${id}/colocation`,
    method: 'put',
    data
  })
}

// 获取关系资源位置信息
export function getResourceRelation({id, action}) {
  return request({
    url: `${CLUSTER}/resources/${id}/relations/${action}`,
    method: 'get',
  })
}


export function getRcsDetail(data) {
  return request({
    url: `${CLUSTER}/resources/${data.id}?category=${data.category}`,
    method: 'get',
  })
}

// 获取资源元属性
export function getMetaAttris(type) {
  return request({
    url: `${CLUSTER}/resources/meta_attributes/` + type,
    method: 'get',
  })
}

// 获取metas信息
export function getMetas() {
  return request({
    url: `${CLUSTER}/metas`,
    method: 'get',
  })
}

// 获取资源创建信息
export function getAttris(data) {
  let url = data.provider 
    ? `/${data.class}/${data.type}/${data.provider}`
    : `/${data.class}/${data.type}`;

  return request({
    url: ` ${CLUSTER}/metas` + url,
    method: 'get',
  })
}


export function getOperationAttris(type) {
  return request({
    url: `${CLUSTER}/meta_attributes/` + type,
    method: 'get',
  })
}

export function getInstanceAttris(type) {
  return request({
    url: `${CLUSTER}/meta_attributes/` + type,
    method: 'get',
  })
}


export function getDrdbStatus() {
  return request({
    url: `${CLUSTER}/drbd_status`,
    method: 'get',
  })
}

// 节点状态修改
export function standbyAction({id, action}) {
  return request({
    url: `${CLUSTER}/nodes/${id}/${action}`,
    method: 'put',
  })
}
export function runAction({id, action}) {
  return request({
    url: `${CLUSTER}/nodes/${id}/${action}`,
    method: 'put',
  })
}
