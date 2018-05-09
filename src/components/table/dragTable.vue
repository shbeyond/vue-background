<template>
    <div class="content-wrapper dragletable">
        <div class="filter-container">
            <el-input placeholder="标题" style="width:200px;" v-model="searchVal"></el-input>
            <el-select style="width:90px;" placeholder="重要性" v-model="listquery.importance" @change = "impChange">
                <el-option v-for="item in selectOption" :value="item" :label="item" :key="item"></el-option>
            </el-select>
            <el-select style="width:100px;" placeholder="国籍" v-model="listquery.type" @change = "typeChange">
                <el-option v-for="item in selectType" :value="item.realVal" :label="item.val" :key="key"></el-option>
            </el-select>
            <el-select style="width:120px;" placeholder="排序" v-model="listquery.sort" @change = "sortReverse">
                <el-option v-for="item in sortOptions" :value="item.key" :label="item.label" :key="key"></el-option>
            </el-select>
            <el-button icon="search" type="primary" @click="handleFilter">搜索</el-button>
            <el-button icon="edit" type="primary" @click="creattable">添加</el-button>
            <el-button icon="download" type="primary" size="medium">导出</el-button>
            <el-button icon="refresh" type="primary" size="medium" @click="refreshData">刷新</el-button>
            <el-checkbox v-model="checkperson" @change="tabelkey=tabelkey+1">显示审核人</el-checkbox>
        </div>
        <el-table :data='list' border fit highlight-current-row style="width: 100%" stripe v-loading.body="listLoading">
            <el-table-column label="序号" align="center" width="80">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.display_time}}
                </template>
            </el-table-column>
          
            <el-table-column label="作者" align="center" width="100">
                <template slot-scope="scope">
                    {{scope.row.author}}
                </template>
            </el-table-column>
            <el-table-column label="重要性" align="center" width="80">
                <template slot-scope="scope">
                    {{scope.row.importance}}
                </template>
            </el-table-column>
            <el-table-column label="阅读数" align="center" width="100">
                <template slot-scope="scope">
                    {{scope.row.pageviews}}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" :size="medium">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="国籍" width="100">
                <template slot-scope="scope">
                    {{scope.row.type | showType}}
                </template>
            </el-table-column>
            <el-table-column label="标题" width="300">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit" style="overflow:hidden;">
                        <el-input v-model="scope.row.title" id="edit-input"></el-input>
                        <el-button type="warning" icon="refresh" class="cancel-btn" @click="cancel(scope.row)" size="medium">取消</el-button>

                    </template>
                    <span v-else>{{scope.row.title}}</span>
                </template>
            </el-table-column>
            <el-table-column v-if="checkperson" label="审核人" align="center">
                <template slot-scope="scope">
                <span style='color:red;'>{{scope.row.auditor}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="修改">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" type="success" size="medium"  icon="circle-check-outline" @click="confirmEdit(scope.row)">完成</el-button>
                    <el-button v-else type="primary" size="medium"  icon="edit" @click='scope.row.edit=!scope.row.edit'>修改标题</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="150">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="edit" style="float:left;" @click="handleupdate(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" icon="delete" style="float:right;" @click="delrow(scope.row)">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="listquery.page"
                :page-sizes="[10, 20, 30, 50]"
                :page-size="listquery.limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total"
                >
            </el-pagination>
        </div>
        <el-dialog :title="titlemap[titlekey]" :visible.sync="dialogformvisible">
            <el-form ref="form" :model="form" label-width="100px" :rules="rule" status-icon>
                <el-form-item label="国籍" prop="type">
                    <el-select v-model="form.type" placeholder="请选择" style="width:200px;">
                        <el-option v-for="(item,index) in calendarTypeOptions" :key="key" :value='item.key' :label="item.display_name"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="time">
                    <el-date-picker v-model="form.display_time" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
              
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" style="width:200px;"></el-input>
                </el-form-item>
                <!--
                    <el-form-item label="阅读数" prop="readed">
                        <el-input v-model="form.pageviews" style="width:200px;"></el-input>
                    </el-form-item>
                -->
                <el-form-item label="状态" prop="status">
                    <el-select style="width:200px;" placeholder="请选择" v-model="form.status">
                        <el-option v-for="(item,key) in statusOptions" :key="key" :label="item" :value="item" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性" prop="import">
                    <el-rate v-model="form.forecast" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin-top:8px;">
                    
                    </el-rate>
                </el-form-item>
                <el-form-item label="点评">
                    <el-input type="textarea" :autosize="{ minRows: 2, maxRows: 4}" placeholder="请输入内容" v-model="form.remark" style="width:300px;">
                    </el-input>
                </el-form-item>
            </el-form>
            <div sloa="footer" class="form-footer">
                <el-button @click="dialogformvisible = false">取 消</el-button>
                <el-button v-if="titlekey=='create'" type="primary" @click="createData">确 定</el-button>
                <el-button v-else type="primary" @click="updateData">确 定</el-button>
            </div>
        </el-dialog>
</div>
        
</template>

<script>
// import List from '../mock/mock.js'
import { fetchList } from '../mock/axios-request.js'


const calendarTypeOptions = [
  { key: 'CN', display_name: '中国' },
  { key: 'US', display_name: '美国' },
  { key: 'JP', display_name: '日本' },
  { key: 'EU', display_name: '欧元区' }
]

const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {//整理成类似-----------'CN':'中国'---------的形式
  acc[cur.key] = cur.display_name
  return acc
}, {}) 

