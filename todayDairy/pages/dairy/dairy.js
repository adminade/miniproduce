// pages/dairy/dairy.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
// 跳转页面函数
goto_soldHistory(){
  wx.navigateTo({
    url: '/todayDairy/pages/soldHistory/soldHistory',
  })
},
goto_buyHistory(){
  wx.navigateTo({
    url: '/todayDairy/pages/buyHistory/buyHistory',
  })
},
goto_drugHistory(){
  wx.navigateTo({
    url: '/todayDairy/pages/drugHistory/pages.drugHistory',
  })
},
goto_deseaseHistory(){
  wx.navigateTo({
    url: '/todayDairy/pages/deseaseHistory/deseaseHistory',
  })
},

goto_operateHistory(){
  wx.navigateTo({
    url: '/todayDairy/pages/operateHistory/operateHistory',
  })
},

goto_addpig(){
  wx.navigateTo({
    url: '/todayDairy/pages/addpig/addpig',
  })
},
goto_transferHouse(){
  wx.navigateTo({
    url: '/todayDairy/pages/transferHistory/transferHistory',
  })
},

goto_dieOutHistory(){
wx.navigateTo({
  url: '/todayDairy/pages/dieOutHistory/dieOutHistory',
})
},
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})