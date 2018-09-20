//index.js

//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '欢迎加入抛瓜!',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
   
      if (app.globalData.userInfo) {
        
        this.setData({
          userInfo: app.globalData.userInfo,
          hasUserInfo: true
        })
        
      } else if (this.data.canIUse) {
        // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
        // 所以此处加入 callback 以防止这种情况
        app.userInfoReadyCallback = res => {
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      } else {
        // 在没有 open-type=getUserInfo 版本的兼容处理
        wx.getUserInfo({
          success: res => {
            app.globalData.userInfo = res.userInfo
            this.setData({
              userInfo: res.userInfo,
              hasUserInfo: true
            })
          }
        })
      }


  },
  onReady : function(){
    var that = this
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              app.globalData.userInfo = res.userInfo
              //头像和昵称
              var avatar = res.userInfo.avatarUrl
              var nickName = res.userInfo.nickName

              // 登录
              wx.login({
                success: function (res) {
                  if (res.code) {
                    wx.showLoading({
                      title: '登陆中',
                      success: function () {
                        // 发送 res.code 到后台换取 openId, sessionKey, unionId
                        wx.request({
                          url: "https://pg.npupaogua.cn/paogua/home/index/index",
                          method: "POST",
                          header: {
                            "content-type": "application/x-www-form-urlencoded"
                          },
                          data: {
                            code: res.code,
                            avatar: avatar,
                            nickname: nickName
                          },
                          success: function (res) {
                            if (res.data == '400') {
                              app.globalData.login = "400"
                            } else if (res.data == '502') {
                              app.globalData.login = '502'
                            }
                            else {
                              app.globalData.cookie = res.header['Set-Cookie']
                              var cookie = res.header['Set-Cookie']
                              app.globalData.login = "200"
                              console.log(res.header)
                              wx.setStorage({
                                key: 'cookie',
                                data: res.data,
                                success: function () {
                                  wx.getStorage({
                                    key: 'cookie',
                                    success: function (res) {
                                      console.log(cookie)
                                      wx.request({
                                        url: 'https://pg.npupaogua.cn/paogua/Home/Index/isNPU',
                                        method: "POST",
                                        header: {
                                          "Content-Type": "application/x-www-form-urlencoded",
                                          "Cookie": cookie
                                        },
                                        data: {
                                          Mstring: res.data
                                        },
                                        success: function (res) {
                                          console.log(res.data)
                                          if (res.data == '201') {
                                            app.globalData.isNPU = '201'
                                          } else if (res.data == '502') {
                                            app.globalData.isNPU = '502'
                                          } else if (res.data == '401') {
                                            app.globalData.isNPU = '401'
                                          }
                                          //
                                          var code = app.globalData.login
                                          if (code == '200') {
                                            wx.hideLoading()
                                            wx.redirectTo({
                                              url: '../home/home',
                                            })
                                          } else if (code == '400') {
                                            wx.showToast({
                                              title: '请求失败',
                                              icon: "none"
                                            })
                                          } else if (code = "502") {
                                            wx.showToast({
                                              title: '授权失败',
                                              icon: "none"
                                            })
                                          }
                                        },
                                        fail: function () {
                                          wx.hideLoading()
                                          wx.showToast({
                                            title: '网络开小差了~',
                                            icon: 'loading'
                                          })

                                        }
                                      })
                                    },
                                  })

                                }
                              })
                            }

                          },
                          fail: function () {
                            wx.hideLoading()
                            wx.showToast({
                              title: '网络开小差了~',
                              icon: 'loading'
                            })
                          }
                        })

                      }
                    })

                  }

                }
              })
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
 toHome : function(){
   console.log(app.globalData.login)
 },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
