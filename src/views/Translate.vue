<template>
    <div class="content">
        <div class="detail">
            <div id="en" @click="audio">{{ en }}</div>
            <div id="zh">{{ zh }}</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            en: "",
            zh: "",
            msg: ""
        }
    },
    created() {
        this.axios.get('/api/word/remote/'+this.$route.params.word).then(res => {
            var data = res.data
            if(data.code == 200) {
                this.en = data.data.enContent
                this.zh = data.data.zhContent
            } else {
                this.msg = data.data.msg
            }
        })
    },
    methods: {
        audio() {
            let audio = new Audio()
            audio.src = "http://dict.youdao.com/dictvoice?audio=" + this.en
            audio.play()
        }
    }
}
</script>

<style lang="scss">
    .content {
        height: 100%;

        .detail {
            position: relative;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
            width: fit-content;

            #en {
                width: fit-content;
                font-size: 40px;
            }
            #zh {
                width: fit-content;
                float: right;
            }
        }
    }
</style>