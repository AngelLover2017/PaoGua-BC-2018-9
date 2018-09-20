// pages/classfy/classify.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navItem: [{
      id: 1,
      name: "生活用品",
      code : "shenghuoyongpin",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "用电的",
        ccode : "yongdiande",
        content: "电吹风、小电扇、体重计、空气净化器等"
      },
      {
        cid: 2,
        cname: "不用电的",
        ccode : "buyongdiande",
        content: "脸盆、搓衣板、洗衣粉、撑衣杆等"
      },
      {
        cid: 3,
        cname: "运动用品",
        ccode : "yundongyongpin",
        content: "哑铃、瑜伽垫、健身用品等"
      },
      {
        cid: 4,
        cname: "代步工具",
        ccode : "daibugongju",
        content: "自行车、滑板、溜冰鞋等"
      },
      {
        cid: 5,
        cname: "其他",
        ccode : "qita",
        content: "其他无法描述的生活用品"
      }

      ]

    }, {
      id: 2,
      name: "书籍学习",
      code : "shujixuexi",
      is_child: true,

      child_nav: [{
        cid: 1,
        cname: "教材",
        ccode : "jiaocai",
        content: "课内教材"
      },
      {
        cid: 2,
        cname: "其他书籍",
        ccode : "qitashuju",
        content: "非课内教材等"
      },
      {
        cid: 3,
        cname: "乐器",
        ccode : "yueqi",
        content: "吉他、口风琴等"
      },
      {
        cid: 4,
        cname: "学习用品",
        ccode: "xuexiyongpin",
        content: "电子元器件、单片机、文具、计算器的等"
      },
      {
        cid: 5,
        cname: "电子资料",
        ccode : "dianziziliao",
        content: "PDF电子书、听力材料、软件等"
      },
      {
        cid: 6,
        cname: "其他",
        ccode: "qita",
        content: "其他无法描述的书籍学习"
      }

      ]

    }, {
      id: 3,
      name: "数码产品",
      code : "shumachanpin",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "手机/平板",
        ccode: "shouji/pingban",
        content: "手机、平板电脑等"
      },
      {
        cid: 2,
        cname: "电脑/显示器",
        ccode : "diannao/xianshiqi",
        content: "笔记本、台式机、显卡、显示器等"
      },
      {
        cid: 3,
        cname: "摄影器材",
        ccode: "sheyingqicai",
        content: "单反、微单、三脚架、摄影包等"
      },
      {
        cid: 4,
        cname: "音响/耳机",
        ccode : "yinxiang/erji",
        content: "实打实的音响或者耳机"
      },
      {
        cid: 5,
        cname: "游戏相关",
        ccode : "youxixiangguan",
        content: "游戏光盘、虚拟游戏物品等"
      },
      {
        cid: 6,
        cname: "其他",
        ccode : "qita",
        content: "其他无法描述的数码产品"
      }

      ]

    }, {
      id: 4,
      name: "服装鞋包",
      code : "fuzhuangxiebao",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "女装",
        ccode : "nvzhuang",
        content: ""
      },
      {
        cid: 2,
        cname: "女鞋",
        ccode : "nvxie",
        content: ""
      },
      {
        cid: 3,
        cname: "女包",
        ccode: "nvbao",
        content: ""
      },
      {
        cid: 4,
        cname: "男装",
        ccode : "nanzhuang",
        content: ""
      },
      {
        cid: 5,
        cname: "男鞋",
        ccode : "nanxie",
        content: ""
      },
      {
        cid: 6,
        cname: "男包",
        ccode : "nanbao",
        content: ""
      },
      {
        cid: 7,
        cname: "帽子",
        ccode : "maozi",
        content: ""
      },
      {
        cid: 8,
        cname: "饰品",
        ccode : "shipin",
        content: ""
      },
      {
        cid: 9,
        cname: "其他",
        ccode :"qita",
        content: "其他无法描述的服装鞋包"
      }

      ]

    }, {
      id: 5,
      name: "好吃的",
      code : "haochide",
      is_child: false,
      child_nav: [
      ]

    }, {
      id: 6,
      name: "美妆养护",
      code : "meizhuangmeihu",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "护肤",
        ccode : "hufu",
        content: ""
      },
      {
        cid: 2,
        cname: "底妆",
        ccode : "dizhuang",
        content: ""
      },
      {
        cid: 3,
        cname: "彩妆",
        ccode : "caizhuang",
        content: ""
      },
      {
        cid: 4,
        cname: "口红",
        ccode : "kouhong",
        content: ""
      },
      {
        cid: 5,
        cname: "香水",
        ccode : "xiangshui",
        content: ""
      },
      {
        cid: 6,
        cname: "指甲油",
        ccode : "zhijiayou",
        content: ""
      },
      {
        cid: 7,
        cname: "医药保健",
        ccode : "yiyaobaojian",
        content: ""
      },
      {
        cid: 8,
        cname: "其他",
        ccode : "qita",
        content: "其他无法描述的美妆养护"
      }

      ]

    }, {
      id: 7,
      name: "小服务",
      code : "xiaofuwu",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "摄影摄像航拍",
        ccode: "sheyingshexianghangpai",
        content: ""
      },
      {
        cid: 2,
        cname: "长期代取快递",
        ccode : "changqidaiqukuaidi",
        content: ""
      },
      {
        cid: 3,
        cname: "课业辅导",
        ccode : "keyefudao",
        content: ""
      },
      {
        cid: 4,
        cname: "美妆美甲",
        ccode : "meizhuangmeijia",
        content: ""
      },
      {
        cid: 5,
        cname: "市区代购",
        ccode : "shiqudaigou",
        content: ""
      },

      ]

    }, {
      id: 8,
      name: "求购",
      code : "qiugou",
      is_child: true,
      child_nav: [{
        cid: 1,
        cname: "生活用品",
        ccode : "shenghuoyongpin",
        content: "日常用品、运动用品、代步工具等"
      },
      {
        cid: 2,
        cname: "书籍学习",
        ccode : "shujixuexi",
        content: "教材、图书、电子元器件、乐器等"
      },
      {
        cid: 3,
        cname: "数码产品",
        ccode : "shumachanpin",
        content: "手机、电脑、耳机、相机、游戏相关等"
      },
      {
        cid: 4,
        cname: "服装鞋包",
        ccode : "fuzhuangxiebao",
        content: "男女装、包、帽子、饰品等"
      },
      {
        cid: 5,
        cname: "好吃的",
        ccode : "haochide",
        content: "对啊就真的很好吃"
      },
      {
        cid: 6,
        cname: "美妆养护",
        ccode : "meizhuangmeihu",
        content: "护肤、底妆、彩妆、口红、香水等"
      },
      {
        cid: 7,
        cname: "求帮忙",
        ccode: "qiubangmang",
        content: "认真的求帮忙"
      }

      ]

    }],
    curNav: 1,
    curIndex: 0
  },
  switchRight: function (e) {
    var id = e.target.dataset.id
    var index = e.target.dataset.index
    if(this.data.navItem[index].is_child){
      this.setData({
        curNav: id,
        curIndex: index
      })
    }else{
      var category = this.data.navItem[index].name+" "+this.data.navItem[index].code
      wx.setStorage({
        key: 'category',
        data: category,
        success: function () {
          wx.navigateBack({
            delta: 1
          })
        }
      })
    }

  },
  backCate : function(e){
    var cindex = e.currentTarget.dataset.index 
    var pindex  = this.data.curIndex
    var parent = this.data.navItem[pindex].name
    var parentC = this.data.navItem[pindex].code
    var child = this.data.navItem[pindex].child_nav[cindex].cname
    var childC = this.data.navItem[pindex].child_nav[cindex].ccode
    var category = parent+"-"+child+" "+parentC+"-"+childC
    wx.setStorage({
      key: 'category',
      data: category,
      success: function(){
        wx.navigateBack({
          delta : 1 
        })
      }
    })
   
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