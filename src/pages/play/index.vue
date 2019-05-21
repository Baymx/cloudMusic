<template>
    <div class="paly" :style="{'height': client.height + 'px'}">
        <div class="author">
            <div class="author" v-for="item in musicDetailsName" :key="item.id">
                {{item.name}}
            </div>
        </div>
        <div class="banner-img">
            <img :src="musicDetailsImg" alt="" style="width:550rpx;height:550rpx" :class="{'rotate': rotate}">
        </div>
        <div class="musicMini">
            <!-- 收藏 -->
            <i class="icon">&#xe600;</i>
            <!-- 下载 -->
            <i class="icon">&#xe64c;</i>
            <!-- 讨论 -->
            <i class="icon">&#xe601;</i>
            <!-- 详情 -->
            <i class="icon">&#xe603;</i>
        </div>
        <div class="progress">
            <i-progress i-class="progress-line" :percent="percent" stroke-width="3" hide-info=true></i-progress>
        </div>
        <div class="musicIcon">
            <!-- 循环模式 -->
            <i class="icon">&#xe614;</i>
            <!-- 上一曲 -->
            <i class="icon">&#xe637;</i>
            <!-- 播放/暂停 -->
            <i class="icon paly-btn">&#xe607;</i>
            <!-- 下一曲 -->
            <i class="icon">&#xe647;</i>
            <!-- 播放列表 -->
            <i class="icon">&#xe60c;</i>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { setStorage, getStorage } from "@/utils/index";
import store from "@/store/index";
export default {
    data() {
        return {
            userInfo: {},
            musicDetailsName: [
                {
                    id: 11127,
                    name: "Beyond",
                    tns: [],
                    alias: []
                }
            ],
            musicDetailsImg:
                "https://p1.music.126.net/QHw-RuMwfQkmgtiyRpGs0Q==/102254581395219.jpg",
            rotate: false,
            animation: "",
            percent: 10,
            status: true,
            musicUrlData: "",
            musicDetailsName :""
        };
    },
    methods: {
        ...mapActions([
            "showLoading",
            "showToast",
            "getSongUrl",
            "getSongDetail"
        ])
    },
    computed: {
        ...mapGetters({ client: "getterClient" })
    },
    onLoad: function(options) {
        this.status = true;
        console.log(1111)
        wx.setStorageSync("status", true);
        this.rotate = true;
        // this.zanting.zhuangtai = true;
        this.id = options.id;
        let playing = wx.getStorageSync("playing");

        let chongfu = [];
        for (let index = 0; index < playing.length; index++) {
            const element = playing[index];
            if (element.id == this.id) {
                element.status = true;
                var elementIDxiangtong = true;
            } else {
                element.status = false;
            }
            chongfu.push(element.id);
        }
        for (let index = 0; index < chongfu.length; index++) {
            let elementq = chongfu[index];
        }
        if (!elementIDxiangtong) {
            let status = {
                id: this.id,
                status: true
            };
            playing.unshift(status);
        }
        wx.setStorageSync("playing", playing);

        const backgroundAudioManager = wx.getBackgroundAudioManager();
        let musicId = wx.getStorageSync("musicId");

        var postsCollected = wx.getStorageSync("posts_collected");
        if (postsCollected) {
            var postcollected = postsCollected[this.id];
            // 如果是一个新的页面，那么给collected传递一个undefind会报错
            // this.dianzan.zhuangtai = postcollected;
        } else {
            //首次直接跳到else
            var _postcollected = {};
            _postcollected = false;
            // 把初始化的值变为数组 ！
            wx.setStorageSync("posts_collected", {
                postcollected: _postcollected
            });
        }
         console.log(1111)
        this.getSongUrl({ id: 33894312 }).then(res => {
            console.log(res);
            this.musicUrlData = res.data[0].url;
            console.log(this.musicUrlData)
            backgroundAudioManager.src = this.musicUrlData;
        }).catch(e=>{
            console.log(e)
        });
        console.log(22)

        this.getSongDetail({ ids: 33894312 }).then(res => {
            console.log(res)
            // this.musicDetailsData = d.data;
            // this.musicDetailsImg = d.data.songs[0].al.picUrl;
            // let musicDetailsTitle = d.data.songs[0].al.name;
            // this.musicDetailsName = d.data.songs[0].ar;
            // backgroundAudioManager.title = musicDetailsTitle;
            // backgroundAudioManager.singer = this.musicDetailsName;
            // backgroundAudioManager.coverImgUrl = this.musicDetailsImg;
        }).catch(e=>{
            console.log(e)
        });
    },
    created() {},
    mounted() {
        /**
         * 监听音乐播放
         */
        wx.onBackgroundAudioPlay(function() {
            // callback
            console.log("onBackgroundAudioPlay");
        });
        /**
         * 监听音乐暂停
         */
        wx.onBackgroundAudioPause(function() {
            // callback
            console.log("onBackgroundAudioPause");
        });
    }
};
</script>
<style lang="scss" scoped>
.paly {
    display: flex;
    flex-direction: column;
    background: #999;
    padding: 0 40px;
    position: relative;
    .author {
        font-size: 24px;
        text-align: center;
        color: #fff;
        margin-top: 6px;
        display: flex;
        justify-content: center;
        align-items: center;
        div {
            margin-right: 10px;
        }
    }
    .banner-img {
        width: 550rpx;
        height: 550rpx;
        border-radius: 50%;
        border: 40rpx solid #000;
        margin: 46rpx auto 0;
        overflow: hidden;
        .rotate {
            animation: rotate 5s linear infinite;
        }
        @keyframes rotate {
            from {
                transform: rotate(0deg);
            }
            to {
                transform: rotate(360deg);
            }
        }
    }
    .musicMini {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 600rpx;
        margin-top: 50px;
        .icon {
            font-family: "iconfont";
            font-size: 20px;
            color: #fff;
        }
    }
    .progress {
        margin-top: 20px;
    }
    .musicIcon {
        width: 600rpx;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 30px;
        .icon {
            width: 30px;
            font-family: "iconfont";
            font-size: 20px;
            color: #fff;
        }
        .paly-btn {
            font-size: 30px;
        }
    }
}
</style>