var util = require("../../utils/util.js")
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    current : 0,
    maxLength : 500,
    beyondLimit: "color:#9494A2",
    radio1style : "color:black;",
    radio2style : "color:black;",
    image : [
    ] ,
    bodyStyle : "",
    canSubmit : 0,
  },
  // 选择单选框
selectRadio1:function(){
  this.setData({
    radio1style : "color:red;",
    radio2style : "color:black",
    canSubmit : 1
  })
},
selectRadio2:function(){
  this.setData({
    radio1style : "color:black;",
    radio2style : "color:red;",
    canSubmit: 1
  })
},
// textarea字数计算
changeText:function(e){
  var len = parseInt((e.detail.value).length);
  this.setData({
    canSubmit : len>=1 ? 1:0 
  })
  if(len < 500){
    this.setData({
      current : len,
      beyondLimit : "color:#9494A2"
    })
  }else{
    this.setData({
      current : len,
      beyondLimit : "color:red;"
    })
  }
},



  formSubmit : function(e){
    var that = this
    var suggestion = e.detail.value.suggestion
    //如果电话号码不是数字且不是11位则报错提示
    var phoneNum = e.detail.value.phoneNum
    var sugbug = e.detail.value.sugbug
    var canSubmit = true
    console.log(util.checkNumber(phoneNum))
    if(sugbug == ''){
      wx.showToast({
        title: '请选择反馈类型',
        icon : 'none'
      })
      canSubmit = false
    }
    if(suggestion == ""){
      wx.showToast({
        title: '请填写您的意见或反馈',
        icon : 'none'
      })
      canSubmit = false
    }
    if (phoneNum != '' && (!util.checkNumber(phoneNum) || phoneNum.length != 11)){
      console.log('suce')
      wx.showToast({
        title: '电话号码格式错误',
        icon : 'none'
      })
      canSubmit = false
    }

    if(canSubmit){
      wx.getStorage({
        key: 'cookie',
        success: function (res) {
          var Mstring = res.data
          wx.request({
            url: 'https://pg.npupaogua.cn/paogua/Home/Self/sendSuggest',
            method: "POST",
            header: {
              "content-type": "application/x-www-form-urlencoded",
              "Cookie": app.globalData.cookie
            },
            data: {
              Mstring: res.data,
              sugbug: sugbug,
              suggestion: suggestion,
              phoneNum: phoneNum
            },
            success: function (res) {
              if (res.data == '400') {

              } else if (res.data == '502') {

              } else if (res.data == '401') {

              } else {
                var image = that.imgupload.data.image
                for (var i = 0; i < image.length; i++) {
                  wx.uploadFile({
                    url: 'https://pg.npupaogua.cn/paogua/home/Self/uploadSugImg',
                    filePath: image[i],
                    name: 'image',
                    header: {
                      "content-type": "multipart/form-data",
                      "Cookie": app.globalData.cookie
                    },
                    formData: {
                      Mstring: Mstring,
                      sugbug: sugbug
                    },
                    success: function (res) {
                      console.log(res.data)
                    }
                  })
                }

              }
            }
          })
        },
      })


    }
    // wx.request({
    //   url: "http://172.99.255.204/paogua/server/self/suggest/suggest.php",
    //   data : {

    //   }
    // })
    // this.uploadImage("http://172.99.255.204/paogua/server/self/suggest/uploadImage.php","file")
    // wx.request({
    //   url: 'http://172.99.255.204/test/confirm.php',
    //   success : function(res){
    //     console.log(res.data)
    //   }
    // })
    // var tempFile=this.data.image
    // wx.uploadFile({
    //   url: 'http://172.99.255.204/paogua/server/self/suggest/uploadImage.php',
    //   filePath: tempFile[0].imageAddress,
    //   header : {"Content-Type" : "multipart/form-data",
    //     "content-type": "application/x-www-form-urlencoded"},
    //   name: 'file',
    //   success : function(res){
    //     console.log(res.data)
    //   },
    //   fail: function(){
    //     console.log("fail")
    //   }
    // })
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
    //获取imgupload组件实例
    this.imgupload = this.selectComponent("#imgupload");
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