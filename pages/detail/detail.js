var app=getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail : {
      goods_id: "",
      avatarUrl: "http://172.99.255.204/paogua/public/images/bp.png",
      nickName: "吕炳旭",
      subTime: "2018-08-30",
      price: "￥9999",
      title: "我是标题，支持多行显示",
      school: "长安校区",
      description: "详细内容详细内同看世界的方式上看到了附近是啊深刻搭街坊库萨克的美女发ask的房价快速的按时地方金卡丁",
      imageUrl: [
        "http://172.99.255.204/paogua/public/images/tower.jpg",
        "http://172.99.255.204/paogua/public/images/tower.jpg"
      ],
      phoneNum: "18220815305",
      wxId: "ads19981015",
      qqNum: "2461677579",
    },
    icon : "icon-star1",
    ifCollect : 0,
  },

  //collect
  collect:function(){
    var icon = this.data.icon
    var that=this
    if (icon == 'icon-star1') {
      that.data.ifCollect = 0
    }else if(icon == 'icon-star3'){
      that.data.ifCollect = 1
    }
      wx.getStorage({
        key: 'cookie',
        success: function(res) {
          if(res.data){
            wx.request({
              url: 'https://pg.npupaogua.cn//paogua/home/shelf/collect',
              method : "POST",
              header : {
                "content-type": "application/x-www-form-urlencoded",
                "cookie": app.globalData.cookie
              },
              data :{
                Mstring : res.data,
                ifCollect : that.data.ifCollect,
                goods_id : that.data.detail.goods_id
              },
              success : function(res){
                console.log(res.data)
                if(res.data == '200'){
                  that.setData({
                    icon : that.data.ifCollect ? 'icon-star1':'icon-star3',
                    ifCollect : that.data.ifCollect ? 0:1
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
    var that = this
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        console.log(res.data)
        wx.request({
          url: 'https://pg.npupaogua.cn/paogua/Home/Shelf/toDetail',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": app.globalData.cookie
          },
          data: {
            Mstring: res.data,
            goods_id: options.goods_id
          },
          success: function (res) {
            console.log(res.data)
            if(res.data){
              that.data.detail = res.data
              that.data.detail.goods_id = options.goods_id
              that.data.detail.school = util.parseSch(that.data.detail.school)
              that.data.ifCollect = res.data.ifCollect
              that.setData({
                detail : that.data.detail,
                ifCollect : that.data.ifCollect,
                icon : that.data.ifCollect ? 'icon-star3':'icon-star1'
              })
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