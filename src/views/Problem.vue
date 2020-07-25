<template>
    <div>
        题目列表:
        <div v-for="(problem, index) in problems" :key="index" @click="audio(problem.zhContent)">{{problem.enContent}} - {{problem.zhContent}}</div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            problems: []
        }
    },
    created() {
        this.axios.get('/api/word/search/letters/'+this.$route.query.letters+'?num='+this.$route.query.num).then(res => {
            var data = res.data
            this.problems = data.data
        })
    },
    methods: {
        audio(word) {
            let audio = new Audio()
            audio.src = "http://tts.baidu.com/text2audio?cuid=baiduid&lan=zh&ctp=1&pdt=311&tex=" + word
            audio.play()
        }
    }
}
</script>

<style lang="scss">
    
</style>