<template>
  <div>
    主页暂无内容，下次更新添加外文新闻等内容。
  </div>
</template>

<script>
export default {
  mounted() {
    if (!this.$parent.show) {
      this.$parent.showTabbar();
    }
  }
};
</script>

<style lang="scss" scoped></style>
