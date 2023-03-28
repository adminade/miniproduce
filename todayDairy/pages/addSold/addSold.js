// todayDairy/pages/addBuy/addBuy.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    time:null
  },
  submit(e){
    var data = e.detail.value
    if (!data.title) {
      wx.showToast({
        title: '批号为空',
        icon: 'none'
      })
      return
    }
    if (!data.pigSum) {
      wx.showToast({
        title: '头数为空',
        icon: 'none'
      })
      return
    }
    if (!data.totalWeight) {
      wx.showToast({
        title: '总重量为空',
        icon: 'none'
      })
      return
    }
    if (!data.price) {
      wx.showToast({
        title: '价格为空',
        icon: 'none'
      })
      return
    }
    if (!data.time) {
      wx.showToast({
        title: '录入时间为空',
        icon: 'none'
      })
      return
    }
    if (!data.user) {
      wx.showToast({
        title: '操作员为空',
        icon: 'none'
      })
      return
    }
    if (!data.toer) {
      wx.showToast({
        title: '供应商为空',
        icon: 'none'
      })
      return
    }
    if (isNaN(data.pigSum)) {
      wx.showToast({
        title: '头数必须是数字',
        icon: 'none'
      })
      return
    }
    if (isNaN(data.totalWeight)) {
      wx.showToast({
        title: '重量必须是数字',
        icon: 'none'
      })
      return
    }
    //提交数据
    utils.myRequest({
      url:`localserver/addSoldData`,
      method:'POST',
      data:data
    }).then(res =>{
      console.log(res.data)
      if(res.data.message == 'ok')
        {
          wx.showToast({
            title: '添加记录成功',
            icon:'success',
            duration:1000
          })
        }
       else  
       wx.showToast({
         title: '添加记录失败',
         icon:'success',
         duration:1000
       })
    })    

  },
  



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user:app.globalData.user
    })
this.gettime();  
  },
  //获取时间  
gettime(){
  // 创建一个 Date 对象
 var now = new Date();
 
 // 获取年月日信息
 var year = now.getFullYear(); // 年份
 var month = now.getMonth() + 1; // 月份，注意要加 1
 var day = now.getDate(); // 日
 
 // 将月份和日转换为两位数的字符串
 month = month < 10 ? '0' + month : month;
 day = day < 10 ? '0' + day : day;
 
 // 组合成需要的日期格式，例如：2023-03-26
 var dateStr = year + '-' + month + '-' + day;
 
 // 输出日期字符串
 // console.log(dateStr); 
 this.setData({
   time:dateStr
 })
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