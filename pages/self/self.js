// pages/self/self.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarTitle : "吕炳旭",
    avatarPath: "http://172.99.255.204/paogua/public/images/bp.png",
    subTimes: 0,
    //tabBar
    curTab : 1,
  },
  switchShelf:function(){
   wx.redirectTo({
     url: '../home/home',
   })
  },
  switchRelease:function(){
    wx.navigateTo({
      url: '../release/release',
    })
  },
  switchSelf:function(){
    wx.redirectTo({
      url: '../self/self',
    })
  },
  toMyRelease:function(){
    wx.navigateTo({
      url: '../myrelease/myrelease',
    })
  },
  toMyCollect:function(){
    wx.navigateTo({
      url: '../mycollect/mycollect',
    })
  },
  toPersonnel:function(){
    wx.navigateTo({
      url: '../personnel/personnel',
    })
  },
  toSuggestion:function(){
    wx.navigateTo({
      url: '../suggestion/suggestion',
    })
  },
  toContact:function(){
    wx.navigateTo({
      url: '../contact/contact',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    wx.getStorage({
      key: 'cookie',
      success: function(res) {
        if(res.data){
          wx.request({
            url: 'https://pg.npupaogua.cn/paogua/Home/Self/getSelf',
            method: "POST",
            header:{
              "content-type": "application/x-www-form-urlencoded",
              "cookie": app.globalData.cookie
            },
            data : {
              Mstring : res.data
            },
            success : function(res){
              console.log(res.data)
              that.setData({
                avatarTitle: res.data.nickName,
                avatarPath: res.data.avatarUrl,
                subTimes: res.data.subs,
              })
            }
          })
        }
      },
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
  
  }
})