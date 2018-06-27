<!-- import_data.vue -->
<template>
  <div class="content-wrapper">


    <!-- Main content -->
    <section class="content" style="overflow:hidden;">
      <div class="draglist">
         <draggable v-model="list" :options="{group:'people'}" @start="drag=true" @end="drag=false">
                <div v-for="(element,index) in list" :key="index" class="realdiv">{{element.id}}{{element.author}}</div>
        </draggable>
      
      </div>
     
        <pre class="preRight">{{this.list}}</pre>
    </section>
  </div>
</template>
<script>
import draggable from 'vuedraggable'
import Mocks from 'mockjs';
const List = []
for (let i = 0; i < 5; i++) {
    List.push(Mocks.mock({
        id: '@increment',
        author: '@cname',
        title: '@ctitle(10, 20)',//Random.paragraph( len ),Random.paragraph( min,max )随机生成一段中文标题默认3~7位
      
    }))
}

  export default {
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        list:List
      };
    },
    created(){
      console.log(List)
    },
    methods: {
      handleRemove(file, fileList) {

      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      }
    },
    components: {
        draggable,
    },
  }
</script>
<style>
  .draglist{
    width:10%;
   
    float:left;
  }
  .preRight{
    width:50%;
    float:left;
    margin-left:30px;
  }
  .realdiv{
      border:1px solid #ccc;
      height:50px;
      line-height:50px;
      text-align:center;
  }
</style>