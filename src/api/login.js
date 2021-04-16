import request from '@/api/request'

export function login() {
  return request({
    url: '/login',
    method: 'get',
 
  })
}