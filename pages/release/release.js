var app= getApp()
Page({

  /**
   * 页面的初始数据
   * navto : 是否去选择分类
   * 
   */
  data: {
    hasImage : false,
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
    // imageUrl: [
    //     "http://172.99.255.204/paogua/public/images/bp.png"
    // ],
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
    autoload : 1
  },
  selectSch: function(){
    var that = this
    wx.showActionSheet({
      itemList: ['全部校区','友谊校区','长安校区'],
      success: function(res){
        var sch = ""
        switch(res.tapIndex){
          case 0 : that.data.school.name="全部校区";that.data.school.code="quanbuxiaoqu";break;
          case 1: that.data.school.name = "友谊校区"; that.data.school.code = "youyixiaoqu";break;
          case 2: that.data.school.name = "长安校区"; that.data.school.code = "changanxiaoqu";break;
          default: that.data.school.name = "全部校区"; that.data.school.code = "quanbuxiaoqu";break;
        }
        that.setData({
          school : that.data.school
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
  autoload:function(){
    var that=this
    if(this.data.autoload == 1){
      wx.getStorage({
        key: 'cookie',
        success: function(res) {
          if(res.data){
            wx.request({
              url: 'https://pg.npupaogua.cn/paogua/Home/Release/autoUploadContact',
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded",
                "Cookie": app.globalData.cookie
              },
              data: {
                Mstring: res.data,
              },
              success: function (res) {
                if(res.data == '400'){
                  
                }else if(res.data == '401'){

                }else if(res.data =='502'){

                }else{
                  console.log(res.data)
                  var data = res.data
                  if(data.phoneNum != "" || data.wxId != '' || data.qqNum != ''){
                    wx.showModal({
                      title: '温馨提示',
                      content: '检测到你已有联系方式,是否加载？',
                      showCancel :true,
                      cancelText : '否',
                      confirmText : '是',
                      success : function(res){
                        if(res.confirm){
                          that.setData({
                            phoneNum : data.phoneNum,
                            wxId : data.wxId,
                            qqNum : data.qqNum,
                            autoload : 0
                          })
                        }
                        if(res.cancel){
                          that.setData({
                            autoload : 0
                          })
                        }
                        console.log(that.data.autoload)
                      }
                    })
                  }
                }
              }
            })
          }
        },
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
          //确认发布
          wx.showModal({
            title: '信息提示',
            content: '闲置物品若15天内未被“擦亮”，买家可能会看不见。记得常去“我发布的”中去擦亮你的闲置哦～',
            confirmText: "确认",
            showCancel: false,
            success: function (res) {
              if (res.confirm) {
                wx.getStorage({
                  key: 'cookie',
                  success: function (res) {
                    var Mstring = res.data

                    wx.request({
                      url: 'https://pg.npupaogua.cn/paogua/Home/Release/release',
                      method: "POST",
                      header: {
                        "content-type": "application/x-www-form-urlencoded",
                        "Cookie": app.globalData.cookie
                      },
                      data: {
                        Mstring: res.data,
                        title: e.detail.value.title,
                        description: e.detail.value.description,
                        price: e.detail.value.price,
                        category: that.data.category.code,
                        school: that.data.school.code,
                        phoneNum: e.detail.value.phoneNum,
                        wxId: e.detail.value.wxid,
                        qqNum: e.detail.value.qqNum
                      },
                      success: function (res) {
                        if(res.data == '400'){

                        }else if(res.data == '502'){

                        }else if(res.data == '401'){

                        }else{
                          var goods_id = res.data
                          var image = that.imgupload.data.image
                          var rs = 0
                          wx.showLoading({
                            title: '图片上传中',
                            success:function(){
                              for (var i = 0; i < image.length; i++) {
                                wx.uploadFile({
                                  url: 'https://pg.npupaogua.cn/paogua/home/release/uploadImages',
                                  filePath: image[i],
                                  name: 'image',
                                  header: {
                                    "content-type": "multipart/form-data",
                                    "Cookie": app.globalData.cookie
                                    
                                  },
                                  formData: {
                                    Mstring: Mstring,
                                    goods_id: goods_id
                                  },
                                  success: function (result) {
                                    rs++;                        
                                    if(rs == image.length){
                                      wx.hideLoading()
                                      wx.redirectTo({
                                        url: '../home/home',
                                      })
                                    }
                                  },
                                  fail: function () {
                                    wx.showToast({
                                      title: '网络开小差了，请重试',
                                      icon: 'none'
                                    })
                                  }

                                })
                              }
                            }
                          })
                        }
                      },
                      fail:function(){
                        wx.showToast({
                          title: '网络开小差了，请重试',
                          icon : 'none'
                        })
                      }
                    })
                  },
                })
              }
            }
          })
      }
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
  onReady : function () {
    //获取imgupload组件
    this.imgupload = this.selectComponent("#imgupload");
    // this.imgupload.setData({
    //   image: this.data.imageUrl
    // })
    
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
                content: '绑定翱翔账号后才可以发布闲置哦~点击“去绑定”即可跳转翱翔账号绑定页面',
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
          var a = res.data.split(" ")
          that.data.category.name = a[0]
          that.data.category.code = a[1]
          that.setData({
            category : that.data.category
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