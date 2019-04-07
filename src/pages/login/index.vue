<template>
    <div class="login">
        <Button open-type="getUserInfo" @getuserinfo="getUserInfo"> 123</Button>
        <Button open-type="getPhoneNumber" @getphonenumber="getPhoneNumber"> 123</Button>
        <button open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfo">获取用户信息</button>
    </div>
</template>

<script>
// Use Vuex
export default {
    computed: {},
    methods: {
        getuserinfo(e) {
            console.log(e);
            console.log(e.mp.detail);
        },
        getUserInfo() {
            wx.getUserInfo({
                // 获取成功，全局存储用户信息，开发者服务器登录
                success(res) {
                    // 全局存储用户信息
                    console.log(res);
                    // store.commit("storeUpdateWxUser", res.userInfo);
                    // postLogin(code, res.iv, res.encryptedData, callback);
                },
                // 获取失败，弹窗提示一键登录
                fail(err) {
                    wx.hideLoading();
                    console.log(err);
                    // 获取用户信息失败，清楚全局存储的登录状态，弹窗提示一键登录
                    // 使用token管理登录态的，清楚存储全局的token
                    // 使用cookie管理登录态的，可以清楚全局登录状态管理的变量
                    // store.commit("storeUpdateToken", "");
                    // 获取不到用户信息，说明用户没有授权或者取消授权。弹窗提示一键登录，后续会讲
                    // showLoginModal();
                }
            });
        },
        getPhoneNumber(e) {
            console.log(e);
        }
    }
};
</script>

<style lang="scss" scoped>
</style>
