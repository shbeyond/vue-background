import request from './requset'
export function fetchList(query){
   return request({
        url: '/article/list',
        method: 'get',
        params: query
      })
} 