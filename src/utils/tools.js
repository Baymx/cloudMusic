/**
 * utils tools.js
 */


/**
 * app类型
 */
// export const getPlatform = () => {
//     var result = {
//         TYPE: '',
//         APP: ''
//     };
//     if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
//         result.TYPE = 'ios';
//     } else if (/(Android)/i.test(navigator.userAgent)) {
//         result.TYPE = 'android';
//     } else {
//         result.TYPE = 'pc';
//     }
//     if (window.navigator.userAgent.toLowerCase().indexOf('micromessenger') > -1) {
//         result.APP = 'weixin';
//     } else if (window.navigator.userAgent.toLowerCase().indexOf('weibo') > -1) {
//         result.APP = 'weibo';
//     } else if (window.navigator.userAgent.toLowerCase().indexOf('pingchangjinfu') > -1){
//         result.APP = 'pingchangjinfu';
//     } else {
//         result.APP = 'default';
//     }
//     return result;
// }

/**
 * Cookie 操作
 * @type {name: 名称，value: 值, days: 过期时间}
 */
export const Cookie = {
    set: function (name, value, days = 30*24*60*60*1000) {
        var d = new Date;
        d.setTime(d.getTime() + days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get: function (name) {
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');
        return v ? v[2] : null;
    },
    delete: function (name) {
        this.set(name, '', -99999999);
    },
    deleteAll: function() {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g)
        if(keys) {
            for(var i = keys.length; i--;){
                document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
            }
        }
    }
}

/**
 * 调用原生方法
 * @param  {[function]} 原生回调函数
 * @param  {[function]} 默认回调函数
 * @param  {[function]} 微信回调函数
 */
export const jsBridge = (ncallback, callback, wxcallback) => {
    if (getPlatform().APP == 'pingchangjinfu') {
        ncallback ? ncallback() : '';
    } else if (getPlatform().APP == 'weixin') {
        wxcallback ? wxcallback() : '';
    } else {
        callback ? callback() : '';
    }
}
/**
 * 特殊字符校验
 */
export const CheckSpecailStr = function(data) {
    // var str = "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]";
     var str = "[`~!@#$^&*()=|{}':;',\\[\\]<>/?~";
    for (let i = 0; i < str.length; i++) {
        if (String(data).indexOf(str[i]) != '-1') {
            return '不能包含特殊字符' + str[i];
        }
    }
    if (/^[\s ]|[ ]$/.test(data)) {
        return '前后不能有空格';
    }

    return false;
}
