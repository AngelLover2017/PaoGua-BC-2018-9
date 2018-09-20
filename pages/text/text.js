
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: "这里显示radio的值",
    content: [
      {
        name: "r_sold",
        value: "卖掉了",
        isChecked: false
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
  startToast:function(){
    this.popup.showPopup()
  },
  cancel : function(){
    this.popup.hidePopup()
  },
  success : function(){
    this.setData({
      value: this.popup.data.checkedValue
    })
    this.popup.hidePopup()
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
    this.popup = this.selectComponent("#popup");
    
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