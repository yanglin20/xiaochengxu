import { getOpenId } from './index'
export function getSetting(anth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      console.log(res)
      if (res.authSetting[`scope.${anth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(err) {
      console.log(err)
    }

  })
}

export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(err) {
      console.log(err)
    }

  })
}
export function setStorageSync(key, value) {
  mpvue.setStorageSync(key, value)
}

export function getStorageSync(key) {
  return mpvue.getStorageSync(key)
}

export function getUserOpenId(callback) {
  mpvue.login({
    success(res) {
      if (res.code) {
        const { code } = res
        console.log("code = " + code)

        getOpenId(code).then(response => {


          const { data: { data: { openid } } } = response
          setStorageSync('openId', openid)
          callback && callback(openid)
        }).catch(err => {
          console.log(err) // 直接抛出异常
        })

      } else {
        console.log(res)
      }
    },
    fail(err) {
      console.log(err)
    }
  })
}

export function showLoading(title) {
  mpvue.showLoading({
    title: title,
    mask: true
  })
}
export function hideLoading(tite) {
  mpvue.hideLoading()
}

export function copyImage(filepath) {
  mpvue.downloadFile({

    url: filepath,

    success: function (res) {

      console.log(res);

      //图片保存到本地

      mpvue.saveImageToPhotosAlbum({

        filePath: res.tempFilePath,

        success: function (data) {

          console.log(data);

        },

        fail: function (err) {

          console.log(err);

          if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {

            console.log("用户一开始拒绝了，我们想再次发起授权")

            console.log('打开设置窗口')

            mpvue.openSetting({

              success(settingdata) {

                console.log(settingdata)

                if (settingdata.authSetting['scope.writePhotosAlbum']) {

                  console.log('获取权限成功，给出再次点击图片保存到相册的提示。')

                } else {

                  console.log('获取权限失败，给出不给权限就无法正常使用的提示')

                }

              }

            })

          }

        }

      })

    }

  })
}

export function copyText(e){

   
    mpvue.setClipboardData({
      data: e,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            wx.showToast({
              title: '复制成功'
            })
          }
        })
      }
    })
  
}