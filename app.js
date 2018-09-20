//app.js
App({
  onLaunch: function () {
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              that.globalData.userInfo = res.userInfo
              //头像和昵称
              var avatar = that.globalData.userInfo.avatarUrl
              var nickName = that.globalData.userInfo.nickName

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (that.userInfoReadyCallback) {
                that.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
 

  },
  globalData: {
    userInfo: null,
    login : "000",
    isNPU : "000",
    cookie : "" ,
  }
})