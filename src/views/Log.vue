<template>
  <div class="log-content">
    <span class="log-title">测试报告: </span>
    <br />
    <div class="log-score" :style="{ color: score >= 60 ? 'green' : 'red' }">
      {{ score }}
    </div>
    <div class="log-correct">
      正确数：<strong>{{ correct }}</strong>
    </div>
    <div class="log-wrong">
      错误数：<strong>{{ wrong }}</strong>
    </div>

    <van-divider>错题列表</van-divider>
    <ul>
      <li
        v-for="(answer, index) in answers"
        :key="index"
        @click="toWordPage(answer.word.enContent)"
      >
        <div>
          <strong>Your Answer: </strong
          ><span
            v-html="formatYourAnswer(answer.enAnswer, answer.word.enContent)"
          ></span>
        </div>
        <div><strong>Correct: </strong>{{ answer.word.enContent }}</div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correct: 0,
      wrong: 0,
      score: 0.0,
      answers: []
    };
  },
  created() {
    this.axios
      .get("/api/scores/get?scoresId=" + this.$route.params.logId)
      .then(res => {
        var data = res.data;
        if (data.code == 200) {
          this.correct = data.data.correct;
          this.wrong = data.data.wrong;
          this.score = data.data.score;
          // 只记录错题
          data.data.answers.forEach(item => {
            if (item.enAnswer.trim() != item.word.enContent.trim()) {
              this.answers.push(item);
            }
          });
        }
      });
  },
  mounted() {
    if (!this.$parent.show) {
      this.$parent.showTabbar();
    }
  },
  methods: {
    formatYourAnswer(answer, correct) {
      answer = answer.trim();
      // 从左往右匹配，得到第一个与正确答案不符的索值
      if (answer != "") {
        var index = 0;
        for (index = 0; index < answer.length; index++) {
          if (answer[index] != correct[index]) {
            break;
          }
        }
        return (
          "<span style='color:green;'>" +
          answer.substring(0, index) +
          "</span><span style='color:red;'>" +
          answer.substring(index, answer.length) +
          "</span>"
        );
      } else {
        return "<span style='color:black;'>未答题</span>";
      }
    },
    toWordPage(word) {
      this.$router.push("/search/" + word);
    }
  }
};
</script>

<style lang="scss">
.log-content {
  overflow: auto;
  padding: 10px;
  .log-title {
    font-size: 20px;
  }
  .log-score {
    position: relative;
    text-align: right;
    padding-right: 50px;
    font-size: 70px;
  }
  .log-correct {
    color: green;
  }
  .log-wrong {
    color: red;
  }
  ul {
    li:last-child {
      margin-bottom: 44px;
    }
    li {
      border-bottom: 1px dashed skyblue;
      margin-bottom: 10px;
    }
  }
}
</style>
