// 配置
var  host = '' // 生产
const appid = 'wxc71abefa69bce58f';
const appKey = 'dec885549f7421598b1be7e7c51a930f';
console.log("环境地址")
console.log(process.env.NODE_ENV)
switch (process.env.NODE_ENV) {
  case 'production': //生产环境
        host = ''
        break;
  case 'pre': //预发部环境
        break;
  case 'development': //开发环境
  host = 'http://localhost:4000'
        break;
  default : //默认本地环境
        host = 'http://localhost:4000'
        break;
}

const config = {
    host,
    appid,
    appKey,
}
export default config;