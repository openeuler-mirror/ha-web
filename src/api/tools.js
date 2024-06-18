import request from '@/api/request';
import { CLUSTER } from '@/utils/config';

export function getLogs() {
  return request({
    url: `${CLUSTER}/logs`,
    method: 'get',
  })
}

export function getCmds() {
  return request({
    url: `${CLUSTER}/commands`,
    method: 'get',
  })
}

export function getCmdResult(data) {
  return request({
    url: `${CLUSTER}/commands/` + data,
    method: 'get',
  })
}
