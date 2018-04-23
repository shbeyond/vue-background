<template>
    <div id="main" :style="{width:width,height:height}">

    </div>
</template>
<script>

    let echarts = require('echarts');
  

    export default{
        props:{
            height:{
                type:String,
                default:'300px'
            },
            width:{
                type:String,
                default:'100%'
            }
        },
        data(){
            return{
           
            }
        },
        created(){

        },
        methods:{
           
        },
        mounted(){
            let myChart = echarts.init(this.$el);
                myChart.setOption({
                tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        radar: {
          radius: '66%',
          center: ['50%', '42%'],
          splitNumber: 8,
          splitArea: {
            areaStyle: {
              color: 'rgba(127,95,132,.3)',
              opacity: 1,
              shadowBlur: 45,
              shadowColor: 'rgba(0,0,0,.5)',
              shadowOffsetX: 0,
              shadowOffsetY: 15
            }
          },
          indicator: [
            { name: '出售', max: 10000 },
            { name: '管理中心', max: 20000 },
            { name: '信息技术', max: 20000 },
            { name: '消费者反馈', max: 20000 },
            { name: '部门', max: 20000 },
            { name: '市场', max: 20000 }
          ]
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
        },
        series: [{
          type: 'radar',
          symbolSize: 0,
          areaStyle: {
            normal: {
              shadowBlur: 13,
              shadowColor: 'rgba(0,0,0,.2)',
              shadowOffsetX: 0,
              shadowOffsetY: 10,
              opacity: 1
            }
          },
          data: [
            {
              value: [5000, 7000, 12000, 11000, 15000, 14000],
              name: 'Allocated Budget'
            },
            {
              value: [4000, 9000, 15000, 15000, 13000, 11000],
              name: 'Expected Spending'
            },
            {
              value: [5500, 11000, 12000, 15000, 12000, 12000],
              name: 'Actual Spending'
            }
          ],
          animationDuration: 3000
        }]
            })
        }

    }
</script>