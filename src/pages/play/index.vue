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
            <i class="icon paly-btn" @click="palyOrPause"> {{ isPaly ? '&#xe6bd;' : '&#xe607;' }}</i>
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
            musicDetailsName: [],
            musicDetailsImg: "",
            rotate: false,
            animation: "",
            percent: 10,
            status: true,
            musicUrlData: "",
            musicDetailsName: "",
            backgroundAudioManager: "",
            isPaly: false
        };
    },
    computed: {
        ...mapGetters({ client: "getterClient" })
    },
    onLoad: function(options) {
        this.status = true;
        wx.setStorageSync("status", true);
        // this.rotate = true;
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

        this.backgroundAudioManager = wx.getBackgroundAudioManager();
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
        this.getPageDetail(33894312);
    },
    created() {},
    mounted() {
        /**
         * 监听音乐播放
         */
        wx.onBackgroundAudioPlay(function() {
            // callback
            console.log("onBackgroundAudioPlay");
            // console.log(this.backgroundAudioManager.duration);
        });
        /**
         * 监听音乐暂停
         */
        wx.onBackgroundAudioPause(function() {
            // callback
            console.log("onBackgroundAudioPause");
        });
        // this.getPageDetail(33894312);
    },
    methods: {
        ...mapActions([
            "showLoading",
            "showToast",
            "getSongUrl",
            "getSongDetail"
        ]),
        /**
         * getPageDetail 获取歌曲
         * @param id  歌曲的id
         * @returns {Promise<*>}
         */
        getPageDetail(id) {
            Promise.all([this.getPageSongDetail(id), this.getPageSongUrl(id)])
                .then(([detail, urlData]) => {
                    //歌曲详情
                    this.musicDetailsData = detail;
                    this.musicDetailsImg = detail.songs[0].al.picUrl;
                    let musicDetailsTitle = detail.songs[0].al.name;
                    this.musicDetailsName = detail.songs[0].ar;

                    this.backgroundAudioManager.title = musicDetailsTitle;
                    this.backgroundAudioManager.singer = this.musicDetailsName;
                    this.backgroundAudioManager.coverImgUrl = this.musicDetailsImg;
                    wx.setNavigationBarTitle({
                        title: musicDetailsTitle //页面标题为路由参数
                    });
                    //歌曲url信息
                    this.musicUrlData = urlData.data[0].url;
                    this.backgroundAudioManager.src = this.musicUrlData;

                    this.isPaly = true;
                    this.rotate = true;
                })
                .catch(error => {
                    console.log;
                    this.showToast(error ? error : "error");
                });
        },
        /**
         * getSongDetail 获取歌曲详情
         * @param id  歌曲的id
         * @returns {Promise<*>}
         */
        getPageSongDetail(id) {
            return new Promise((resolve, reject) => {
                console.log("Promise");
                this.getSongDetail({ ids: id }).then(res => {
                    if (res && res.code == 200) {
                        resolve(res);
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getPageSongUrl 获取歌曲的音频url
         * @param id  歌曲的id
         * @returns {Promise<*>}
         */
        getPageSongUrl(id) {
            return new Promise((resolve, reject) => {
                this.getSongUrl({ id: id }).then(res => {
                    if (res && res.code == 200) {
                        resolve(res);
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getPageSongUrl 获取歌曲的音频url
         * @param id  歌曲的id
         * @returns {Promise<*>}
         */
        palyOrPause() {
            if (this.isPaly) {
                console.log("暂停");
                this.backgroundAudioManager.pause();
                this.isPaly = false;
                this.rotate = false;
            } else {
                console.log("播放");
                this.backgroundAudioManager.play();
                this.isPaly = true;
                this.rotate = true;
            }
        }
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