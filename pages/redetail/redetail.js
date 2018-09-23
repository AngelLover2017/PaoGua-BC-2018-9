var app=getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
    
    },
    reason: [
      {
        name: "r_sold",
        value: "卖掉了",
        isChecked: false
      },
      {
        name: "r_not_sell",
        value: "卖不出去",
        isChecked: false
      },
      {
        name: "r_not_want_sell",
        value: "不想卖了",
        isChecked: false
      },
    ],
  },

  //复制到剪切板
  copyPhone:function(){
    wx.setClipboardData({
      data: this.data.detail.phoneNum,
      success:function(){
        wx.showToast({
          title: '已经复制到剪切板',
          icon:'none'
        })
      }
    })
  },
  copyWx:function(){
    wx.setClipboardData({
      data: this.data.detail.wxId,
      success: function () {
        wx.showToast({
          title: '已经复制到剪切板',
          icon: 'none'
        })
      }
    })
  },
  copyQQ:function(){
    wx.setClipboardData({
      data: this.data.detail.qqNum,
      success: function () {
        wx.showToast({
          title: '已经复制到剪切板',
          icon: 'none'
        })
      }
    })
  },
  //option
  deleteRelease: function (e) {
    this.popup.showPopup()
  },
  cancel: function () {
    this.popup.hidePopup()
  },
  success: function () {
    var that = this
    if (this.popup.data.checkedValue != "") {
      wx.showLoading({
        title: '删除中',
        success: function () {
          wx.getStorage({
            key: 'cookie',
            success: function (res) {
              if (res.data) {
                wx.request({
                  url: 'https://pg.npupaogua.cn/paogua/Home/Self/removeMyRelease',
                  method: "POST",
                  header: {
                    "content-type": "application/x-www-form-urlencoded",
                    "cookie": app.globalData.cookie,
                  },
                  data: {
                    Mstring: res.data,
                    goods_id: that.data.detail.goods_id,
                    reason: that.popup.data.checkedValue,
                  },
                  success: function (res) {
                    console.log(res.data)
                    if (res.data == "200") {
                      that.popup.hidePopup()
                      wx.hideLoading()
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  }
                })
              }
            },
          })
        }
      })
    }
  },
  editRelease: function (e) {
    wx.navigateTo({
      url: '../edit/edit?goods_id=' + this.data.detail.goods_id,
    })
  }, 

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.detail.goods_id = options.goods_id
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup")
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
    var that = this
    console.log(that.data.detail.goods_id)
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        wx.request({
          url: 'https://pg.npupaogua.cn/paogua/Home/Shelf/toDetail',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": app.globalData.cookie
          },
          data: {
            Mstring: res.data,
            goods_id: that.data.detail.goods_id
          },
          success: function (res) {
            console.log(res.data)
            if (res.data) {
              res.data.goods_id = that.data.detail.goods_id
              that.data.detail = res.data
              that.data.detail.school = util.parseSch(that.data.detail.school)
              //绑定翱翔才可以看到联系方式
              var isNpu = app.globalData.isNPU
              console.log(isNpu)
              if (isNpu != '200') {
                that.data.detail.phoneNum = "绑定翱翔账号后方可查看"
                that.data.detail.wxId = "绑定翱翔账号后方可查看"
                that.data.detail.qqNum = "绑定翱翔账号后方可查看"

              } else {
                that.data.detail.phoneNum = res.data.phoneNum == '' ? '无' : res.data.phoneNum
                that.data.detail.wxId = res.data.wxId == '' ? '无' : res.data.wxId
                that.data.detail.qqNum = res.data.qqNum == '' ? '无' : res.data.qqNum

              }
            
              that.setData({
                detail: that.data.detail,
              })
            }

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