export function getSetting(anth,onSuccess,onFail){
    mpvue.getSetting({
      success (res) {
        console.log(res)
        if( res.authSetting[`scope.${anth}`]){
          onSuccess(res)
        }else{
          onFail(res)
        }
      },
      fail(err){
        console.log(err)
      }

    })
  }