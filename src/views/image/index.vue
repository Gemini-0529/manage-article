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
                <el-radio-group v-model="collect" size="small" @change="loadImages">
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
                    style="margin-bottom:16px">
                        <el-image  class="el-img"
                            :src= "img.url"
                            fit="cover">
                        </el-image>
                    </el-col>
                </el-row>
                <!-- /图片列表 -->
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
    import { getImages } from '@/api/images'
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
                }
            }
        },
        created() {
            this.loadImages(false)
        },
        methods: {
            loadImages(value) {
                getImages({collect:value}).then(res=>{
                    this.images = res.data.data.results
                })
            },
            onUploadSuccess() {
                this.dialogUploadVisible = false//上传成功后隐藏弹出框
                this.loadImages(false)//上传成功后更新列表
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
</style>