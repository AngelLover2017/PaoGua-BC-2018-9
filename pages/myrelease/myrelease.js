var app=getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    block : [
      {
        imgPath: "http://172.99.255.204/paogua/public/images/tower.jpg",
        title: "我是标题，支持两行显示",
        category: "生活用品-运动用品",
        price: "￥99999",
        tip: "擦亮一下，可以被更多人看到"
      },
      {
        imgPath: "http://172.99.255.204/paogua/public/images/tower.jpg",  
        title: "我是标题，支持两行显示",
        category: "生活用品-运动用品",
        price: "￥99999",
        tip: "擦亮一下，可以被更多人看到"
      }
    ],
    currentBlock : -1,
   reason : [
     {
       name: "r_sold",
       value: "卖掉了",
       isChecked : false
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
  //block
  toDetail: function (e) {
    var index = e.currentTarget.dataset.index
    wx.navigateTo({
      url: '../detail/detail?goods_id='+this.data.block[index].goods_id,
    })
  },
  deleteRelease:function(e){
    this.data.currentBlock = e.target.dataset.id
    this.popup.showPopup()
  },
  cancel : function(){
    this.popup.hidePopup()
    this.data.currentBlock = -1
  },
  success : function(){
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
                    goods_id: that.data.block[that.data.currentBlock].goods_id,
                    reason: that.popup.data.checkedValue,
                  },
                  success: function (res) {
                    console.log(res.data)
                    if (res.data == "200") {
                      that.popup.hidePopup()
                      that.data.block.splice(that.data.currentBlock, 1)
                      wx.hideLoading()
                      that.setData({
                        block: that.data.block
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
  freshRelease:function(e){
    var that=this
    var index = e.currentTarget.dataset.id
    wx.showLoading({
      title: '擦亮中',
      success : function(){
        wx.getStorage({
          key: 'cookie',
          success: function (res) {
            if (res.data) {
              wx.request({
                url: 'https://pg.npupaogua.cn/paogua/Home/Self/republish',
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                  "cookie": app.globalData.cookie,
                },
                data: {
                  Mstring: res.data,
                  goods_id: that.data.block[index].goods_id,
                },
                success: function (res) {
                  console.log(res.data)
                  if (res.data == '200') {
                    wx.hideLoading()
                    that.data.block[index].tip = "我超新！不需要再擦亮啦！"
                    that.data.block.unshift(that.data.block[index])
                    that.data.block.splice(index+1,1)
                    wx.showToast({
                      title: '擦亮成功',
                    })
                    that.setData({
                      block: that.data.block
                    })
                    
                  }
                }
              })
            }
          },
        })
      }
    })

  },
  /*
  editRelease:function(e){
    var that = this
    var index = e.currentTarget.dataset.id
    wx.navigateTo({
      url: '../edit/edit?goods_id='+that.data.block[index].goods_id,
    })
  }, */
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
          url: 'https://pg.npupaogua.cn/paogua/Home/Self/getMyRelease',
          method: "POST",
          header: {
            "content-type": "application/x-www-form-urlencoded",
            "cookie": app.globalData.cookie
          },
          data: {
            Mstring: res.data,
          },
          success: function (res) {
            if (res.data) {
             that.data.block = res.data
              
              for(var i = 0;i<res.data.length;i++){
               var a = that.data.block[i].category.split("-")
               that.data.block[i].category = util.parseCate(a[0],a[1],1)
               var subtime = new Date(res.data[i].subTime)
               var curTime = new Date()
               curTime.setTime(curTime.getTime())
               var dateL = curTime.getDate() - subtime.getDate()
               var hourL = curTime.getHours() - subtime.getHours()
               if(hourL >= 23){
                 dateL+=1
               }
               var tip = ""
               if(dateL >= 0 && dateL<=1){
                 tip = "我超新！不需要再擦亮啦！"
               }else if(dateL>1 && dateL<=7){
                 tip = "擦亮一下，可以被更多人看到！"
               }else if(dateL>7 && dateL<=30){
                 tip = "积灰太多其他人看不见啦，快擦亮！"
               }else if(dateL>30 && dateL<=50){
                 tip = "主人太久没擦亮我！我快消失啦！"
               }else{
                 tip = "其他人已经看不见我啦，快擦亮！"
               }
               that.data.block[i].tip = tip
             }
        
             that.setData({
               block : that.data.block
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
    this.popup = this.selectComponent("#popup")
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