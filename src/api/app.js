import { get, post } from '../http/api';

export const apiTest = (options, callback) => {
  return new Promise((resolve,reject)=>{
      get('http://v.juhe.cn/toutiao/index').then(function(res){
        resolve(res);
      }).catch(function(error){
        reject(error)
      })
    }
  );
}