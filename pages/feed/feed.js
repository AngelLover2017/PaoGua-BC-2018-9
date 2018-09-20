var app=getApp()
var util = require("../../utils/util.js")

function getPfilter(limit , that , isClear){
  if(isClear){
    that.data.block = []
  }
  wx.showLoading({
    title: '加载中',
    success : function(){
      wx.getStorage({
        key: 'cookie',
        success: function (res) {
          console.log(that.data.select)
          //
          var filter0 = 0
          var filter0Item = that.data.select[0].filter
          if (filter0Item == "全部校区"){
            filter0 = 0
          }else if(filter0Item == "友谊校区"){
            filter0 = 1
          }else if(filter0Item == "长安校区"){
            filter0 = 2
          }
          var filter1 = 0
          var filter1Item = that.data.select[1].filter
          if (filter1Item == "最近发布"){
            filter1 = 0
          } else if (filter1Item == "价格最低"){
            filter1 = 1
          } else if (filter1Item == "价格最高"){
            filter1 = 2
          }
          if (res.data) {
            wx.request({
              url: 'https://pg.npupaogua.cn/paogua/Home/Shelf/Pfilter',
              method: "POST",
              header: {
                "content-type": "application/x-www-form-urlencoded;charset=utf-8",
                "cookie": app.globalData.cookie
              },
              data: {
                Mstring: res.data,
                school: filter0,
                ftype: filter1,
                category: that.data.select[2].code,
                limit: limit
              },
              success: function (res) {
                console.log(res.data)
                if (Array.isArray(res.data)) {
                  for(var i=0;i<res.data.length;i++){
                    res.data[i].school = util.parseSch(res.data[i].school)
                    that.data.block.push(res.data[i])
                  }   
                } 
                wx.hideLoading()
                that.setData({
                  block: that.data.block,
                  select: that.data.select
                })
              }
            })
          }
        },
      })
    }
  })

}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // feed
    block : [
      // {
      //   avatarUrl: "http://localhost/paogua/public/images/bp.png",
      //   nickName: "吕炳旭",
      //   subTime: "2018-08-30",
      //   price: "￥9999",
      //   title: "我是标题，支持多行显示",
      //   imageUrl: [
      //     "http://localhost/paogua/public/images/bp.png",
      //   ],
      //   school: "长安校区",
      // },
    ],
 
    //select
    curFilter: -1,
    onOff: 0,
    select : [
      {
        id : 0,
        filter: "全部校区",
        code : "quanbuxiaoqu"
      },
      {
        id: 1,
        filter: "最新发布",
        code : "zuijinfabu"
      },
      {
        id: 2,
        filter: "生活用品-全部",
        code : "shenghuoyongpin-quanbu"
      },
    ],
    // select panel
    filter: [
      {
        items : ["全部校区", "友谊校区", "长安校区"],
        code : ["quanbuxiaoqu","youyixiaoqu","changanxiaoqu"]
      },
      {
        items : ["最近发布", "价格最低", "价格最高"],
        code  : ["zuijinfabu","jiagezuidi","jiagezuigao"]
      }
    ],
    cur: -1,
    order  :[
      0,1,2
    ],
    navItem: [{
      id: 1,
      name: "生活用品",
      code : "shenghuoyongpin",
      is_child: true,
      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部生活用品"
        },
      {
        cname: "用电的",
        ccode : "yongdiande",
        content: "电吹风、小电扇、体重计、空气净化器等"
      },
      {
        cname: "不用电的",
        ccode :"buyongdiande",
        content: "脸盆、搓衣板、洗衣粉、撑衣杆等"
      },
      {
        cname: "运动用品",
        ccode : "yundongyongpin",
        content: "哑铃、瑜伽垫、健身用品等"
      },
      {
        cname: "代步工具",
        ccode : "daibugongju",
        content: "自行车、滑板、溜冰鞋等"
      },

      ]

    }, {
      id: 2,
      name: "书籍学习",
      code : "shujixuexi",
      is_child: true,

      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部书籍学习"
        },
      {
        cname: "教材",
        ccode : "jiaocai",
        content: "课内教材"
      },
      {
        cname: "其他书籍",
        ccode : "qitashuji",
        content: "非课内教材等"
      },
      {
        cname: "乐器",
        ccode : "yueqi",
        content: "吉他、口风琴等"
      },
      {
        cname: "学习用品",
        ccode : "xuexiyongpin",
        content: "电子元器件、单片机、文具、计算器的等"
      },
      {
        cname: "电子资料",
        ccode : "dianziziliao",
        content: "PDF电子书、听力材料、软件等"
      },

      ]

    }, {
      id: 3,
      name: "数码产品",
      code : "shumachanpin",
      is_child: true,
      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部数码产品"
        },
        {
        cname: "手机/平板",
        ccode : "shouji/pingban",
        content: "手机、平板电脑等"
      },
      {
        cname: "电脑/显示器",
        ccode : "diannao/xianshiqi",
        content: "笔记本、台式机、显卡、显示器等"
      },
      {
        cname: "摄影器材",
        ccode : "sheyingqicai",
        content: "单反、微单、三脚架、摄影包等"
      },
      {
        cname: "音响/耳机",
        ccode : "yinxiang/erji",
        content: "实打实的音响或者耳机"
      },
      {
        cname: "游戏相关",
        ccode : "youxixiangguan",
        content: "游戏光盘、虚拟游戏物品等"
      },

      ]

    }, {
      id: 4,
      name: "服装鞋包",
      code : "fuzhuangxiebao",
      is_child: true,
      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部服装鞋包"
        },
        {
        cname: "女装",
        ccode : "nvzhuang",
        content: ""
      },
      {
        cname: "女鞋",
        ccode : "nvxie",
        content: ""
      },
      {
        cname: "女包",
        ccode : "nvbao",
        content: ""
      },
      {
        cname: "男装",
        ccode : "nanzhuang",
        content: ""
      },
      {
        cname: "男鞋",
        ccode : "nanxie",
        content: ""
      },
      {
        cname: "男包",
        ccode : "nanbao",
        content: ""
      },
      {
        cname: "帽子",
        ccode : "maozi",
        content: ""
      },
      {
        cname: "饰品",
        ccode : "shipin",
        content: ""
      },


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
      ccode : "meizhuangmeihu",
      is_child: true,
      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部美妆养护"
        },
        {
        cname: "护肤",
        ccode : "hufu",
        content: ""
      },
      {
        cname: "底妆",
        ccode : "dizhuang",
        content: ""
      },
      {
        cname: "彩妆",
        ccode: "caizhuang",
        content: ""
      },
      {
        cname: "口红",
        ccode : "kouhong",
        content: ""
      },
      {
        cname: "香水",
        ccode : "xiangshui",
        content: ""
      },
      {
        cname: "指甲油",
        ccode : "zhijiayou",
        content: ""
      },
      {
        cname: "医药保健",
        ccode : "yiyaobaojian",
        content: ""
      },


      ]

    }, {
      id: 7,
      name: "小服务",
      code : "xiaofuwu",
      is_child: true,
      child_nav: [
        {
          cname: "全部",
          ccode : "quanbu",
          content: "全部小服务"
        },
        {
        cname: "摄影摄像航拍",
        ccode : "sheyingshexianghangpai",
        content: ""
      },
      {
        cname: "长期代取快递",
        ccode : "changqidaiqukuaidi",
        content: ""
      },
      {
        cname: "课业辅导",
        ccode : "keyefudao",
        content: ""
      },
      {
        cname: "美妆美甲",
        ccode : "meizhuangmeijia",
        content: ""
      },
      {
        cname: "市区代购",
        ccode :  "shiqudaigou",
        content: ""
      },

      ]

    }, {
      id: 8,
      name: "求购",
      code : "qiugou",
      is_child: true,
      child_nav: [{
        cname: "生活用品",
        ccode : "shenghuayongpin",
        content: "日常用品、运动用品、代步工具等"
      },
      {
        cname: "书籍学习",
        ccode : "shujixuexi",
        content: "教材、图书、电子元器件、乐器等"
      },
      {
        cname: "数码产品",
        ccode : "shumachanpin",
        content: "手机、电脑、耳机、相机、游戏相关等"
      },
      {
        cname: "服装鞋包",
        ccode : "fuzhuangxiebao",
        content: "男女装、包、帽子、饰品等"
      },
      {
        cname: "好吃的",
        ccode : "haochide",
        content: "对啊就真的很好吃"
      },
      {
        cname: "美妆养护",
        ccode : "meizhuangmeihu",
        content: "护肤、底妆、彩妆、口红、香水等"
      },
      {
        cname: "求帮忙",
        ccode : "qiubangmang",
        content: "认真的求帮忙"
      }

      ]

    }],
    curNav: -1,
    curNav2:-1
  },
  scrollLower : function(){
    
    var length  = this.data.block.length
    if(length % 10 == 0){
      getPfilter(parseInt(length/10+1),this)
    }else{
      wx.showToast({
        title: '已经到底了~',
        icon : "none"
      })
    }
  },
  // select
  selectFilter:function(e){
    var index = e.target.dataset.id
    if(this.data.onOff){
      this.data.onOff = 0
      this.data.curNav2 = -1
    }else{
      this.data.onOff = 1
    }
    this.setData({
      onOff: this.data.onOff,
      curFilter: index,
      curNav2 : this.data.curNav2
    })
    

  },
  // select panel
  select: function (e) {
    var index = e.target.dataset.id
    this.data.select[this.data.curFilter].filter = this.data.filter[this.data.curFilter].items[index]
    this.setData({
      onOff : 0,
      cur: index,
    })
    // var that = this
    getPfilter(1,this,true)
  },
  switchRight: function (e) {
    var index = e.target.dataset.index
    if(this.data.navItem[index].child_nav.length != 0){
      this.setData({
        curNav: index,
      })
    }else{
      this.data.select[this.data.curFilter].filter = this.data.navItem[index].name 
      this.data.select[this.data.curFilter].code = this.data.navItem[index].code 
      this.setData({
        onOff: 0,
        curNav: index,
      })
      getPfilter(1,this,true)
 
    }
    
  },
  backCate: function (e) {
    var index = e.target.dataset.index
    this.data.select[this.data.curFilter].filter = this.data.navItem[this.data.curNav].name+'-'+this.data.navItem[this.data.curNav].child_nav[index].cname
    this.data.select[this.data.curFilter].code = this.data.navItem[this.data.curNav].code + '-' + this.data.navItem[this.data.curNav].child_nav[index].ccode
    this.setData({
      onOff: 0,
      curNav2: index
    })
    getPfilter(1,this,true)
  },
  //block
  toDetail : function(e){
    console.log(this.data.freshItems)
    console.log(e)
    var goods_id = this.data.block[e.currentTarget.dataset.index].goods_id
    console.log(goods_id)
    wx.navigateTo({
      url: '../detail/detail?goods_id=' + goods_id,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var a = options.cate.split(" ")
    this.data.select[2].filter = a[0] == "好吃的" ?  '好吃的' : a[0]+"-全部"
    this.data.select[2].code = a[1] == "haochide" ? 'haochide': a[1]+"-quanbu"
    getPfilter(1,this,true)
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