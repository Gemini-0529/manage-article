<template>
    <div class="comment-comtain">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <!-- 面包屑导航 -->
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>评论管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <el-table
                :data="commentList"
                style="width: 100%"
                stripe
                class="table-list"
                v-loading="loading"
                >
                <el-table-column
                    prop="title"
                    label="标题">
                </el-table-column>
                <el-table-column
                    prop="total_comment_count"
                    label="总评论">
                </el-table-column>
                <el-table-column
                    prop="fans_comment_count"
                    label="粉丝评论">
                </el-table-column>
                <!-- <el-table-column
                    prop="comment_status"
                    label="状态">
                    <template slot-scope="scope">
                        {{scope.row.comment_status ? '正常':'关闭'}}
                    </template>
                </el-table-column> -->
                <el-table-column label="是否允许评论">
                    <!-- slot-scope vue语法，作用域插槽 -->
                    <template slot-scope="scope">
                       <el-switch
                            v-model="scope.row.comment_status"
                            active-color="#13ce66"
                            inactive-color="#ff4949"
                            @change="onStatusChange(scope.row)"
                            :disabled="scope.row.statusDisabled">
                        </el-switch> 
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="page"
                :page-sizes="[10,20, 30]"
                :page-size.sync="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total_count"
                background
                />
        </el-card>
        
    </div>
</template>
<script>
    import { getArticles,commentStatus } from '@/api/article'
    export default {
        name: 'comment',
        data() {
            return {
                commentList: [],
                loading: true,
                total_count: 0,
                pageSize:10,
                page: 1//当前激活的页码
            }
        },
        created() {
            this.loadArticles()
        },
        methods: {
            handleSizeChange() {//每页展示数据条数改变事件
                this.loadArticles(1)
            },
            handleCurrentChange(page) {//页码改变事件
                //页码改变加载指定页码数据
                this.loadArticles(page)
            },
            loadArticles(page=1) {
                this.loading = true//开启loading
                this.page = page//分页组件激活的页码和请求数据的页码保持一致
                getArticles({
                    response_type: 'comment',
                    page,
                    per_page:this.pageSize
                }).then(res=>{
                    const { results,total_count } = res.data.data
                    results.forEach(article => {//遍历请求回来的数据
                    //给每一项都添加一个statusDisabled属性，控制每条数据的操作状态，
                    //网速慢的时候避免用户重复点击开关
                        article.statusDisabled = false
                    });
                    this.commentList = results//把修改后的结果重新赋值给commentList进行渲染
                    this.total_count = total_count
                    this.loading = false//请求成功后关闭loading
                })
            },
            onStatusChange(article) {
                //禁用开关
                article.statusDisabled = true
                commentStatus(article.id.toString(),article.comment_status).then( res=> {
                    //启用开关
                    article.statusDisabled = false
                    this.$message({
                        type: 'success',
                        message: article.comment_status ? '开启成功':'关闭成功'
                    })
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .table-list{
        margin-bottom: 16px;
    }
</style>