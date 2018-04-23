<template>
	<div class="content-wrapper">
		<section class="content">
	<el-table :data="letterData" style="width: 100%">
    <el-table-column type="expand">
      <template scope="props">
        <el-form label-position="left" inline class="demo-table-expand">
          <el-form-item label="商品名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
          <el-form-item label="所属店铺">
            <span>{{ props.row.shop }}</span>
          </el-form-item>
          <el-form-item label="商品 ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="店铺 ID">
            <span>{{ props.row.shopId }}</span>
          </el-form-item>
          <el-form-item label="商品分类">
            <span>{{ props.row.category }}</span>
          </el-form-item>
          <el-form-item label="店铺地址">
            <span>{{ props.row.address }}</span>
          </el-form-item>
          <el-form-item label="商品描述">
            <span>{{ props.row.desc }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
  </el-table>	
		</section>
	</div>

</template>

<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 48%;
  }
</style>


<script>
	
import axios from "axios"

	
export default{
	
	created() {
	axios.get('static/foods.json').then( (res)=>{
		this.letterData=res.data
	})
	},
	data (){
	return {
	letterData:[],
  msg:"这是传给子组件的数据"

		}
	},
	methods:{
	
	}
	 
}
</script>

<style>
</style>