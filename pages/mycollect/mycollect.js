var app = getApp()
var util = require("../../utils/util.js")
Page({


  /**
   * 页面的初始数据
   */
  data: {
    currentIndex : -1,
    block : [
      {
        goods_id: "",
        avatarUrl: "http://172.99.255.204/paogua/public/images/bp.png",
        nickName: "吕炳旭",
        subTime: "2018-08-30",
        price: "￥9999",
        title: "我是标题，支持多行显示",
        imageUrl: [
          "http://172.99.255.204/paogua/public/images/bp.png",
          "http://172.99.255.204/paogua/public/images/bp.png",
          "http://172.99.255.204/paogua/public/images/bp.png",
        ],
        school: "长安校区",
      }

    ],
    reason: [
      {
        name: "c_not_like",
        value: "不喜欢/不需要了",
        isChecked: false
      },
      {
        name: "c_not_contact",
        value: "联系不上卖家",
        isChecked: false
      },
      {
        name: "c_bought",
        value: "买到了",
        isChecked: false
      },
      {
        name: "c_other",
        value: "其他",
        isChecked: false
      },
    ],

  },
  //block
  toDetail: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + this.data.block[index].goods_id,
    })
  },
  removeCollect : function(e){
    console.log(e)
    this.data.currentIndex = e.currentTarget.dataset.index
    this.popup.showPopup()

  },
  cancel : function(){
    this.popup.hidePopup()
    this.data.currentIndex = -1
  },
  success: function(){
    var that = this
    
    if (this.popup.data.checkedValue != ""){
      wx.showLoading({
        title: '加载中',
        success : function(){
          wx.getStorage({
            key: 'cookie',
            success: function (res) {
              wx.request({
                url: 'https://pg.npupaogua.cn/paogua/Home/self/removeCollect',
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                  "cookie": app.globalData.cookie
                },
                data: {
                  Mstring: res.data,
                  goods_id: that.data.block[that.data.currentIndex].goods_id,
                  reason: that.popup.data.checkedValue
                },
                success: function (res) {
                  if (res.data = '200') {
                    that.popup.hidePopup()
                    wx.hideLoading()
                    that.data.block.splice(that.data.currentIndex, 1)
                    that.setData({
                      block: that.data.block
                    })
                  } else {
                    that.popup.hidePopup()
                    wx.hideLoading()
                    wx.showToast({
                      title: '删除失败',
                      icon: 'none'
                    })
                  }
                }
              })
            },
          })
        }
      })

    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        wx.request({
          url: 'https://pg.npupaogua.cn/paogua/Home/self/getMyCollect',
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
            if(Array.isArray(res.data)){
              for(var i=0;i<res.data.length;i++){
                res.data[i].school = util.parseSch(res.data[i].school)
              }
              that.setData({
                block: res.data
              })
            }else if(res.data == false){

            }else if(res.data == '400'){

            }else if(res.data == '502'){

            }
          }
        })
      },
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.popup = this.selectComponent("#popup");

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
    
  }
})