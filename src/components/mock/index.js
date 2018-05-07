import Mock from 'mockjs'
import getMethods from './mock.js'
import axios from 'axios'

Mock.mock(/\/article\/list/,'get',getMethods.getList)
// axios.get('reduce.json').then( (res)=>{
//     console.log(res)
// })
export default Mock