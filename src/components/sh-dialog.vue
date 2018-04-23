<!-- Table -->
<template>
	<div class="content-wrapper">

		<section>
		<el-row style="height:20%;">
			<el-col :span="8">
				<ease-chart></ease-chart>
			</el-col>
			<el-col :span="8">
				<san-xing></san-xing>
			</el-col>
			<el-col :span="8">
				<bar-chart></bar-chart>
			</el-col>
		</el-row>
		<el-row style="height:80%;">
		<el-col :span="24">
				<chart-rich></chart-rich>
		</el-col>
				
		</el-row>
			
		</section>
	</div>
</template>


<script>
	
	import easeCharts from './charts/easychart'
	import sanxing from './charts/sanxing'
	import barchart from './charts/barChart'
	import chartRich from './charts/chart_rich'
	

  export default {

    data() {
      return {
       
      };
    },

		props:{
			'message':String
		},
		components:{
			'ease-chart':easeCharts,
			'san-xing':sanxing,
			'bar-chart':barchart,
			'chart-rich':chartRich,
		}
  };
</script>