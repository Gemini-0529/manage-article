<template>
    <div class="article-container">
        <el-card class="card-top">
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>内容管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <!-- 表单 -->
            <!-- ref="form" :model="form" -->
            <el-form label-width="40px" size="small">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <!-- el-radio默认把label作为文本和选中之后的value值 -->
                        <el-radio :label="null">全部</el-radio>
                        <el-radio :label="0">草稿</el-radio>
                        <el-radio :label="1">待审核</el-radio>
                        <el-radio :label="2">审核通过</el-radio>
                        <el-radio :label="3">审核失败</el-radio>
                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="频道">
                    <el-select v-model="channelId" placeholder="请选择">
                        <el-option
                            label="全部"
                            :value="null">
                        </el-option>
                        <el-option
                            v-for="(channel,index) in channels"
                            :key="index" :label="channel.name"
                            :value="channel.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <el-date-picker
                        v-model="rangeDate"
                        type="datetimerange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['12:00:00']"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd">
                    </el-date-picker>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                    @click="loadArticles(1)"
                    :disabled="loading">查询</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <span>共查询到 {{totalCount}} 条结果：</span>
            </div>
            <!-- 数据表格 -->
            <!-- 把需要展示的数组列表绑定给table的data属性
                 width可以设定表格列宽
                 prop用来设定要渲染的列表项数据字段,只能展示文本
             -->
            <el-table :data="articles" style="width: 100%" stripe class="table-data"
                size="small" v-loading="loading">
                <el-table-column prop="" label="封面">
                    <template slot-scope="scope">
                        <el-image style="width: 60px; height: 60px" lazy
                            :src="scope.row.cover.images[0]" fit="cover" class="article-img">
                        </el-image>
                        <!-- <img class="cover-img" v-if="" :src="scope.row.cover.images[0]" alt="">
                        <img class="cover-img" v-else src="./default.png" alt=""> -->
                    </template>
                </el-table-column>
                <el-table-column prop="title" label="标题"></el-table-column>
                <el-table-column label="状态">
                    <!-- 如果需要在自定义列模板中获取当前遍历项数据，需要声明slot-scope属性 -->
                    <template slot-scope="scope">
                        <el-tag :type="articleStatus[scope.row.status].type">
                            {{ articleStatus[scope.row.status].text}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="pubdate" label="发布时间"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" circle @click="$router.push('/publish?id='+scope.row.id)"></el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" circle @click="ondelArticle(scope.row.id)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页条 -->
            <el-pagination @current-change="loadArticles"
                layout="prev, pager, next, jumper"
                :total="totalCount" background
                :page-size="pageSize" :current-page.sync="page"
                :disabled = "loading"
                >
                <!-- disabled为了防止网络延迟高，用户一直点击按钮进行查询 -->
            </el-pagination>
        </el-card>
    </div>
</template>
<script>
import { getArticles,getArticleChannels,delArticle } from '@/api/article'//引入获取文章列表api模块
export default {
    name:'app-article',
    data() {
        return {
            articles: [],//文章数据列表
            articleStatus: [
                {status: 0,text: '草稿',type : ''},
                {status: 1,text: '待审核',type : 'warning'},
                {status: 2,text: '审核通过',type : 'success'},
                {status: 3,text: '审核失败',type : 'danger'},
                {status: 4,text: '已删除',type : 'info'}
            ],
            totalCount: 0,//总数据条数
            pageSize: 10,//每页大小
            page: 1,//当前页
            status: null,//查询文章的状态，null为显示全部
            channels: [],//频道数组
            channelId:null,
            rangeDate: null,//筛选的范围日期
            loading: true
        }
    },
    created () {
        this.loadArticles(1)
        this.loadChannels()
    },
    methods: {
        // handleCurrentChange(page) {
        //     this.loadArticles(page)
        // },
        loadArticles(page = 1) {
            this.loading = true
            getArticles({
                page,
                per_page: this.pageSize,
                status: this.status,
                channel_id: this.channelId,
                begin_pubdate: this.rangeDate ? this.rangeDate[0] : null,//开始日期
                end_pubdate: this.rangeDate ? this.rangeDate[1] : null//截至日期
            }).then( res => {
                // this.articles = res.data.data.results
                // this.totalCount = res.data.data.total_count
                //              不允许有下划线，只能大驼峰式
                const { results,total_count: totalCount } = res.data.data
                this.articles = results
                this.totalCount = totalCount
                //关闭加载中loading
                this.loading = false
            })
        },
        loadChannels() {
            getArticleChannels().then(res => {
                this.channels = res.data.data.channels
            })
        },
        ondelArticle(articleId){
            this.$confirm("确认删除吗?", "删除提示", {
                //MessageBox弹框
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(() => {//点击了确定后
                delArticle(articleId.toString()).then(res=>{
                    //删除成功，更新当前页数据
                    this.loadArticles(this.page)
                })
            }).catch(() => {
                
            });//点击了取消
        }
    },
}
</script>
<style lang="less" scoped>
.card-top{
    margin-bottom: 20px;
}
.table-data{
    margin-bottom: 10px;
}
.cover-img{
    width: 100px;
    background-size: cover;
}
.article-img{
    border-radius: 4px;
}
</style>