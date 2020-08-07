import { handleError } from './index'

function createFly() {
    if (mpvuePlatform === 'wx') {
      const Fly = require('flyio/dist/npm/wx')
      return new Fly()
    } else {
      return null
    }
  }


  export function get(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.get(url, params).then(response => {
       
          if( response && response.data && response.data.error_code ===0){
           
            resolve(response)
          }else{
           
            const msg = (response && response.data && response.data.msg) || "请求失败"
            mpvue.showToast({
              title:msg,
              duration:3000
            })
            reject(response)
          }
          
        }).catch(err => {
       
          handleError(err)
          reject(err)
        })
      })
    }
  }
  export function post(url, params = {}) {
    const fly = createFly()
    if (fly) {
      return new Promise((resolve, reject) => {
        fly.post(url, params).then(response => {
          
          if( response && response.data && response.data.error_code ===0){
            // console.log(response)
            resolve(response)
          }else{
            console.log(response)
            const msg = (response && response.data && response.data.msg) || "请求失败"
            mpvue.showToast({
              title:msg,
              duration:3000
            })
            reject(response)
          }
        }).catch(err => {
          
          handleError(err)
          reject(err)
        })
      })
    }
  }