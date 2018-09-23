var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bind : 0,
    npuId : "",
    phoneNum : "",
    wxId : "",
    qqNum : ""
  },
  inputPhone : function(e){
    this.setData({
      phoneNum : e.detail.value
    })
  },
  inputWx: function(e){
    this.setData({
      wxId: e.detail.value
    })
  },
  inputQQ : function(e){
    this.setData({
      qqNum: e.detail.value
    })
  },
  toconfirm:function(){
    wx.navigateTo({
      url: '../confirm/confirm',
    })
  },
  unbind:function(){
    var that = this
    wx.showModal({
      title: '提示',
      content: '解绑翱翔后将不能发布闲置哦~',
      showCancel: true,
      success:function(res){
        if(res.confirm){
          wx.getStorage({
            key: 'cookie',
            success: function (res) {
              wx.request({
                url: 'https://pg.npupaogua.cn/paogua/Home/self/unbindNpu',
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                  "cookie": app.globalData.cookie
                },
                data: {
                  Mstring: res.data,
                  npuId: that.data.npuId
                },
                success: function (res) {
                  if (res.data) {
                    //删除成功
                    wx.showToast({
                      title: '解绑成功',
                    })
                    that.setData({
                      bind: 0
                    })
                    app.globalData.isNPU = "201"
                  }
                }
              })
            },
          })
        }

      }
    })

  },
  //formsubmit
  formsubmit : function(e){
    
    wx.getStorage({
      key: 'cookie',
      success: function(res) {
        if(res.data){
          wx.request({
            url: 'https://pg.npupaogua.cn/paogua/Home/self/saveContact',
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "cookie": app.globalData.cookie
            },
            data: {
              Mstring: res.data,
              phoneNum : e.detail.value.phoneNum,
              wxId : e.detail.value.wxId,
              qqNum : e.detail.value.qqNum
            },
            success: function(res){
              if(res.data == '200'){
                wx.showToast({
                  title: '保存成功',
                })
              }else{
                wx.showToast({
                  title: '保存失败',
                })
              }
            }
          })
        }
      },
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //请求后台接口，判断是否绑定翱翔

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        wx.request({
          url: 'https://pg.npupaogua.cn/paogua/Home/self/getContact',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": app.globalData.cookie
          },
          data: {
            Mstring: res.data,
          },
          success: function (res) {
            console.log(res.data)
            if (res.data.npuId) {
              that.data.bind = 1
              that.data.npuId = res.data.npuId
            } else {
              that.data.bind = 0
            }
            that.setData({
              bind: that.data.bind,
              npuId: that.data.npuId,
              phoneNum: res.data.phoneNum,
              wxId: res.data.wxId,
              qqNum: res.data.qqNum
            })
          }
        })
      },
    })
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
    
  }
})