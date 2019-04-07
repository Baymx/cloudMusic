<template>
    <div class="index">
        <div class="header">
            <button @click="search">一键查询</button>
        </div>
    </div>
</template>

<script>
import { mapActions } from "vuex";
import { setStorage, getStorage } from "@/utils/index";
import store from "@/store/index";
export default {
    data() {
        return {
            motto: "Hello World",
            userInfo: {}
        };
    },
    methods: {
        ...mapActions(["showLoading", "showToast", "apiGetDemo"]),
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
                    console.log(res)
                    console.log("checkSession success");
                },
                fail(err) {
                    // session_key 已经失效，需要重新执行登录流程
                    console.log(err.errMsg)
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
    },

    created() {
        // 调用应用实例的方法获取全局数据
        // this.getUserInfo();
        // this.login();
    },
    mounted() {
        // this.getUserInfo()
    }
};
</script>
<style lang="scss" scoped>
.index {
    .header {
        height: 40px;
    }
}
</style>