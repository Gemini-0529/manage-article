<template>
  <el-container class="layout-container">
    <el-aside class="aside" width="auto">
      <!-- ↓侧边栏组件 -->
      <app-aside class="aside-menu" :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div class="header-left">
          <i
            :class="{
              'el-icon-arrow-left': !isCollapse,
              'el-icon-arrow-right': isCollapse,
            }"
            @click="isCollapse = !isCollapse"
          ></i>
          <span>后台管理系统</span>
        </div>
        <el-dropdown>
          <div class="header-right">
            <img :src="user.photo" alt="" />
            <span>{{ user.name }}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>
              <router-link to="/setting" style="text-decoration:none">个人中心</router-link>
              </el-dropdown-item>
            <!-- 组件默认不识别原生事件，除非内部做了处理 -->
            <!--                  原生事件修饰符 -->
            <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-main class="main">
        <!-- 子路由出口，切换子路由 -->
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import AppAside from "./components/aside"
import { getUserProfile } from "@/api/user"
import globalBus from "@/utils/global-bus"

export default {
  name: "LayoutIndex",
  data() {
    return {
      user: {},
      isCollapse: false, //侧边栏展示状态
    };
  },
  created() {
    this.loadUserProfile()
    //注册接收setting的数据
    globalBus.$on('update-user',val=>{
      this.user.name = val.name
      this.user.photo = val.photo
    })
    //注册接收setting的数据
  },
  methods: {
    loadUserProfile() {
      getUserProfile().then((res) => {
        //发送请求
        this.user = res.data.data;
        
      });
    },
    logOut() {
      this.$confirm("确认退出吗?", "退出提示", {
        //MessageBox弹框
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          window.localStorage.removeItem("user");
          this.$router.push("/login");
        })
        .catch(() => {});
    },
  },
  components: { AppAside },
};
</script>
<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  .aside-menu {
    height: 100%;
  }
  .header {
    border-bottom: 1px solid #ccc;
    display: flex;
    align-items: center;
    justify-content: space-between;
    line-height: 60px;
    color: #606266;
    .header-left {
      display: flex;
      align-items: center;
      i {
        margin-right: 10px;
      }
      span {
        letter-spacing: 1px;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      img {
        width: 26px;
        height: 26px;
        border-radius: 50%;
        margin-right: 5px;
      }
    }
  }
  .el-dropdown-link {
    cursor: pointer;
    color: #409eff;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
}
</style>
