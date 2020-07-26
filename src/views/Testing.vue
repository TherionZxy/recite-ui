<template>
  <div class="content">
    <span class="label">请选择想要测试的单词范围：</span>
    <van-checkbox-group
      class="letters"
      v-model="letters"
      direction="horizontal"
    >
      <van-checkbox class="letter" shape="square" name="a">A</van-checkbox>
      <van-checkbox class="letter" shape="square" name="b">B</van-checkbox>
      <van-checkbox class="letter" shape="square" name="c">C</van-checkbox>
      <van-checkbox class="letter" shape="square" name="d">D</van-checkbox>
      <van-checkbox class="letter" shape="square" name="e">E</van-checkbox>
      <van-checkbox class="letter" shape="square" name="f">F</van-checkbox>
      <van-checkbox class="letter" shape="square" name="g">G</van-checkbox>
      <van-checkbox class="letter" shape="square" name="h">H</van-checkbox>
      <van-checkbox class="letter" shape="square" name="i">I</van-checkbox>
      <van-checkbox class="letter" shape="square" name="j">J</van-checkbox>
      <van-checkbox class="letter" shape="square" name="k">K</van-checkbox>
      <van-checkbox class="letter" shape="square" name="l">L</van-checkbox>
      <van-checkbox class="letter" shape="square" name="m">M</van-checkbox>
      <van-checkbox class="letter" shape="square" name="n">N</van-checkbox>
      <van-checkbox class="letter" shape="square" name="o">O</van-checkbox>
      <van-checkbox class="letter" shape="square" name="p">P</van-checkbox>
      <van-checkbox class="letter" shape="square" name="q">Q</van-checkbox>
      <van-checkbox class="letter" shape="square" name="r">R</van-checkbox>
      <van-checkbox class="letter" shape="square" name="s">S</van-checkbox>
      <van-checkbox class="letter" shape="square" name="t">T</van-checkbox>
      <van-checkbox class="letter" shape="square" name="u">U</van-checkbox>
      <van-checkbox class="letter" shape="square" name="v">V</van-checkbox>
      <van-checkbox class="letter" shape="square" name="w">W</van-checkbox>
      <van-checkbox class="letter" shape="square" name="x">X</van-checkbox>
      <van-checkbox class="letter" shape="square" name="y">Y</van-checkbox>
      <van-checkbox class="letter" shape="square" name="z">Z</van-checkbox>
    </van-checkbox-group>

    <span class="label">请选择想要测试的单词数：</span>

    <van-cell @click="showPopup">测试 {{ number }} 个单词</van-cell>
    <van-popup position="bottom" style="width:100%;" v-model="show">
      <van-picker
        title="标题"
        show-toolbar
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
      />
    </van-popup>

    <div style="width:100%;text-align:center;margin-top:20px;">
      <van-button
        v-if="letters.length > 0"
        style="width:90%;"
        :to="'/problem?letters=' + letters.join('') + '&num=' + number"
        >就选这些</van-button
      >
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      letters: [],
      show: false,
      number: 10,
      columns: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
    };
  },
  methods: {
    showPopup() {
      this.show = true;
    },
    onConfirm(value) {
      this.number = value;
      this.show = false;
    },
    onCancel() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss">
.content {
  .label-letters {
    font-size: 16px;
  }
  padding: 10px;
  .letters {
    padding: 15px;
    .letter {
      width: 40px;
      padding: 5px;
    }
  }
}
</style>
