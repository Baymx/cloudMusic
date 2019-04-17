<template>
    <div class="index">
        <div class="carouselDiv">
            <swiper indicator-dots indicator-color="glay" indicator-active-color='red' autoplay="2000" circular>
                <block v-for="( item , index) in banner" :key="index">
                    <swiper-item>
                        <image :src="item.imageUrl" />
                    </swiper-item>
                </block>
            </swiper>
        </div>
        <div class="centerView">
            <div class="innerView" @click="toNewSong">
                <img src="/static/image/index/everyday-recommend.png" />
                <span class="iconSpan">每日推荐</span>
            </div>
            <div class="innerView" @click="toSonglistPage">
                <img src="/static/image/index/song-list.png" />
                <span class="iconSpan">歌单</span>
            </div>
            <div class="innerView" @click="toRank">
                <img src="/static/image/index/ranking.png" />
                <span class="iconSpan">排行榜</span>
            </div>
        </div>
        <div class="personalized">
            <span class="perSpan">推荐歌单></span>
            <div class="gdView">
                <div class="gdInnerView" v-for="item in recommendResource" :key="item.id" :id="item.id" @click='toPlayListDetail(item.id)'>
                    <div class="playCountMain">
                        <div class="playCount">
                            <i-icon type="customerservice" />
                            <span>{{item.playCount}}</span>
                        </div>
                        <img class="innerImg" :src="item.picUrl" /></div>
                    <span class="innerText">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="personalized">
            <span class="perSpan">推荐新音乐 ></span>
            <div class="gdView" @click="toPlay">
                <div class="gdInnerView" v-for="item in personalizedNewsong" :key="item.id">
                    <img class="innerImg" :src="item.song.album.blurPicUrl" :data-id="item.id" :data-index="index" />
                    <span class="innerText">{{item.name}}</span>
                </div>
            </div>
        </div>
        <div class="personalized">
            <span class="perSpan">推荐节目></span>
            <div class="gdView">
                <div class="gdInnerView" v-for="item in personalizedDJprogram" :key="item.id">
                    <div>
                        <img class="innerImg" :src="item.picUrl" />
                    </div>
                    <span class="innerText">{{item.name}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { setStorage, getStorage } from "@/utils/index";
import store from "@/store/index";
import { resolve } from "url";
import { rejects } from "assert";
import { error } from "util";
export default {
    data() {
        return {
            motto: "Hello World",
            userInfo: {},
            banner: [],
            recommendResource: [],
            personalizedNewsong: [],
            personalizedDJprogram: []
        };
    },
    methods: {
        ...mapActions([
            "showLoading",
            "showToast",
            "apiGetDemo",
            "getMvFirst",
            "getBanner",
            "getPersonalized",
            "getNewsong",
            "getDJprogram"
        ]),
        getUserInfo1() {
            this.apiGetDemo().then(res => {
                console.log(res);
            });

            // wx.login({
            //     success: res => {
            //         if (res.code) {
            //             // 发起网络请求
            //             wx.request({
            //                 url: "https://api.weixin.qq.com/sns/jscode2session",
            //                 data: {
            //                     js_code: res.code,
            //                     appid: "wxc71abefa69bce58f",
            //                     grant_type: "authorization_code",
            //                     secret: "a93af2895f71bfdc415b49f7f34f5248"
            //                 }
            //             });
            //         } else {
            //             console.log("登录失败！" + res.errMsg);
            //         }
            //     }
            // });
        },
        search() {
            wx.checkSession({
                success(res) {
                    // session_key 未过期，并且在本生命周期一直有效
                    console.log(res);
                    console.log("checkSession success");
                },
                fail(err) {
                    // session_key 已经失效，需要重新执行登录流程
                    console.log(err.errMsg);
                    console.log("checkSession fail");
                    wx.navigateTo({
                        url: "/pages/login/main"
                    });
                }
            });
        },
        /**
         * login 登陆
         * success
         * fail
         */
        login() {
            var _this = this;
            // store.commit("APP_LOADING", {});
            wx.login({
                success(res) {
                    if (res.code) {
                        console.log(res);
                        _this.getUserInfo(res.code);
                    } else {
                        store.commit("APP_TOAST", "登录失败！" + res.errMsg);
                    }
                },
                fail(err) {
                    store.commit("APP_TOAST", "登录失败！" + err);
                }
            });
        },
        /**
         * getUserInfo 全局的设置stotage
         * @param code
         * @param callback
         */
        getUserInfo(code, callback) {
            wx.getUserInfo({
                // 获取成功，全局存储用户信息，开发者服务器登录
                success(res) {
                    // 全局存储用户信息
                    console.log(res);
                    // store.commit("storeUpdateWxUser", res.userInfo);
                    // postLogin(code, res.iv, res.encryptedData, callback);
                },
                // 获取失败，弹窗提示一键登录
                fail() {
                    wx.hideLoading();
                    // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
                    // 使用token管理登录态的，清楚存储全局的token
                    // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
                    // store.commit("storeUpdateToken", "");
                    // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
                    // showLoginModal();
                }
            });
        },
        /**
         * getBannerData 获取banner数据 ----轮播图数据
         * @returns { Promise }
         */
        getBannerData() {
            return new Promise((resolve, reject) => {
                this.getBanner().then(res => {
                    if (res && res.code == 200) {
                        resolve(res.banners);
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getNewsongData 获取推荐新歌数据
         * @returns { Promise }
         */
        getNewsongData() {
            return new Promise((resolve, reject) => {
                this.getNewsong({ limit: 6 }).then(res => {
                    if (res && res.code == 200) {
                        resolve(res.result.slice(0, 6));
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getPersonalizedData 获取推荐歌单数据
         * @returns { Promise }
         */
        getPersonalizedData() {
            return new Promise((resolve, reject) => {
                this.getPersonalized({ limit: 6 }).then(res => {
                    if (res && res.code == 200) {
                        resolve(res.result);
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getDJprogramData 获取推荐节目数据
         * @returns { Promise }
         */
        getDJprogramData() {
            return new Promise((resolve, reject) => {
                this.getDJprogram({ limit: 6 }).then(res => {
                    if (res && res.code == 200) {
                        resolve(res.result.slice(0, 6));
                    } else {
                        reject(res.msg ? res.msg : "error");
                    }
                });
            });
        },
        /**
         * getIndexData 获取主页数据
         */
        getIndexData() {
            Promise.all([
                this.getBannerData(),
                this.getNewsongData(),
                this.getPersonalizedData(),
                this.getDJprogramData()
            ])
                .then(
                    ([
                        banner,
                        newSong,
                        recommendResource,
                        personalizedDJprogram
                    ]) => {
                        console.log(banner);
                        this.banner = banner;
                        this.personalizedNewsong = newSong;
                        this.recommendResource = recommendResource;
                        this.personalizedDJprogram = personalizedDJprogram;
                    }
                )
                .catch(error => {
                    this.showToast(error ? error : "error");
                });
        }
    },
    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo();
        // this.login();
    },
    mounted() {
        this.search();
        this.getIndexData();
    }
};
</script>
<style lang="scss" scoped>
.index {
    padding: 5px;
    .carouselDiv {
        padding: 5px;
        image {
            width: 100%;
            height: 100%;
            border-radius: 5px;
        }
    }
    .centerView {
        display: flex;
        justify-content: space-around;
        margin: 15px 0px;
        .innerView {
            display: flex;
            flex-direction: column;
            text-align: center;
            .micon {
                border: 1px solid red;
                border-radius: 50%;
                padding: 10px;
            }
            img {
                height: 40px;
                width: 40px;
                color: red;
            }
            .iconSpan {
                margin-top: 10px;
            }
            i {
                font-size: 18px;
            }
            span {
                font-size: 12px;
            }
        }
    }
    .personalized {
        margin-bottom: 15px;
        .perSpan {
            font-size: 14px;
            font-weight: bold;
        }
        .gdView {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            flex-wrap: wrap;
            margin: 5px 0;
            .gdInnerView {
                display: flex;
                flex-direction: column;
                width: 100px;
                i {
                    color: red;
                    border: solid 1px;
                    border-radius: 40px;
                    padding: 10px;
                }
                .personalized {
                    margin-bottom: 15px;
                }
                .playCountMain {
                    position: relative;
                    .playCount {
                        position: absolute;
                        right: 3px;
                        top: 2px;
                        color: white;
                        font-size: 12px;
                        display: flex;
                        align-items: center;
                        i {
                            font-size: 14px;
                        }
                    }
                }
                .innerImg {
                    width: 100px;
                    height: 100px;
                    border-radius: 5px;
                }
                .innerText {
                    text-align: center;
                    font-size: 10px;
                    margin-bottom: 10px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                }
            }
        }
    }
}
</style>