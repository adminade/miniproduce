// pages/fix/fix.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    user:null,
    time:null,
    address:null,
    phone:null
  },
  submit(e){
    console.log(e.detail.value)
    const data = e.detail.value
    utils.myRequest({
      url:'localserver/addfix',
      method:'POST',
      data:data
    }).then(res =>{
      console.log(res)
      if(res.data.message == 'ok'){
        wx.showToast({
          title: '上传成功',
          icon:'success'
        })
      }
      else wx.showToast({
        title: '上传失败',
        icon:'error'
      })
    })
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user:app.globalData.user,
      address:app.globalData.brand,
      phone:app.globalData.phone
    })
    this.gettime()
  },

  gettime(){
   var now = new Date();
   
   var year = now.getFullYear(); // 年份
   var month = now.getMonth() + 1; // 月份，注意要加 1
   var day = now.getDate(); // 日
   
   month = month < 10 ? '0' + month : month;
   day = day < 10 ? '0' + day : day;
   
   var dateStr = year + '-' + month + '-' + day;
   
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