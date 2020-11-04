<template>
    <div ref="main" class="fans-container">
        
    </div>
</template>
<script>
    import echarts from 'echarts'
    export default {
       name: 'fans',
       data() {
           return {

           }
       },
       created() {

       },
       mounted () {
           var myChart = echarts.init(this.$refs.main);
           // 指定图表的配置项和数据
            var option = {
                title: {
                    text: '粉丝坐标'
                },
                tooltip: {},
                legend: {
                    data: ['女生', '男生']
                },
                radar: {
                    // shape: 'circle',
                    name: {
                        textStyle: {
                            color: '#F9F871',
                            backgroundColor: '#2F4858',
                            borderRadius: 3,
                            padding: [3, 5]
                        }
                    },
                    indicator: [
                        { name: '北京', max: 6000},
                        { name: '深圳', max: 20000},
                        { name: '西安', max: 30000},
                        { name: '太原', max: 38000},
                        { name: '广州', max: 52000},
                        { name: '上海', max: 25000}
                    ]
                },
                series: [{
                    name: '男生/女生',
                    type: 'radar',
                    // areaStyle: {normal: {}},
                    data: [
                        {
                            value: [4300, 10000, 28000, 35000, 50000, 19000],
                            name: '女生'
                        },
                        {
                            value: [5000, 14000, 28000, 31000, 42000, 21000],
                            name: '男生'
                        }
                    ]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
       },
       methods: {

       }
    }
</script>
<style lang="less" scoped>
.fans-container{
    width: 100%;
    height: 580px;
}
</style>