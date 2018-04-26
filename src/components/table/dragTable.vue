<template>
    <div class="content-wrapper dragletable">
        <div class="filter-container">
            <el-input placeholder="标题" style="width:200px;"></el-input>
            <el-select style="width:90px;" placeholder="重要性" v-model="value1">
                <el-option v-for="item in selectOption" :value="item" :label="item" :key="item"></el-option>
            </el-select>
            <el-select style="width:100px;" placeholder="类型" v-model="value2">
                <el-option v-for="item in selectType" :value="item.val" :label="item.val" :key="key"></el-option>
            </el-select>
            <el-select style="width:120px;" placeholder="排序" v-model="value3">
                <el-option v-for="item in sortOptions" :value="item.key" :label="item.label" :key="key"></el-option>
            </el-select>
            <el-button icon="search" type="primary">搜索</el-button>
            <el-button icon="edit" type="primary" @click="creattable">添加</el-button>
            <el-button icon="download" type="primary" size="medium">导出</el-button>
            <el-checkbox>显示审核人</el-checkbox>
        </div>
        <el-table :data='list' border fit highlight-current-row style="width: 100%" stripe v-loading.body="listLoading">
            <el-table-column label="序号" align="center">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="时间" width="200" align="center">
                <template slot-scope="scope">
                    {{scope.row.display_time}}
                </template>
            </el-table-column>
          
            <el-table-column label="作者" align="center">
                <template slot-scope="scope">
                    {{scope.row.author}}
                </template>
            </el-table-column>
            <el-table-column label="重要性" align="center">
                <template slot-scope="scope">
                    {{scope.row.forecast}}
                </template>
            </el-table-column>
            <el-table-column label="阅读数" align="center">
                <template slot-scope="scope">
                    {{scope.row.pageviews}}
                </template>
            </el-table-column>
            <el-table-column label="状态" align="center">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter" :size="medium">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="国籍">
                <template slot-scope="scope">
                    {{scope.row.type | showType}}
                </template>
            </el-table-column>
            <el-table-column label="标题" width="500">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit" style="overflow:hidden;">
                        <el-input v-model="scope.row.title" id="edit-input"></el-input>
                        <el-button type="warning" icon="refresh" class="cancel-btn" @click="cancel(scope.row)" size="medium">取消</el-button>

                    </template>
                    <span v-else>{{scope.row.title}}</span>
                </template>
                   
                
            </el-table-column>
            <el-table-column align="center" label="编辑">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" type="success" size="medium"  icon="circle-check-outline" @click="confirmEdit(scope.row)">完成</el-button>
                    <el-button v-else type="primary" size="medium"  icon="edit" @click='scope.row.edit=!scope.row.edit'>编辑</el-button>
                </template>
            </el-table-column>
            <el-table-column align="center" label="拖拽">
                <template slot-scope="scope" >
                    <span class='el-icon-rank' size="medium" style="cursor:pointer;"></span>
                </template>
            </el-table-column>

        </el-table>
        <div class="block">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[5, 10, 15, 20]"
                :page-size="listquery.pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="11">
            </el-pagination>
        </div>
        <el-dialog :title="titlemap[titlekey]" :visible.sync="dialogformvisible">
            <el-form ref="form" :model="form" label-width="100px">
                <el-form-item label="活动名称">
                    <el-select v-model="form.activename" placeholder="请选择" style="width:200px;"></el-select>
                </el-form-item>
                <el-form-item label="时间">
                    <el-date-picker v-model="form.timestamp" type="datetime" placeholder="选择日期时间"></el-date-picker>
                </el-form-item>
                <el-form-item label="标题">
                    <el-input v-model="form.title" style="width:200px;"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select style="width:200px;" placeholder="请选择" v-model="form.status">
                        <el-option v-for="(item,key) in statusOptions" :key="key" :label="item" :value="item" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性">
                    <el-rate v-model="form.importent" :max="3" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" style="margin-top:8px;">
                    
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
// import Icon from 'vue-svg-icon';


