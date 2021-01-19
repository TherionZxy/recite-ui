<template>
  <div class="content">
    <span class="label" style="font-size:20px;">请选择一本词书: </span>
    <ul class="book-list">
      <li class="book-item" v-for="(book, index) in books" :key="index">
        <router-link style="text-decoration:none;" :to="'/range/' + book.index">
          <div class="book-content">
            <van-image width="100" height="110" :src="book.cover" />
          </div>
          <span style="color:black;">{{ book.name }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      books: [
        {
          name: "MIT英汉词条互译词典",
          cover: "http://img3m5.ddimg.cn/75/30/28539795-1_w_2.jpg",
          index: 1
        },
        {
          name: "英语笔译常用词语应试手册",
          cover: "http://img3m8.ddimg.cn/79/12/1194506458-1_w_5.jpg",
          index: 2
        }
      ]
    };
  },
  mounted() {
    if (!this.$parent.show) {
      this.$parent.showTabbar();
    }
  }
};
</script>

<style lang="scss">
.content {
  .book-list {
    margin: 10px;
    .book-item {
      float: left;
      list-style: none;
      display: block;
      width: 100px;
      padding-right: 10px;
    }
  }
}
</style>
