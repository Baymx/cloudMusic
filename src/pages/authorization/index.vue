<template>
  <div class="login">
    <h3>温馨提示:</h3>
    <span>为了更好的为您提供服务,初次使用请进行微信授权</span>
    <button open-type="getUserInfo" @getuserinfo="getuserinfo">同意授权</button>
    <Button open-type="share"> 123</Button>
    <Button open-type="contact"> 123</Button>
  </div>
</template>

<script>
// Use Vuex
export default {
    computed: {},
    methods: {
        getuserinfo(e) {
          console.log(e)
          console.log(e.mp.detail);
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
    text-align: center;
    h3 {
        margin: 20px 0px;
        text-align: center;
    }
    span {
        font-size: 16px;
        color: #666666;
    }
}
</style>
