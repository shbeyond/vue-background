<template>
	<div class="content-wrapper">
		<section class="content">
	
				<div class="panel panel-primary">
				<div class="panel-heading">
					条件筛选
				</div>
				<div class="panel-body">
					<el-col :span="4">
						<el-input placeholder="请输入内容" icon="edit">
							<template slot="prepend">贷后部</template>
						</el-input>
					</el-col>
				</div>
				<div class="panel-footer">
						<el-button type="primary">查询</el-button>
						<el-button type="default">重置</el-button>
				</div>
			</div>

	
			<el-table :data="checkData" style="width:100%;" stripe>
				<el-table-column prop="orderIdStr" label="编号"></el-table-column>
				<el-table-column prop="submitUser" label="提交人"></el-table-column>
				<el-table-column prop="submitDateStr" label="提交日期"></el-table-column>
				<el-table-column prop="remark" label="备注"></el-table-column>
				<el-table-column label="操作">
					<template scope="scope">
						<el-button><router-link :to="{name: 'check-detail'}">点击审核</router-link></el-button>
					</template>
				</el-table-column>
			</el-table>

			
			
		</section>
		<router-view></router-view>
	</div>
</template>

<script>
	
	import axios from "axios"
	
	export default{
	created(){
			axios.get("static/dhb/dhb-check.json").then( (res)=>{
			this.checkData=res.data;
		
		})
	},
		data(){
			return {
				checkData:[]
			}
			
		}
	}

</script>

<style>
	
</style>