<template>
    <div style="overflow:hidden;">
    <div style="width:45%;float:left;">
    
        <draggable :list='list1' :options="{group:'article'}" style="overflow:hidden;">
            <div v-for='(element,index) in list1' :key='element.id' style="padding:5px;border:1px solid #ccc;margin-bottom:10px;display:flex;justify-content:space-between;">
                <div :style='goodstyle'>[{{element.author}}]{{element.title}}</div>
                <span style="float:right;margin-top:10px;cursor:pointer;" @click="dealCurRow(element)"><i style="color:#ff4949" class="el-icon-delete"></i></span>
            </div>
        </draggable>
    </div>
    <div style="width:45%;float:right;">
        <draggable :list='realList2' :options="{group:'article'}" style="overflow:hidden;">
            <div v-for="(element,index) in realList2" :key="element.id" style="padding:5px;border:1px solid #ccc;margin-bottom:10px;cursor:pointer;">
                <div :style='goodstyle2' @click="addListOne(element)">[{{element.author}}]{{element.title}}</div>
            </div>
        </draggable>
    </div>    
       
    </div>
</template>
<script>
    
    import draggable from 'vuedraggable'
    export default{
        data(){
            return{
            goodstyle:{
                marginTop:"5px"
            }
            }
        },
        computed:{
            realList2(){
                return this.list2.filter(v=>{
                    if(this.ifNotList1(v)){
                        return v;
                    }
                    return false;
                })
            }
        },
        props:{
            list1:{
                type:Array,
                default(){
                    return []
                }
            },
            list2:{
                type:Array,
                default(){
                    return []
                }
            }
        },
        components:{
            draggable
        },
        methods:{
            ifNotList1(v){
                return this.list1.every(k=>v.id !== k.id)
            },
            ifNotList2(v){
                return this.list2.every(k=>v.id !== k.id)
            },
            dealCurRow(elm){
                for(let item of this.list1){
                    if(item.id == elm.id){
                        let index = this.list1.indexOf(item)
                        this.list1.splice(index,1)
                    }
                }
                if(this.ifNotList2(elm)){
                    this.list2.unshift(elm)
                }
            },
            addListOne(ele){
                this.list1.push(ele)
            }
        }
    }
</script>