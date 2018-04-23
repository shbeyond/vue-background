<template>
    <div class="content-wrapper">
        <dnd-list :list1="list1" :list2="list2"></dnd-list>
	</div>
</template>

<script>

    import dndList from './dnd_list.vue'
    let listone = [
                    {
                        auditor:"薛强",
                        author:"田静",
                        display_time:"2010-01-27 15:15:20",
                        forecast:92.53,
                        id:1,
                        importance:2,
                        pageviews:4412,
                        status:"draft",
                        timestamp:914689552413,
                        title:"已候写名元用日建定地件代长代五然市业打",
                        type:"US"
                    },
                    {
                        auditor:"段秀兰",
                        author:"董明",
                        display_time:"2013-11-08 09:28:30",
                        forecast:33.21,
                        id:2,
                        importance:1,
                        pageviews:3713,
                        status:"draft",
                        timestamp:1322318816289,
                        title:"精复当真查亲其效口要能青",
                        type:"JP"
                    },
                    {
                        auditor:"张伟",
                        author:"贺伟",
                        display_time:"2015-08-29 05:41:31",
                        forecast:84.54,
                        id:3,
                        importance:1,
                        pageviews:4919,
                        status:"published",
                        timestamp:86112213586,
                        title:"程酸与几等快音油候着书里",
                        type:"JP"
                    },
                    {
                        auditor:"汪丽",
                        author:"陈平",
                        display_time:"1996-10-14 22:14:59",
                        forecast:23.33,
                        id:4,
                        importance:1,
                        pageviews:562,
                        status:"draft",
                        timestamp:1480652512641,
                        title:"任看上话温高两选何话律支经圆理清就组重",
                        type:"US"
                    },
                    {
                        auditor:"段涛",
                        author:"戴静",
                        display_time:"2018-02-09 02:17:55",
                        forecast:34.65,
                        id:5,
                        importance:2,
                        pageviews:1859,
                        status:"draft",
                        timestamp:549043147403,
                        title:"亲处用金金万育受然经开",
                        type:"JP"
                    }
                ];
    let listtwo = [
                    {
                        auditor:"段超",
                        author:"赖静",
                        display_time:"1982-05-24 08:14:45",
                        forecast:43.71,
                        id:6,
                        importance:1,
                        pageviews:3953,
                        status:"published",
                        timestamp:136508295995,
                        title:"价系口去府管心放律量际条第高",
                        type:"JP"
                    },
                    {
                        auditor:"邹丽",
                        author:"孔霞",
                        display_time:"1980-10-18 00:51:43",
                        forecast:86.33,
                        id:7,
                        importance:1,
                        pageviews:4505,
                        status:"published",
                        timestamp:1420361363593,
                        title:"求难生向间工还华任增",
                        type:"US"
                    },
                    {
                        auditor:"崔勇",
                        author:"姜丽",
                        display_time:"2010-07-13 16:49:46",
                        forecast:82.31,
                        id:8,
                        importance:2,
                        pageviews:1989,
                        status:"draft",
                        timestamp:533280291173,
                        title:"圆确构务样之构处有保关装素龙江",
                        type:"US"
                    },
                    {
                        auditor:"秦丽",
                        author:"石丽",
                        display_time:"1982-11-12 07:05:58",
                        forecast:29.67,
                        id:9,
                        importance:2,
                        pageviews:3224,
                        status:"draft",
                        timestamp:37571015526,
                        title:"命张引广长南北书便问史没联",
                        type:"JP"
                    },
                    {
                        auditor:"顾师傅",
                        author:"顾师傅",
                        display_time:"1982-11-12 07:05:58",
                        forecast:29.67,
                        id:10,
                        importance:2,
                        pageviews:3224,
                        status:"draft",
                        timestamp:37571015526,
                        title:"田家少闲月五月倍忙",
                        type:"JP"
                    },
                    {
                        auditor:"顾师傅",
                        author:"张留清",
                        display_time:"1982-11-12 07:05:58",
                        forecast:29.67,
                        id:11,
                        importance:2,
                        pageviews:3224,
                        status:"draft",
                        timestamp:37571015526,
                        title:"夜来南风起小麦覆龙黄",
                        type:"JP"
                    }
                ];
    export default{
        data(){
            const getDate = _=>{
                const data=[];
                for(let i=1; i<15;i++){
                    data.push({
                        key:i,
                        label:`备选项${i}`,
                        disabled:i%4 === 0
                    })
                }
                return data
            }
            return{
                data:getDate(),
                value1:[1,4],
                list1:listone,
                list2:listtwo
            }
        },
        components:{
            'dnd-list':dndList
        }
    }
</script>