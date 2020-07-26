<template>
  <div class="content">
    <van-swipe class="my-swipe" @change="onChange" ref="swipe">
      <van-swipe-item
        :style="{ background: problem.rgb }"
        @click="audio(problem.zhContent)"
        v-for="(problem, index) in problems"
        :key="index"
      >
        <van-button
          class="submit-btn"
          size="small"
          plain
          round
          @click.stop="show = true"
          >交 卷</van-button
        >

        <div class="problem-content">
          {{ problem.zhContent }}
        </div>
        <div style="height:40px;">Your Answer:</div>
        <div class="answer-bar" @click.stop>
          <input
            type="text"
            style="height:30px;color:black;"
            v-model="problem.answer"
          />
        </div>
      </van-swipe-item>

      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ problems.length }}
        </div>
      </template>
    </van-swipe>

    <van-overlay :show="show" @click="show = false">
      <div class="wrapper">
        <div class="block">
          <div class="answer-preview">
            <ul>
              <li
                v-for="(problem, index) in problems"
                :key="index"
                @click.stop="switchToProblem(index)"
              >
                <div
                  class="tag"
                  :style="{
                    background:
                      problem.answer.trim() != '' ? 'skyblue' : 'transparent'
                  }"
                >
                  {{ index + 1 }}
                </div>
              </li>
            </ul>
          </div>
          <van-button
            style="font-size:16px;"
            class="submit"
            type="primary"
            size="small"
            @click.stop="submit"
            >提交</van-button
          >
        </div>
      </div>
    </van-overlay>
  </div>
</template>

<script>
import { Dialog, Notify } from "vant";

export default {
  data() {
    return {
      problems: [],
      current: 0,
      show: false
    };
  },
  created() {
    this.axios
      .get(
        "/api/word/search/letters/" +
          this.$route.query.letters +
          "?num=" +
          this.$route.query.num
      )
      .then(res => {
        var data = res.data;
        // 添加answer
        // 添加随机颜色rgb值
        data.data.forEach(item => {
          item.answer = "";
          item.rgb = this.getRandomRgb();
        });

        this.problems = data.data;

        // 如果没有题目：返回上一个页面，并且提示
        if (this.problems.length == 0) {
          Notify({
            type: "warning",
            message: "您选择的字母尚未录入单词，请选择其他字母。"
          });
          this.$router.go(-1);
        }

        // 一进入题目页面，就播放第一个单词的中文音频
        this.audio(data.data[0].zhContent);
      });
  },
  methods: {
    audio(word) {
      let audio = new Audio();
      audio.src =
        "http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" +
        word;
      audio.play();
    },
    onChange(index) {
      this.current = index;
      var word = this.problems[index].zhContent;
      this.audio(word);
    },
    //获取随机颜色
    getRandomRgb() {
      var r = Math.floor(Math.random() * 256);
      var g = Math.floor(Math.random() * 256);
      var b = Math.floor(Math.random() * 256);
      return "rgb(" + r + "," + g + "," + b + ")";
    },
    switchToProblem(index) {
      this.show = false;
      this.$refs.swipe.swipeTo(index);
    },
    submit() {
      // 首先检查是否都写完了，如果都写完了就直接提交，否则弹出提示框询问是否提交
      var count = 0;
      this.problems.forEach(item => {
        if (item.answer.trim() == "") {
          count = count + 1;
        }
      });
      if (count != 0) {
        Dialog.confirm({
          title: "提示",
          message: "您还有 " + count + " 道题没有做完,是否直接提交？"
        })
          .then(() => {
            this.postAnswers();
          })
          .catch(() => {});
      } else {
        this.postAnswers();
      }
    },
    postAnswers() {
      var wordIds = [];
      var answers = [];
      this.problems.forEach(item => {
        wordIds.push(item.wordId);
        answers.push(item.answer);
      });

      this.axios
        .post("/api/scores/submit", {
          wordIds: wordIds,
          answers: answers
        })
        .then(res => {
          // 提交成功后，跳转到成绩页面
          var data = res.data;
          if (data.code == 200) {
            this.$router.replace("/testing");
            this.$router.push("/log/" + data.data);
          }
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  height: 100%;
  padding: 0px;

  .time {
    color: black;
    position: fixed;
    z-index: 999;
    width: 100%;

    div {
      transform: translateX(-50%);
      position: absolute;
      left: 50%;
      background: rgba(255, 255, 255, 0.6);
    }
  }

  .my-swipe {
    height: 100%;
    color: #fff;
    .van-swipe-item {
      font-size: 28px;
      line-height: 150px;
      text-align: center;
      background-color: #39a9ed;

      .problem-content {
        padding-top: 100px;
      }
      .answer-bar {
      }
      .submit-btn {
        float: left;
        top: 5px;
        left: 5px;
      }
    }
    .custom-indicator {
      position: absolute;
      right: 5px;
      top: 5px;
      padding: 2px 5px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.1);
    }
  }
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    .block {
      width: 80%;
      height: 40%;
      background-color: #fff;

      .answer-preview {
        height: 85%;
        li {
          float: left;
          list-style: none;
          padding: 5px;
          .tag {
            height: 30px;
            width: 30px;
            border: 1px solid black;
          }
        }
        overflow: auto;
      }

      .submit {
        height: 15%;
        width: 100%;
      }
    }
  }
}
</style>
