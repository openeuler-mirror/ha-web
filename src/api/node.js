import request from '@/api/request';
import { CLUSTER } from '@/utils/config';

export function getNodes() {
  return request({
    url: `${CLUSTER}/nodes`,
    method: 'get',
  })
}
