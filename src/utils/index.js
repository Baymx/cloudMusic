/**
 * formatNumber 时间格式化补零
 * @param n 
 * @returns {String}}
 */
function formatNumber(n) {
  const str = n.toString();
  return str[1] ? str : `0${str}`;
}
/**
 * formatTime 时间的格式化 例如 2018/12/11 12:22:22
 * @param date
 * @returns {String}
 */
export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  const t1 = [year, month, day].map(formatNumber).join("/");
  const t2 = [hour, minute, second].map(formatNumber).join(":");

  return `${t1} ${t2}`;
}
/**
 * setStorage 全局的设置stotage
 * @param data
 * @returns {Promise<*>}
 */
export function setStorage(data) {
  return new Promise((resolve, reject) => {
    wx.setStorage({
      key: data.key,
      data: data.value,
      success: res => {
        console.log(res)
        if( res && res.errMsg && res.errMsg == "setStorage:ok"){
          resolve(true);
        }else{
          resolve(false);
        }
      },
      fail: error => {
        reject(false);
      }
    });
  });
}
/**
 * getStorage 全局的获取stotage
 * @param data
 * @returns {Promise<*>}
 */
export function getStorage(data) {
  return new Promise((resolve, reject) => {
    wx.getStorage({
      key: data.key,
      success: res => {
        console.log(res)
        if( res && res.data && res.errMsg && res.errMsg == "getStorage:ok"){
          resolve(res.data);
        }
      },
      fail: error => {
        reject(error);
      }
    });
  });
}

export default {
  formatNumber,
  formatTime,
  setStorage,
  getStorage
};
