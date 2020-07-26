<template>
  <div id="app">
    <!-- 网页Header -->
    <div class="header">
      <van-nav-bar title="小芳背单词" left-text="" right-text="" />
    </div>

    <!-- 网页Main -->
    <div class="main">
      <router-view></router-view>
    </div>

    <!-- 网页Tabbar -->
    <div class="tabbar" route>
      <van-tabbar v-model="active">
        <van-tabbar-item name="home" icon="home-o" replace to="/home"
          >Home</van-tabbar-item
        >
        <van-tabbar-item name="search" icon="search" replace to="/search"
          >Search</van-tabbar-item
        >
        <van-tabbar-item name="testing" icon="edit" replace to="/testing"
          >Testing</van-tabbar-item
        >
        <van-tabbar-item name="logs" icon="todo-list-o" replace to="/logs"
          >Logs</van-tabbar-item
        >
      </van-tabbar>
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      active: "home"
    };
  },
  components: {},
  mounted() {
    // 使main中内容的高度自适应
    var headerHeight = document.getElementsByClassName("header")[0]
      .offsetHeight;
    var tabbarHeight = document.getElementsByClassName("van-tabbar-item")[0]
      .offsetHeight;
    var windowHeight = document.body.offsetHeight;
    document.getElementsByClassName("main")[0].style.height =
      windowHeight - headerHeight - tabbarHeight + "px";
  },
  methods: {}
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;

  overflow: scroll;
  overflow-x: hidden;
  height: 100%;
}
</style>
