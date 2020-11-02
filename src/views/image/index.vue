<template>
    <div class="image-contain">
        <el-card class="box-card">
            <div slot="header" class="clearfix">
                <el-breadcrumb separator-class="el-icon-arrow-right">
                    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                    <el-breadcrumb-item>素材管理</el-breadcrumb-item>
                </el-breadcrumb>
            </div>
            <div class="control-btn">
                <el-radio-group v-model="collect" size="small" @change="loadImages(1)">
                    <el-radio-button :label="false">全部</el-radio-button>
                    <el-radio-button :label="true">收藏</el-radio-button>
                </el-radio-group>
                <el-button type="primary" size="small" @click="dialogUploadVisible=true">
                    <i class="el-icon-upload el-icon--left"></i>上传</el-button>
            </div>        
                <!-- 图片列表 -->
                <el-row :gutter="16" style="margin-top:20px">
                    <el-col :lg="4" :md="6" :sm="6" :xs="12" v-for="(img,index) in images"
                    :key="index"
                    class="image-item">
                        <el-image  class="el-img"
                            :src= "img.url"
                            fit="cover">
                        </el-image>
                        <div class="collect-img">
                            <i :class="{
                                'el-icon-star-on': img.is_collected,
                                'el-icon-star-off': !img.is_collected
                            }" @click="onCollectImage(img)"></i>
                            <i class="el-icon-delete" @click="onDeleteImage(img)"></i>
                        </div>
                    </el-col>
                </el-row>
                <!-- /图片列表 -->
        <!-- 分页条 -->
            <el-pagination
                layout="prev, pager, next"
                background
                :total="totalCount"
                :page-size="pageSize"
                :current-page.sync="page"
                @current-change="loadImages"
                >
                <!-- disabled为了防止网络延迟高，用户一直点击按钮进行查询 -->
            </el-pagination>
        </el-card>
        <!-- 上传图片弹出框 -->
        <el-dialog title="上传素材" :visible.sync="dialogUploadVisible" :append-to-body="true">
            <!-- upload组件本身支持请求提交上传操作 -->
            <el-upload class="upload-demo"
            drag
            multiple
            :show-file-list="false"
            action="http://ttapi.research.itcast.cn/mp/v1_0/user/images"
            :headers="uploadHeaders"
            name="image"
            :on-success="onUploadSuccess">
                <i class="el-icon-upload"></i>
                <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
        </el-dialog>
    </div>
</template>
<script>
    import { getImages,collectImage,delImage } from '@/api/images'
    export default {
        name:'app-image',
        data() {
            const user = JSON.parse(window.localStorage.getItem('user'))
            return {
                collect: false,
                images: [],
                dialogUploadVisible: false,
                uploadHeaders: {
                    Authorization: `Bearer ${user.token}`
                },
                pageSize:18,//每页几张图片
                page:1,//页码
                totalCount:0//总张数
            }
        },
        created() {
            this.loadImages(1,false)
        },
        methods: {
            loadImages(page,collect) {
                this.page = page//解决页码不匹配的bug
                getImages({//获取图片列表
                    collect:this.collect,
                    page,
                    per_page:this.pageSize
                    }).then(res=>{
                        const {results,total_count} = res.data.data
                        this.images = results
                        this.totalCount = total_count
                })
            },
            onUploadSuccess() {//上传图片
                this.dialogUploadVisible = false//上传成功后隐藏弹出框
                this.$message({
                    type:'success',
                    message:'上传成功'
                })
                this.loadImages(this.page)//上传成功后更新列表
            },
            onCollectImage(img) {//收藏/取消
                //如果已收藏，则取消收藏
                //如果没收藏，则收藏
                collectImage(img.id,!img.is_collected).then(res=>{
                    img.is_collected = !img.is_collected
                })
            },
            onDeleteImage(img) {//删除图片
                delImage(img.id).then(res=>{
                    this.loadImages(this.page)
                })
            }
        }
    }
</script>
<style lang="less" scoped>
    .el-img{
        height: 100px;
        border-radius: 2px;
    }
    .el-img:hover{
        box-shadow: 1px 1px 4px 0 #ccc;
    }
    .control-btn{
        display:flex;
        justify-content: space-between;
    }
    .image-item{
        margin-bottom:16px;
        position: relative;
        .collect-img{
            height: 100px;
            background-image: linear-gradient(to top,#000 0%,transparent 40%);
            opacity: 0;
            position: absolute;
            bottom: 4px;
            left: 8px;
            right: 8px;
            color: white;
            display: flex;
            justify-content: space-evenly;
            font-size: 20px;
            i{
                margin-top: 76px;
            };
            i:hover{
                cursor: pointer;
            }
        }
        .collect-img i:first-child{
            color: #F9F871;
        }
        .collect-img i:last-child{
            color: rgb(206, 11, 11);
        }
        .collect-img:hover{
            Transition-property:all;
            opacity: .6;
        }
    }
    
    
</style>