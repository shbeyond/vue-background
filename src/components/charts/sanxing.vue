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
              trigger: 'item',
              formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
              legend: {
                left: 'center',
                bottom: '10',
                data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
              },
              calculable: true,
              series: [
                {
                  name: 'WEEKLY WRITE ARTICLES',
                  type: 'pie',
                  roseType: 'radius',
                  radius: [15, 95],
                  center: ['50%', '38%'],
                  data: [
                    { value: 320, name: 'Industries' },
                    { value: 240, name: 'Technology' },
                    { value: 149, name: 'Forex' },
                    { value: 100, name: 'Gold' },
                    { value: 59, name: 'Forecasts' }
                  ],
                  animationEasing: 'cubicInOut',
                  animationDuration: 2600
                }
              ]
            })
        }

    }
</script>