 
 <template>
  <div class="content-wrapper">
    <div class="content">
      <div class="main_content">
       <el-row>
          <el-col :span="24"><div class="grid-content"></div></el-col>
       </el-row>
       <el-row>
          <el-col :span="12"><div class="grid-content"></div></el-col>
          <el-col :span="12"><div class="grid-content"></div></el-col>
       </el-row>
       <el-row :gutter="20">
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
       </el-row>
       <el-row :gutter="20">
          <el-col :span='6'><div class="grid-content"></div></el-col>
          <el-col :span='6' :offset="6"><div class="grid-content"></div></el-col>
       </el-row>
       <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
          <el-col :span="6"><div class="grid-content"></div></el-col>
       </el-row>
       <!--<el-container>
          <el-header>这是头部</el-header>
          <el-aside>这是侧边栏</el-aside>
          <el-main>这是主题部分</el-main>
          <el-footer>只是底部部分</el-footer>
       </el-container>
       -->
      <!--测试按钮部分-->
      <el-row>
      
        <el-button type="primary">点击按钮</el-button>
        
        <el-button type="primary" round>点击按钮</el-button>
        <el-button type="default" circle>点击按钮</el-button>
      </el-row>
      <section>
      <!--此处label加":"-->
        <el-radio-group v-model="radio2" change="haschange">
          <el-radio :label="3" disabled>选项</el-radio>
          <el-radio :label="6">选项</el-radio>
          <el-radio :label="9">选项</el-radio>
        </el-radio-group>
      </section>
      <section>
      <!--此处label不用加":"-->
      <div>
        <el-radio-group v-model="elbtn" text-color="red" fill="black">
          <el-radio-button label="上海">上海</el-radio-button>
          <el-radio-button label="北京">北京</el-radio-button>
          <el-radio-button label="广州">广州</el-radio-button>
          <el-radio-button label="深圳">深圳</el-radio-button>
        </el-radio-group>
      </div>
      <div>
        <el-radio-group v-model="elbtn2" size="small">
          <el-radio-button label="上海">上海</el-radio-button>
          <el-radio-button label="北京">北京</el-radio-button>
          <el-radio-button label="广州"disabled>广州</el-radio-button>
          <el-radio-button label="深圳" >深圳</el-radio-button>
        </el-radio-group>
      </div>
      </section>

      <section>
          
      </section>
      <section>
          <el-checkbox-group v-model="checkarr">
            <el-checkbox label="check1">选项1</el-checkbox>
            <el-checkbox label="check2">选项2</el-checkbox>
            <el-checkbox label="check3">选项3</el-checkbox>
          </el-checkbox-group>
      </section>

       <!--<section>
          <el-input v-model="inputvalue" placeholder='请输入内容...'><i slot='suffix' class='el-input__icon el-icon-search'></i></el-input> 
          <el-input placeholder='请输入内容...' prefix-icon="el-icon-search" v-model="inputvalue"></el-input> 
          <el-input
              placeholder="请选择日期"
              suffix-icon="el-icon-date"
              v-model="input2">
          </el-input>
          </section>
      -->
      <div class="demo-input-suffix">
        属性方式：
          <el-input
            placeholder="请选择日期"
            suffix-icon="el-icon-date"
            v-model="input2">
          </el-input>
          <el-input
            placeholder="请输入内容"
            prefix-icon="el-icon-search"
            v-model="input21">
          </el-input>
      </div>

      <section>
          <el-select v-model='value' placeholder='请选择'>
            <el-option v-for="(item,index) in options" :value="item.value" :key="item.index" :label='item.value'></el-option>
          </el-select>
      </section>

      <section>
      <div class="block">   
        <span class="demonstration">默认 click 触发子菜单</span>
        <el-cascader
          :options="options2"
          v-model="selectedOptions"
          @change="handleChange">
        </el-cascader>
      </div> 
      </section>
      <section>
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="活动名称">
                <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域2"  value="beijing"></el-option>
              </el-select>
              
          </el-form-item>
          <el-form-item label="活动时间">
             <el-col :span="11">
              <el-date-picker type="date" v-model="form.data1" placeholder="选择日期" style="width:100%"></el-date-picker>
             </el-col> 
             <el-col :span="2" class="line">-</el-col>
             <el-col :span="11">
              <el-date-picker type="fixed-time" v-model="form.data2" placeholder="选择时间" style="width:100%"></el-date-picker>
             </el-col> 

          </el-form-item>
        </el-form>
      </section>
        <section>
          <el-button type="primary">
              {{count}}
          </el-button>
          <el-button type="primary">
              {{sync_count}}
          </el-button>
         
          <el-button type="default" @click="increasenumber">
              increase
          </el-button>
          <el-button type="default" @click="sync_increase">
              sync_increase
          </el-button>
          
        </section>
      </div> 
    </div>
   
  </div>
</template>

<script>
import { mapActions } from 'vuex'
  export default{

    data(){
      return{
        
        radio2:9,
        elbtn:"北京",
        elbtn2:"深圳",
        checkarr:['check1','check3'],
        inputvalue:"你猜",
        options:[
          {
            value:"大豆",
            index:1
          },
          {
            value:"棉花",
            index:2
          },
          {
            value:"小麦",
            index:3
          },
          {
            value:"玉米",
            index:4
          },
          {
            value:"水稻",
            index:5
          }
        ],
         value:'',
         options2: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]

      }]
    }],
    selectedOptions: [],
    form:{
      name:"",
      region:"",
      data1:"",
      data2:"",
    }
  }
    },
    methods:{
     handleChange(){
     },
     increasenumber(){
       this.$store.commit("increase",{addnum:10})
      //  this.$store.commit('increment', {addNum : 10})
     },
     sync_increase(){
       this.$store.dispatch("syncincrease")
     }
    },
    computed:{
      count(){
        return this.$store.state.dialog.show;
      },
      sync_count(){
        return this.$store.getters.doubleCount;
      }
    }
    }
</script>
<style>
.line{
  text-align:center;
}
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  .main_content{
    width:50%;
    margin:0 auto;
  }
  img{
    width:100%;
    height:100%;
  }
  .grid-content{
    height:50px;
    background:#ddd;
    margin:5px;
    border-radius:5px;
  }
</style>