export default{
    data(){
        return{
            tabelkey:0,
            checkperson:false,
            list:[],
            searchVal:"",
            total:null,
            sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
            listLoading:true,
            selectOption:[1,2,3],
            calendarTypeOptions,
            selectType:
            [
                {
                    val:"日本(JP)",
                    realVal:'JP',
                    key:1
                },
                {
                    val:"美国(US)",
                    realVal:'US',
                    key:2
                },
                {
                    val:"欧洲(EU)",
                    realVal:'EU',
                    key:3
                },
                {
                    val:"中国(CN)",
                    realVal:'CN',
                    key:4
                }
            ],
            listquery:{
                page: 1,
                limit: 10,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            },
            dialogformvisible:false,
            titlemap:{
                creat:'创建',
                update:'更新'
            },
            titlekey:'',
            form:{
                type:'',
                display_time:new Date().toLocaleString(),
                title:'',
                status:'publish',
                forecast:1,
                pageviews:'',
                remark:'',
                edit:false
            },
            statusOptions: ['published', 'draft', 'deleted'],
            rule:{
                type:[{required:true,message:'this is required',trigger:'change'}],
                // time:[{type:'date',required:true,message:'this is required',trigger:'change'}],
                // time:[{type:'date',required:true,message:'time is required',trigger:'change'}],
                title:[{required:true,message:'this is required',trigger:'blur'}],
                status:[{required:true,message:'this is required',trigger:'change'}]
            }

        }
    },
    created() {
        this.getList()
    },
    filters:{
        statusFilter(status){

          const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
        }
        return statusMap[status]
      },
      showType(type){
          return calendarTypeKeyValue[type]
      }
    },
    methods:{
        sortReverse(val){
            this.listquery.sort = val;
            this.getList();
        },
        refreshData(){
               this.listquery = {
                page: 1,
                limit: 10,
                importance: undefined,
                title: undefined,
                type: undefined,
                sort: '+id'
            };
            this.searchVal = undefined;
            this.getList();
        },
        handleFilter(){
            if(this.searchVal){
                this.listquery.title = this.searchVal.trim();
                this.getList(); 
            }
           
        },
        typeChange(val){
            this.listquery.type = val;
            this.getList();
        },
        impChange(val){
            this.listquery.importance = val;
            this.getList();
        },
        handleupdate(row){
            this.form = Object.assign({},row);
            this.form.display_time = new Date(this.form.display_time);
            this.titlekey = "update";
            this.dialogformvisible = true;
    //         this.$nextTick(() => {
    //         // this.$refs['form'].clearValidate()
    //   })
        },
        delrow(row){
            // console.log(row.id,Object.prototype.toString.call(row.id))
            for(let i=0;i<this.list.length;i++){
                // console.log(row.id+'*************',this.list[i].id)
                if(this.list[i].id == row.id){
                    this.list.splice(i,1)
                }
            }
        },
        createData(){
            this.$refs['form'].validate((valida)=>{
                if(valida){
                    this.form.id = parseInt(Math.random() * 100) + 1024 // mock a id
                    this.form.author = '原创作者';
                    
                    this.list.unshift(this.form);
                    this.dialogformvisible = false
                    this.$notify({
                        title: '成功',
                        message: '创建成功',
                        type: 'success',
                        duration: 2000
                    })
                }
            })
        },
        updateData(){
            this.$refs['form'].validate((valid)=>{
                if(valid){
                    let tempDate = Object.assign({},this.temp);
                    tempDate.display_time = new Date().toLocaleString();
                    for(const items of this.list){
                        if(items.id == tempDate.id){
                            let index = this.list.indexOf(items);
                            this.list.splice(index,1,this.form)
                            break;
                        }
                    }
                    this.dialogformvisible = false
                }
            })
        },
        handleCurrentChange(val){
            this.listquery.page = val;
            this.getList();
        }
        ,handleSizeChange(val){
            this.listquery.limit = val;
            this.getList();
        }
      ,getList(){
          this.listLoading = true;
           fetchList(this.listquery).then(res => {
               
               this.list = res.data.items;
               this.total = res.data.total;
           })
        //    this.list = this.list.map( v=> {
        //         this.$set(v,"edit",false)
        //         v.origintitle = v.title;
        //         return v;
        //     })
          this.listLoading = false
      },
      cancel(row){
          row.edit = false;
          row.title = row.originTitle
          this.$message({
              message:"您已取消编辑！",
              type:"warning"
          });
      },
      confirmEdit(row){
          row.originTitle = row.title;//此处代码只是为了保证 origintitle === title
          row.edit = false;
          this.$message({
              message:"编辑成功！",
              type:"success"
          })
      },
      creattable(){

           this.form={
                type:undefined,
                display_time:new Date().toLocaleString(),
                title:'',
                status:'publish',
                forecast:1,
                pageviews:'',
                remark:'',
                edit:false
          }
          this.dialogformvisible = true;
          this.titlekey = 'create'
      }  
    }
}
</script>
<style>
   
    .cancel-btn{
       float:right;
       
    }
    #edit-input{
        float:left;
        width:80%;
    }
    .filter-container{
        padding:20px 0;
    }
    .dragletable{
        padding:20px;
    }
</style>