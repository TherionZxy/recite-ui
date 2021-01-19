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
    <div class="tabbar" v-show="show" route>
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
    <div style="font-size:18px;color:gray;" class="hold" v-show="!show">
      {{ getRandom }}
    </div>
  </div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      active: "home",
      show: true,
      some: [
        "目标再远大，终离不开信念去支撑。",
        "宝剑锋从磨砺出，梅花香自苦寒来。",
        "天行健,君子以自强不息。",
        "天生我材必有用，千金散尽还复来。",
        "千磨万击还坚劲，任尔东西南北风。",
        "路漫漫其修远兮，吾将上下而求索。",
        "博观而约取，厚积而薄发。",
        "博学之,审问之,慎思之,明辨之,笃行之。",
        "I love you."
      ]
    };
  },
  computed: {
    getRandom() {
      return this.some[Math.floor(Math.random() * this.some.length)];
    }
  },
  mounted() {
    // 使main中内容的高度自适应
    var headerHeight = document.getElementsByClassName("header")[0]
      .offsetHeight;
    var tabbarHeight = document.getElementsByClassName("van-tabbar-item")[0]
      .offsetHeight;
    var windowHeight = document.body.offsetHeight;
    document.getElementsByClassName("main")[0].style.height =
      windowHeight - headerHeight - tabbarHeight + "px";
    document.getElementsByClassName("hold")[0].style.height =
      tabbarHeight - 10 + "px";
  },
  methods: {
    // 隐藏下方的导航栏
    hiddenTabbar() {
      this.show = false;
    },
    showTabbar() {
      this.show = true;
    }
  }
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

  .hold {
    text-align: center;
    padding-top: 10px;
  }
}
</style>
