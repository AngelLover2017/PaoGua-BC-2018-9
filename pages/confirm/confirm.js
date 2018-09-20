// pages/confirm/confirm.js
var app=getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    npuId: '',
    npuPassword: '',
    btncolor: "",
    idhas : false,
    pwhas : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      btncolor: "#AEAEAE"
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  inputId:function(e){
    if(!this.data.pwhas){
      if (e.detail.value != "") {
        this.setData({
          btncolor: "#F36778",
          idhas : true
        })
      } else {
        this.setData({
          btncolor: "#AEAEAE",
          idhas : false
        })
      }
    }

  },
  inputPw:function(e){
    if(!this.data.idhas){
      if (e.detail.value != "") {
        this.setData({
          btncolor: "#F36778",
          pwhas :true
        })
      } else {
        this.setData({
          btncolor: "#AEAEAE",
          pwhas : false
        })
      }
    }
  },
  formSubmit: function (e) {
    var warn = "";
    var reg = /^[0-9]+$/;
    if (this.data.btncolor == "#F36778"){
      if (e.detail.value.npuId.length < 10 || !reg.test(e.detail.value.npuId)) {
        warn = "账号密码错误"
      }
      if (warn == "") {
        wx.getStorage({
          key: 'cookie',
          success: function(res) {
            console.log(res.data)
            console.log(app.globalData.cookie)
            wx.showLoading({
              title: '连接认证中',
              success : function(){
                wx.request({
                  url: 'https://pg.npupaogua.cn/paogua/Home/Self/confirm',
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                    "Cookie": app.globalData.cookie
                  },
                  data: {
                    npuId: e.detail.value.npuId,
                    npuPassword: e.detail.value.npuPassword,
                    Mstring: res.data
                  },
                  success: function (res) {
                    wx.hideLoading()
                    console.log(res)
                    if (res.data == "200") {
                      wx.showToast({
                        title: '绑定成功',
                        duration: 3000,
                        mask: true,
                        success: function () {
                          getApp().globalData.isNPU = "200"
                          wx.navigateBack({
                            delta: 1
                          })
                        }
                      })

                      // wx.navigateTo({
                      //   url: '../index/index',
                      // });
                    }
                    else if (res.data == "502") {
                      wx.showToast({
                        icon: 'none',
                        title: '绑定失败',
                      })
                    } else if (res.data == '401') {
                      wx.showToast({
                        icon: 'none',
                        title: '请求失败',
                      })
                    } else {
                      wx.showToast({
                        icon: "none",
                        title: "未知错误"
                      })
                    }
                    // wx.navigateBack({
                    //   delta: 1
                    // })
                  },
                  fail: function () {
                    wx.showToast({
                      icon: 'none',
                      title: '网络较差请稍后再试',
                    })
                  }

                })
              }
            })

          },
        })

      } else {
        wx.showToast({
          icon: 'none',
          title: warn,
        })
      }
    }
    
  }
})