var app= getApp()
var util = require("../../utils/util.js")
Page({

  /**
   * 页面的初始数据
   * navto : 是否去选择分类
   * 
   */
  data: {
    hasImage : false,
    goods_id : "",
    title : "",
    description : "",
    price: "",
    category : {
      name: "分个类卖得快",
      code : ""
    },
    school: {
      name: "线下交易地点",
      code : ""
    },
    imageUrl: [
        
      // {
      //   imageAddress: "http://172.99.255.204/paogua/public/images/tower.jpg"
      // }
    ],
    phoneNum : "",
    qqNum : "",
    wxId : "",
    btncolor: "#AEAEAE",
    canSub : false,
    navto : false,
    limit : [{
      beyondStyle: "#9494A2",
      current : 0,
      maxlength : 15
    },{
      beyondStyle: "#9494A2",
      current : 0,
      maxlength : 200
    }] ,
  },
  selectSch: function(){
    var that = this
    wx.showActionSheet({
      itemList: ['全部校区','友谊校区','长安校区'],
      success: function(res){
        var sch = ""
        switch(res.tapIndex){
          case 0 : sch="全部校区";break;
          case 1 : sch="友谊校区";break;
          case 2 : sch="长安校区";break;
          default : sch=that.data.school
        }
        that.setData({
          school : sch
        })
      }
    })
  },
  selectCate: function(){
    var that = this
    wx.navigateTo({
      url: '../classify/classify',
      success : function(){
        that.setData({
          navto : true
        })
      }
    })
  },
  inputTitle: function(e){
    var v = e.detail.value
    this.data.limit[0].current = v.length
    if(v != ""){
      this.setData({
        btncolor: "#F36778",
        canSub : true
      })
      if(v.length >= 15){
        this.data.limit[0].beyondStyle = "red"
      }else{
        this.data.limit[0].beyondStyle = "#9494A2"
      }
    }else{
      this.setData({
        btncolor: "#AEAEAE",
        canSub : false
      })
    }
    this.setData({
      limit: this.data.limit
    })
  },
  inputDescription : function(e){
    var v = e.detail.value
    this.data.limit[1].current =  v.length
    if(v.length >=200){
      this.data.limit[1].beyondStyle = "red"
    }else{
      this.data.limit[1].beyondStyle = "#9494A2"
    }
    this.setData({
      limit: this.data.limit
    })
  },
  inputPrice : function(e){
    var v = e.detail.value
    if(v >= 99999.9){
      wx.showToast({
        title: '价格超限啦~,上限99999.9哦~',
        icon : "none",
        duration : 3000
      })
      this.setData({
        price : null
      })
    }
  },
  formsubmit: function(e){
    var that = this
    if(this.data.canSub ){
      var data = e.detail.value
      if(data.description == ""){
        wx.showToast({
          title: '未填写介绍',
          icon: "none"
        })
      }else if(this.imgupload.data.image.length == 0){
        wx.showToast({
          title: '未添加图片',
          icon: "none"
        })
      }else if(data.price == ""){
        wx.showToast({
          title : "未填写价格",
          icon : "none"
        })
      } else if (this.data.category == "分个类卖得快"){
        wx.showToast({
          title: '未填写分类',
          icon : "none"
        })
      }else if(this.data.school == "线下交易地点"){
        wx.showToast({
          title: '未填写校区',
          icon : "none"
        })
      }else if(data.phoneNum =="" && data.wxid == "" && data.qqNum == ""){
        wx.showToast({
          title: '联系方式至少填写一个',
          icon : "none"
        })
      }else{
          wx.getStorage({
            key: 'cookie',
            success: function (res) {
              wx.request({
                url: 'https://pg.npupaogua.cn/paogua/Home/Release/saveFile',
                method: "POST",
                header: {
                  "content-type": "application/x-www-form-urlencoded",
                  "Cookie": app.globalData.cookie
                },
                data: {
                  Mstring: res.data,
                  goods_id : that.data.goods_id,
                  title: e.detail.value.title,
                  description: e.detail.value.description,
                  price: e.detail.value.price,
                  category: that.data.category,
                  school: that.data.school,
                  phoneNum: e.detail.value.phoneNum,
                  wxId: e.detail.value.wxid,
                  qqNum: e.detail.value.qqNum,
                  imageUrl: JSON.stringify(that.data.imageUrl)
                },
                success: function (res) {
                  console.log(res.data)
                }
              })
            },
          })

      }
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //获取imgupload组件
    this.imgupload = this.selectComponent("#imgupload");
   var that = this
     if(options.goods_id != ""){
       that.data.goods_id = options.goods_id
       wx.getStorage({
         key: 'cookie',
         success: function(res) {
           if(res.data){
             wx.request({
               url: 'https://pg.npupaogua.cn/paogua/Home/Self/editMyRelease',
               method: "POST",
               header: {
                 "content-type": "application/x-www-form-urlencoded",
                 "cookie": app.globalData.cookie,
               },
               data: {
                 Mstring: res.data,
                 goods_id: options.goods_id,
               },
               success : function(res){
                
                 if(res.data){
                   console.log(res.data)
                   that.data.limit[0].current = res.data.title.length
                   that.data.limit[1].current = res.data.description.length
                   var a = res.data.category.split("-")
                   that.imgupload.setData({
                     image : res.data.imageUrl
                   })
                   that.setData({
                     title : res.data.title,
                     description : res.data.description,
                     imageUrl : res.data.imageUrl,
                     price : res.data.price,
                     category : {
                       name: util.parseCate(a[0],a[1],1),
                       code: res.data.category
                     },
                     school : {
                       name: util.parseSch(res.data.school) ,
                       code: res.data.school
                     },
                     phoneNum : res.data.phoneNum,
                     qqNum : res.data.qqNum,
                     wxId : res.data.wxId,
                     limit : that.data.limit,
                     btncolor: "#F36778",
                     canSub: true
                   })
                 }
               }
             })
           }
         },
       })
     }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady : function () {
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var isNpu = app.globalData.isNPU
    console.log(isNpu)
        if (isNpu == '201') {
              wx.showModal({
                title: '温馨提示',
                content: '绑定翱翔账号后才可以编辑已发布哦~点击“去绑定”即可跳转翱翔账号绑定页面',
                showCancel: true,
                confirmText: "去绑定",
                confirmColor: '#01C000',
                success: function (res) {
                  if (res.confirm) {
                    wx.navigateTo({
                      url: '../confirm/confirm',
                    })
                  } else {
                    wx.navigateBack({
                      delta : 1
                    })
                  }
                }
              })
        } else if (isNpu == '502') {
              wx.showToast({
                title: '微信登陆过期',
                icon: "icon",
                success: function () {
                  wx.switchTab({
                    url: '../../home/home',
                  })
                }
              })
        } else if (isNpu == '401') {
              wx.showToast({
                title: '请求失败',
                icon: 'none',
                success: function () {
                  wx.switchTab({
                    url: '../../home/home',
                  })
                }
              })
            }else if(isNpu == '300' || app.globalData.login=='401'){
            wx.showToast({
              title: '网络开小差了',
              icon: 'loading',
              mask: true,
              success: function () {
                wx.switchTab({
                  url: '../../home/home',
                })
              }
            })

          }
  

    var that = this
    var navto = this.data.navto
    if ( navto ) {
      //navto回归
      that.setData({
        navto : false
      })
      wx.getStorage({
        key: 'category',
        success: function(res) {
          that.setData({
            category : res.data
          })
          wx.removeStorage({
            key: 'category'
          })
        },
      })
    }
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