const list=[
    {
        auditor:"薛强",
        author:"田静",
        display_time:"2010-01-27 15:15:20",
        forecast:92.53,
        id:2,
        importance:2,
        pageviews:4412,
        status:"draft",
        timestamp:914689552413,
        title:"已候写名元用日建定地件代长代五然市业打",
        origintitle:"已候写名元用日建定地件代长代五然市业打",
        type:"US",
        edit:"false"
    },
    {
        auditor:"段秀兰",
        author:"董明",
        display_time:"2013-11-08 09:28:30",
        forecast:33.21,
        id:1,
        importance:1,
        pageviews:3713,
        status:"draft",
        edit:"false",
        timestamp:1322318816289,
        title:"精复当真查亲其效口要能青",
        origintitle:"精复当真查亲其效口要能青",
        type:"JP"
    },
    {
        auditor:"张伟",
        author:"贺伟",
        display_time:"2015-08-29 05:41:31",
        forecast:84.54,
        edit:"false",
        id:3,
        importance:1,
        pageviews:4919,
        status:"published",
        timestamp:86112213586,
        title:"程酸与几等快音油候着书里",
        origintitle:"程酸与几等快音油候着书里",
        type:"JP"
    },
    {
        auditor:"汪丽",
        author:"陈平",
        display_time:"1996-10-14 22:14:59",
        forecast:23.33,
        edit:"false",
        id:4,
        importance:1,
        pageviews:562,
        status:"draft",
        timestamp:1480652512641,
        title:"任看上话温高两选何话律支经圆理清就组重",
        origintitle:"任看上话温高两选何话律支经圆理清就组重",
        type:"US"
    },
    {
        auditor:"段涛",
        author:"戴静",
        display_time:"2018-02-09 02:17:55",
        forecast:34.65,
        id:5,
        edit:"false",
        importance:2,
        pageviews:1859,
        status:"draft",
        timestamp:549043147403,
        title:"亲处用金金万育受然经开",
        origintitle:"亲处用金金万育受然经开",
        type:"JP"
    },
    {
        auditor:"段超",
        author:"赖静",
        display_time:"1982-05-24 08:14:45",
        forecast:43.71,
        edit:"false",
        id:6,
        importance:1,
        pageviews:3953,
        status:"published",
        timestamp:136508295995,
        title:"价系口去府管心放律量际条第高",
        origintitle:"价系口去府管心放律量际条第高",
        type:"JP"
    },
    {
        auditor:"邹丽",
        author:"孔霞",
        display_time:"1980-10-18 00:51:43",
        forecast:86.33,
        edit:"false",
        id:7,
        importance:1,
        pageviews:4505,
        status:"published",
        timestamp:1420361363593,
        title:"求难生向间工还华任增",
        origintitle:"求难生向间工还华任增",
        type:"US"
    },
    {
        auditor:"崔勇",
        author:"姜丽",
        display_time:"2010-07-13 16:49:46",
        forecast:82.31,
        id:8,
        edit:"false",
        importance:2,
        pageviews:1989,
        status:"draft",
        timestamp:533280291173,
        title:"圆确构务样之构处有保关装素龙江",
        origintitle:"圆确构务样之构处有保关装素龙江",
        type:"US"
    },
    {
        auditor:"秦丽",
        author:"石丽",
        display_time:"1982-11-12 07:05:58",
        forecast:29.67,
        id:9,
        edit:"false",
        importance:2,
        pageviews:3224,
        status:"draft",
        timestamp:37571015526,
        title:"命张引广长南北书便问史没联",
        origintitle:"命张引广长南北书便问史没联",
        type:"JP"
    },
    {
        auditor:"顾师傅",
        author:"顾师傅",
        display_time:"1982-11-12 07:05:58",
        forecast:29.67,
        id:10,
        importance:2,
        edit:"false",
        pageviews:3224,
        status:"draft",
        timestamp:37571015526,
        title:"田家少闲月五月倍忙",
        origintitle:"田家少闲月五月人倍忙",
        type:"JP"
    },
    {
        auditor:"顾师傅",
        author:"张留清",
        display_time:"1982-11-12 07:05:58",
        forecast:29.67,
        id:11,
        edit:"false",
        importance:2,
        pageviews:3224,
        status:"draft",
        timestamp:37571015526,
        title:"夜来南风起小麦覆龙黄",
        origintitle:"夜来南风起小麦覆龙黄",
        type:"JP"
    }
]
    
import Sortable from 'sortablejs'
export default{
    data(){
        return{
            list:list,
            value1:"",
            value2:"",
            value3:"",
            sortOptions: [{ label: '按ID升序列', key: '+id' }, { label: '按ID降序', key: '-id' }],
            listLoading:true,
            selectOption:[1,2,3],
            selectType:
            [
                {
                    val:"日本(JP)",
                    key:1
                },
                {
                    val:"美国(US)",
                    key:2
                },
                {
                    val:"欧洲(JP)",
                    key:3
                },
                {
                    val:"中国(CN)",
                    key:4
                }
            ],
            listquery:{
                pagesize:5
            },
            dialogformvisible:false,
            titlemap:{
                creat:'创建',
                update:'更新'
            },
            titlekey:'',
            form:{
                activename:'',
                timestamp:new Date(),
                title:'',
                status:'publish',
                importent:1,
                remark:''
            },
            statusOptions: ['published', 'draft', 'deleted'],

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
          if(type == "US"){
              return "美国"
          }else if(type == "JP"){
              return "日本"
          }
      }
    },
    methods:{
        creatData(){

        },
        updateData(){

        },
        handleCurrentChange(){
            
        }
        ,handleSizeChange(val){
            this.listquery.pagesize = val;
        }
      ,getList(){
          this.listLoading = true;
          this.list = this.list.map( v=> {
              this.$set(v,"edit",false)
              v.origintitle = v.title;
              return v;
          })
          this.listLoading = false
      },
      cancel(row){
          row.edit = false;
          row.title = row.origintitle
          this.$message({
              message:"您已取消编辑！",
              type:"warning"
          });
      },
      confirmEdit(row){
          row.origintitle = row.title;//此处代码只是为了保证 origintitle === title
          row.edit = false;
          this.$message({
              message:"编辑成功！",
              type:"success"
          })
      },
      creattable(){
          this.dialogformvisible = true;
          this.titlekey = 'creat'
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