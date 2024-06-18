import request from '@/api/request';
import { CLUSTER } from '@/utils/config'

export function getConfigs() {
  return request({
    url: `${CLUSTER}/configs`,
    method: 'get',
  })
}

export function updateHB(data) {
  return request({
    url: `${CLUSTER}/configs`,
    method: 'post',
    data
  })
}

export function getPriorities() {
  return request({
    url: `${CLUSTER}`,
    method: 'get',
  })
}

export function update(data) {
  return request({
    url: `${CLUSTER}`,
    method: 'put',
    data
  })
}
