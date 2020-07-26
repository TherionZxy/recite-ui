<template>
  <div>
    <!-- 搜索栏 -->
    <van-search v-model="key" placeholder="请输入想要搜索的单词/短语" />
    <!-- 热词榜 当key 为空时将其设置为显示 -->
    <div class="hot-words" v-if="key == ''">
      <ul>
        <li
          v-for="(word, index) in hots"
          :key="index"
          :style="{ color: getRandomRgb() }"
        >
          {{ word }}
        </li>
      </ul>
    </div>
    <!-- 搜索到的单词列表 取数据库中存的单词 -->
    <div class="search-words" v-else>
      <ul class="search-ul">
        <li v-for="(word, index) in search" :key="index">
          <router-link class="search-item" :to="'/search/' + word.enContent">
            <van-row>
              <van-col span="12">
                <van-row class="en">{{ word.enContent }}</van-row>
                <br />
              </van-col>
              <van-col span="12">
                <br />
                <van-row class="zh" style="float:right;">{{
                  word.zhContent
                }}</van-row>
              </van-col>
            </van-row>
          </router-link>
        </li>
      </ul>

      <!-- 若数据库中不存在该单词，则使用百度翻译api进行搜索 -->
      <van-button
        v-if="search.length == 0"
        :to="'/translate/' + key"
        style="width:100%;"
      >
        没搜到？点击查询网络词典
      </van-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      key: "",
      hots: ["happy", "fun", "fantasy", "ok", "beautiful", "yep"],
      search: []
    };
  },
  watch: {
    key(val) {
      if (val != "") {
        this.axios.get("/api/word/search/" + val + "?num=" + 10).then(res => {
          var data = res.data;
          if (data.code == 200) {
            this.search = data.data;
          }
        });
      }
    }
  },
  methods: {
    //获取随机颜色
    getRandomRgb() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    }
  }
};
</script>

<style lang="scss">
.hot-words {
  padding: 10px;
  padding-top: 5px;
  ul li {
    float: left;
    margin: 2px 5px;
    list-style: none;
    display: block;
  }
}
.search-words {
  padding: 10px;
  padding-top: 5px;

  .search-item {
    color: black;
  }

  .search-ul li {
    border-bottom: 1px dashed gray;
    border-left: 1px dashed gray;
    border-right: 1px dashed gray;
    padding: 5px;

    .en {
      font-size: 20px;
    }
    .zh {
      font-size: 15px;
      color: gray;
    }
  }

  ul li:first-child {
    border-top: 1px dashed gray;
  }
}
</style>
