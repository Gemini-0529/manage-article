<template>
    <div class="cover-container" @click="showDialog">
        <div class="cover-wrap">
            <img src="" alt="">
        </div>
        <el-dialog :visible.sync="dialogVisible" width="50%" append-to-body>
            <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
                <el-tab-pane label="素材库" name="first">素材库</el-tab-pane>
                <el-tab-pane label="上传图片" name="second">上传图片</el-tab-pane>
            </el-tabs>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
<script>
    export default {
        name: 'articleCover',
        data() {
            return {
                dialogVisible: false,
                activeName: 'second'
            }
        },
        methods: {
            showDialog() {
                this.dialogVisible = true
            },
             handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>
<style lang="less" scoped>
.cover-container{
    display: flex;
    justify-content: flex-start;
    .cover-wrap{
        width: 120px;
        height: 120px;
        border: 1px dashed #409EFF;
        border-radius: 4px;
    }
}
</style>