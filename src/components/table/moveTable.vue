<template>
    <div class="content-wrapper">
        <div class="filter-container">
            <el-checkbox-group v-model="checkboxVal">
                <el-checkbox label="apple">apple</el-checkbox>
                <el-checkbox label="banane">banane</el-checkbox>
                <el-checkbox label="orange">orange</el-checkbox>
            </el-checkbox-group>
	    </div>
        <div>
            <el-table :data="tableData" :key='key' border fit highlight-current-row stripe style="width: 100%">
                <el-table-column prop='name' label='名称' width='180'></el-table-column>
                <el-table-column :key='fruit' v-for="(fruit,index) in formThead" :label='fruit' >
                    <template slot-scope="scope">
                        {{scope.row[fruit]}}
                    </template>
                </el-table-column>
            </el-table>
        </div>
	</div>
</template>

<script>
    const checkboxDefault = ['apple','banane'];
    export default{

        data(){
            return{
            tableData: [
                {
                    name: 'fruit-1',
                    apple: 'apple111',
                    banane: 'banana111',
                    orange: 'orange111'
                },
                {
                    name: 'fruit-2',
                    apple: 'apple222',
                    banane: 'banana222',
                    orange: 'orange222'
                
                },
                {
                    name: 'fruit-3',
                    apple: 'apple333',
                    banane: 'banana333',
                    orange: 'orange333'
                }
            ],
                key:1,
                checkboxVal:checkboxDefault,
                formTheadOptions: ['apple', 'banane', 'orange'], // 可选择表头
                formThead: checkboxDefault // 默认表头
            }
        },
         watch:{
                checkboxVal(valArr) {
                this.formThead = this.formTheadOptions.filter(i => valArr.indexOf(i) >= 0)
                this.key = this.key + 1// 为了保证table 每次都会重渲 （牺牲性能保证效果，当然也可以不用）
                }
            }
    }
</script>