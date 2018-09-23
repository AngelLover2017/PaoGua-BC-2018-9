var app=getApp()
var util = require("../../utils/util.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //animation
    animationImg : {},
    animationCate : {},
    animationFreshT:{},
    animationFresh:{},
    lastY : 0,
    lastScrollY : 0,
    isUP : -1,
    //
    homeImg: "https://pg.npupaogua.cn/paogua/public/images/feiji.png",
    iconPath : [
      {
        title : "生活用品",
        code: "shenghuoyongpin",
        path: "https://pg.npupaogua.cn/paogua/public/images/SHYP.png"
      },
      {
        title: "书籍学习",
        code : "shujixuexi",
        path: "https://pg.npupaogua.cn/paogua/public/images/JCXX.png"
      },
      {
        title : "数码产品",
        code : "shumachanpin",
        path: "https://pg.npupaogua.cn/paogua/public/images/SMCP.png"
      },
      {
        title: "服装鞋包",
        code : "fuzhuangxiebao",
        path: "https://pg.npupaogua.cn/paogua/public/images/FZXB.png"
      },
      {
        title: "好吃的",
        code : "haochide",
        path: "https://pg.npupaogua.cn/paogua/public/images/HCD.png"
      },
      {
        title: "美妆美护",
        code : "meizhuangmeihu",
        path: "https://pg.npupaogua.cn/paogua/public/images/MZMH.png"
      },
      {
        title: "小服务",
        code : "xiaofuwu",
        path: "https://pg.npupaogua.cn/paogua/public/images/XFW.png"
      },
      {
        title: "求购",
        code : "qiugou",
        path: "https://pg.npupaogua.cn/paogua/public/images/QG.png"
      },
    ],
    // mycollect
    freshItems : [

    ],
    // tabBar
    curTab : 0
  },
  //animation
  handlStart:function(event){
    console.log(event)
    this.data.lastY = event.touches[0].pageY
  },
  handlMove1:function(event){
    var length = this.data.lastY - event.touches[0].pageY
    if(length > 5){
        this.data.isUP = 1
    }else if(length <-10){
        this.data.isUP = 0
    }
    if (this.data.isUP) {
      //animation
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation3 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(0).height("0rpx").step()
      animation1.top("-15rpx").step()
      animation2.top("80rpx").step()
      animation3.top("480rpx").step()
      this.setData({
        animationImg: animation.export(),
        animationCate: animation1.export(),
        animationFreshT: animation2.export(),
        animationFresh: animation3.export()
      })
    } else {
      //animation
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation3 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(1).height("360rpx").step()
      animation3.top("760rpx").step()
      animation2.top("0rpx").step()
      animation1.top("-120rpx").step()
      this.setData({
        animationImg: animation.export(),
        animationCate: animation1.export(),
        animationFreshT: animation2.export(),
        animationFresh: animation3.export()
      })
    }
  },
  // handlMove2:function(event){
  //   var length = this.data.lastY - event.touches[0].pageY
  //   console.log(event)
  //   if (length > 0) {
  //     this.data.isUP = 1
  //   }
  // },
  handlUpper:function(e){
    //animation
    var animation = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    })
    var animation1 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    })
    var animation2 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    })
    var animation3 = wx.createAnimation({
      duration: 500,
      timingFunction: "ease"
    })
    animation.opacity(1).height("360rpx").step()
    animation3.top("760rpx").step()
    animation2.top("0rpx").step()
    animation1.top("-120rpx").step()
    this.setData({
      animationImg: animation.export(),
      animationCate: animation1.export(),
      animationFreshT: animation2.export(),
      animationFresh: animation3.export()
    })
  },
  handlLower:function(e){
    var length = this.data.freshItems.length
    if (length % 10 == 0) {
      var limit = parseInt(length / 10 + 1)
      var that = this
      wx.showLoading({
        title: '加载中',
        success: function () {
          wx.getStorage({
            key: 'cookie',
            success: function (res) {
              wx.request({
                url: 'https://pg.npupaogua.cn/paogua/Home/Shelf/getFreshItems',
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                  "cookie": app.globalData.cookie
                },
                data: {
                  Mstring: res.data,
                  limit: limit
                },
                success: function (res) {
                  console.log(res.data)
                  if (Array.isArray(res.data)) {
                    wx.hideLoading()
                    for (var i = 0; i < res.data.length; i++) {
                      that.data.freshItems.push(res.data[i])
                    }
                    that.setData({
                      freshItems: that.data.freshItems
                    })
                  }
                },
                fail : function(){
                  wx.showToast({
                    title: '网络开小差了~',
                    icon : 'none'
                  })
                }
              })
            },
          })
        }
      })
    }else{
      wx.showToast({
        title: '已经到底了~',
        icon : 'none'
      })
    }



  },
  handlScroll:function(e){
    if(e.detail.scrollTop-this.data.lastScrollY > 1){
      //animation
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation3 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(0).height("0rpx").step()
      animation1.top("-15rpx").step()
      animation2.top("80rpx").step()
      animation3.top("480rpx").step()
      this.setData({
        animationImg: animation.export(),
        animationCate: animation1.export(),
        animationFreshT: animation2.export(),
        animationFresh: animation3.export()
      })
    }
    this.data.lastScrollY = e.detail.scrollTop
  },
  handlEnd:function(event){
    console.log(event)
    var isUP = this.data.isUP
    if(isUP){
      //animation
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation3 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(0).height("0rpx").step()
      animation1.top("-15rpx").step()
      animation2.top("80rpx").step()
      animation3.top("480rpx").step()
      this.setData({
        animationImg: animation.export(),
        animationCate: animation1.export(),
        animationFreshT: animation2.export(),
        animationFresh: animation3.export()
      })
    }else{
      //animation
      var animation = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation1 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation2 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      var animation3 = wx.createAnimation({
        duration: 500,
        timingFunction: "ease"
      })
      animation.opacity(1).height("360rpx").step()
      animation3.top("760rpx").step()
      animation2.top("0rpx").step()
      animation1.top("-120rpx").step()
      this.setData({
        animationImg: animation.export(),
        animationCate: animation1.export(),
        animationFreshT: animation2.export(),
        animationFresh: animation3.export()
      })
    }
  },
  //tabBar
  switchShelf: function () {
    wx.redirectTo({
      url: '../home/home',
    })
  },
  switchRelease: function () {
    wx.navigateTo({
      url: '../release/release',
    })
  },
  switchSelf: function () {
    wx.redirectTo({
      url: '../self/self',
    })
  },
  //Category
  toFeed : function(e){
    console.log(e)
    var index = e.target.dataset.id
    console.log(index)
    var cate = this.data.iconPath[index].title+" "+this.data.iconPath[index].code
    wx.navigateTo({
      url: '../feed/feed?cate='+cate,
    })
  },
  //block
  toDetail: function (e){
    console.log(this.data.freshItems)
    console.log(e)
    var goods_id = this.data.freshItems[e.currentTarget.dataset.index].goods_id
    console.log(goods_id)
    wx.navigateTo({
      url: '../detail/detail?goods_id='+goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    var that = this
    wx.getStorage({
      key: 'cookie',
      success: function (res) {
        wx.request({
          url: 'https://pg.npupaogua.cn/paogua/Home/Shelf/getFreshItems',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": app.globalData.cookie
          },
          data: {
            Mstring: res.data,
            limit: 1
          },
          success: function (res) {
            console.log(res.data)
            if (Array.isArray(res.data)) {
              for (var i = 0; i < res.data.length; i++) {
                res.data[i].category = util.parseCate(res.data[i].category, "", 0)
                res.data[i].school = util.parseSch(res.data[i].school)
                that.data.freshItems.push(res.data[i])
              }
              that.setData({
                freshItems: that.data.freshItems
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
   
    // this.data.pullDown.imgTop = ""
    // this.data.pullDown.category = "top : -120rpx;"
    // this.data.pullDown.fresh = "margin-top : 760rpx;"
    // this.data.pullDown.freshTitle = "margin-top : -80rpx;"
    // this.setData({
    //   pullDown: this.data.pullDown
    // })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
   
    // //
    // this.data.pullDown.imgTop = "display : none"
    // this.data.pullDown.category = "top : -15rpx;"
    // this.data.pullDown.fresh = "margin-top : 480rpx;"
    // this.data.pullDown.freshTitle = "margin-top : 0rpx;"
    // this.setData({
    //   pullDown : this.data.pullDown
    // })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})