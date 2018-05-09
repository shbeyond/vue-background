import Mock from 'mockjs';
const List = []
const count = 50
for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        id: '@increment',
        edit:false,
        timestamp: +Mock.Random.date('T'),
        author: '@cname',
        auditor: '@cname',//<名字>Random.cname( min, max )随机生成一个常见中文名
        title: '@ctitle(10, 20)',//Random.paragraph( len ),Random.paragraph( min,max )随机生成一段中文标题默认3~7位
        forecast: '@float(0, 100, 2, 2)',//Random.float( min, max, dmin, dmax )返回
        importance: '@integer(1, 3)',//<重要程度>Random.integer( min, max )返回一个随机的整数。
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['published', 'draft', 'deleted'],
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'//<阅读数>Random.integer( min, max )返回一个随机的整数。
    }))
}
  const newList = List.map(v=>{
        v.originTitle = v.title;
        return v;
    })
    function param2Obj(url){

        const search = url.split('?')[1]
        if (!search) {
          return {}
        }
        return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
    }

export default{
    getList: config=>{
        const { importance, type, title, page = 1, limit = 20, sort } = param2Obj(config.url)

        
        let mockList = newList.filter(item => {//筛选符合条件的数据，重新返回数组
            if (importance && item.importance !== +importance) return false
            if (type && item.type !== type) return false
            if (title && item.title.indexOf(title) < 0) return false
            return true
        })
        if (sort === '-id') {
            mockList = mockList.reverse()//颠倒数组中元素的顺序
        }
            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

        return {
            total: mockList.length,
            items: pageList
        }
    }
}
