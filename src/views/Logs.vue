<template>
  <div class="content">
    <ul class="log-ul">
      <li
        v-for="(log, index) in logs"
        :key="index"
        @click="toDetailLog(log.scoresId)"
      >
        <van-row>
          <van-col span="9" class="wrong"
            >错误数：<strong>{{ log.wrong }}</strong></van-col
          >
          <van-col offset="6" span="9" class="correct"
            >正确数：<strong>{{ log.correct }}</strong></van-col
          >
        </van-row>
        <van-row>
          <van-col class="score"
            >分数：<strong
              :style="{ color: log.score >= 60 ? 'green' : 'red' }"
              >{{ log.score }}</strong
            ></van-col
          >
        </van-row>
        <van-row class="time">
          <van-col>时间：{{ log.createTime | parseTime }}</van-col>
        </van-row>
      </li>
    </ul>
  </div>
</template>

<script>
import { parseTime } from "../static/format";

export default {
  data() {
    return {
      logs: [],
      page: 0,
      size: 10,
      total: 0
    };
  },
  filters: {
    parseTime
  },
  created() {
    this.axios
      .get("/api/scores/getall?page=" + this.page + "&size=" + this.size)
      .then(res => {
        var data = res.data;
        if (data.code == 200) {
          this.logs = data.data.scoresList;
          this.total = data.data.total;
        }
      });
  },
  mounted() {
    if (!this.$parent.show) {
      this.$parent.showTabbar();
    }
  },
  methods: {
    toDetailLog(logId) {
      this.$router.push("/log/" + logId);
    }
  }
};
</script>

<style lang="scss">
.content {
  height: 100%;
  overflow: auto;
  .log-ul {
    height: 100%;
    li:first-child {
      border-top: 10px double skyblue;
    }
    li:last-child {
      border-bottom: 10px double skyblue;
      margin-bottom: 24px;
    }
    li {
      height: 100px;
      border-left: 10px double skyblue;
      border-right: 10px double skyblue;
      border-bottom: 2px dashed skyblue;
      .wrong {
        font-size: 16px;
        padding: 5px;
        color: red;
      }
      .correct {
        font-size: 16px;
        padding: 5px;
        color: green;
      }
      .score {
        font-size: 16px;
        padding: 5px;
      }
      .time {
        position: relative;
        float: right;
        color: gray;
        font-size: 14px;
      }
    }
  }
}
</style>
