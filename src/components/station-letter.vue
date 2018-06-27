<template>
	<div class="content-wrapper">
		
	
		<section class="content">
		<el-table ref="multTable" :data="newdata" style="width:100%;" stripe @selection-change="selectChange">
			
			<!--<el-table-column prop="item.msgTitle" label="发件人" width="100"></el-table-column>-->
			<el-table-column type="selection"width="55"></el-table-column>
			<el-table-column prop='employeeId' label="发件人" width="200"></el-table-column>
		    <el-table-column prop="msgTitle" label="标题"></el-table-column>
			<el-table-column prop="createTime" label="时间" width="200"></el-table-column>
			<el-table-column prop="msgContent" label="内容" width="400"></el-table-column>
			<el-table-column prop="msgType" label="信件类型"></el-table-column>
			<el-table-column prop="msgResource" label="信件来源"></el-table-column>
			<el-table-column prop="status" label="状态" width="100">
				<template scope="scope">
					<el-button type="danger" @click.native.prevent="noRead(scope.$index,letterData)">移除</el-button>
				</template>
				
			</el-table-column>
			<el-table-column label="操作">
				<template scope="scope">
					<el-button @click="handleClick" type="primary">查看</el-button>
				</template>
			</el-table-column>
		</el-table>
		<div style="margin-top: 30px;">
			<el-button @click="toggleSelection([letterData[1],letterData[2]])">选中第二，第三行</el-button>
			<el-button @click="delRow">删除选中行</el-button>
		</div>
		</section>
	</div>

</template>


<script>
	
import axios from "axios"
	
export default{
	
		
	created() {
	axios.get('static/station-letter.json').then( (res)=>{
		this.letterData=res.data.rows
		})
	},
		data (){
		return {
		letterData:[],
		selectChangeData:[],
		del_list:[]
		
		}
	},

	  computed: {
            newdata(){
            	
            	const self = this
                return this.letterData.filter(function(d){
                	
                    let is_del = false;
                    for (let i = 0; i < self.del_list.length; i++) {
                    	
                        if(d.msgId === self.del_list[i].msgId){
                            is_del = true;
                            break;
                        }
                    }
                    if(!is_del){
                       return d;
                    }
                })
                
            }
        },
	methods:{
		handleClick(){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
 
		},
		noRead:function(k,rows){
			rows.splice(k,1)
		},
		toggleSelection(rows){
			if(rows){
				rows.forEach(row=>{
					this.$refs.multTable.toggleRowSelection(row);
				})
			}else{
				 this.$refs.multTable.clearSelection();
			}
		},
		selectChange(val){
			this.selectChangeData=val
		},
		delRow(){
			
			const self=this;
			const lenth=self.selectChangeData.length;
			let str='';
			
			self.del_list = self.del_list.concat(self.selectChangeData);
			
			
			self.selectChangeData=[];
		}
	} 
}
</script>
<style>
</style>