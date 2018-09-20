Component({
  options : {
    multipleSolts :true //定义组件支持多solts
  },
  /*
   * 组件的属性列表 
   */
  properties : {
    //图片数组
    imageUrl : {
      type : Array,
      value : []
    },
    //图片限制个数
    imageLimit : {
      type: Number,
      value : 8
    },
    imageMaxPerTime : {
      type : Number,
      value : 8
    },
    //提示语
     hint : {
      type : String,
      value : "添加图片"
    } ,
    //提示icon
    /* 
     * 默认支持的icon类有10种
     * 相机
     * iconfont icon-xiangji
     * iconfont icon-xiangji1
     * iconfont icon-xiangji2
     * iconfont icon-xiangji3
     * iconfont icon-camera_full
     * 添加
     * iconfont icon-tianjia
     * iconfont icon-tianjia1
     * iconfont icon-tianjia2
     * iconfont icon-tianjia3
     * iconfont icon-icontjzp
    */
    hint_icon : {
      type : String,
      value : "iconfont icon-xiangji"
    },
    icon_size : {
      type : String,
      value: "100rpx"
    },
    icon_color : {
      type : String,
      value : "#2C2C2C"
    },
    //提示块的背景颜色
    hint_background : {
      type : String ,
      value: "#E5E5E5"
    },
    //每块的高 高宽比默认1:1
    hint_height : {
      type : String,
      value : "160rpx"
    },
    //每块的宽 高宽比默认1:1
    hint_width : {
      type : String,
      value : "160rpx"
    },
    //整体背景颜色
    background : {
      type : String,
      value: "#FFFFFF"
    },
    //图片剪裁mode
    mode : {
      type : String,
      value: "aspectFill"
    }

  },
  //内部数据
  data : {
    image: [
    ],
    isBeyond : ""
  },
  attached : function(){
    this.setData({
      image : this.data.imageUrl
    })
  },
  //组件方法列表
  methods : {
    // 上传图片
    chooseImage: function () {
      
      var that = this;
      if(this.data.image.length >= this.data.imageLimit){
        that.setData({
          isBeyond : "none"
        })
      }else{
        var curPertime = that.data.imageLimit-that.data.image.length
        wx.chooseImage({
          count: curPertime,
          sizeType: ['original', 'compressed'],
          sourceType: ['album', 'camera'],
          success: function (res) {
            var tempFilePaths = res.tempFilePaths;//用户选择的图片的本地路径列表
            var length = tempFilePaths.length//用户选了几张
            //将路径循环push入image数组中
            var i = 0
            while (length) {
              var obj = {}
              obj = tempFilePaths[i]
              that.data.image.push(obj)
              length--
              i++
            }
            //隐藏hint
            if (that.data.image.length >= that.data.imageLimit) {
              that.setData({
                isBeyond: "none"
              })
            }
            //使body自适应图片的增加
            var l = that.data.image.length
            if (l >= 3) {
              var b = parseInt(l / 3)
              that.setData({
                bodyStyle: "height:" + (328 + b * 90) + "px"
              })
            }
            //重新渲染image视图
            that.setData({
              image: that.data.image
            })
          },
          fail: function () {

          }
        })
      }

    },
    // 删除图片
    removeImage: function (event) {
      //删除相应的数组元素
      this.data.image.splice(event.currentTarget.id, 1)
      //
      if (this.data.image.length < this.data.imageLimit) {
        this.setData({
          isBeyond: ""
        })
      }
      //重新渲染视图
      this.setData({
        image: this.data.image
      })
    },
  },


})