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
                if(image.length == 0){
                  wx.showToast({
                    title: '谢谢你宝贵的意见和反馈',
                    success: function(){
                      wx.navigateBack({
                        delta:1
                      })
                    }
                  })
                }else{
                  wx.showLoading({
                    title: '图片上传中',
                    success:function(){
                      var rs = 0
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
                            var jsonStr = res.data
                            //去掉字符串中的空格
                            jsonStr = jsonStr.replace(" ", "");
                            //typeof https://www.cnblogs.com/liu-fei-fei/p/7715870.html
                            if (typeof jsonStr != 'object') {
                              //去掉饭斜杠
                              jsonStr = jsonStr.replace(/\ufeff/g, "")
                              var jsonObj = JSON.parse(jsonStr)
                              res.data = jsonObj
                            }
                            if(res.data == "success"){
                              rs++
                            }
                            if(rs == image.length){
                              wx.hideLoading()
                              wx.showToast({
                                title: '谢谢你宝贵的意见和反馈',
                                success: function () {
                                  wx.navigateBack({
                                    delta: 1
                                  })
                                }
                              })
                            }
                          }
                        })
                      }
                    }
                  })

                }

              }
            }
          })
        },
      })


    }
 
 
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