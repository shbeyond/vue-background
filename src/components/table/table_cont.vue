<template>
	<div class="content-wrapper">
        <div style='margin:0 0 5px 20px'>固定表头 按照表头顺序排序</div>
	</div>
</template>
<script>

    import fixtable from './fixtable.vue'
    import unfixTable from './unfixtable.vue'
    export default{
        data(){
            return{

            }
        },
        components:{
            'fix-table':fixtable,
            'unfix-table':unfixTable
        }

    }
</script>