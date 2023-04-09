// pages/feedback/feedback.js
const app = getApp()
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:null,
    username:null,
    phone:null

  },


  submit(e){
   console.log(e.detail.value)
   const data =  e.detail.value
   if(data.message == "")
     {
       wx.showToast({
         title: '内容为空！',
         icon:'error'
       })
       return
      }

      utils.myRequest({
        url:'localserver/feedback',
        method:'POST',
        data:data
      }).then(res =>{
        console.log(res.data.message)
        if(res.data.message == 'ok'){
          wx.showModal({
            title: '',
            content: '感谢您的反馈！',
            complete: (res) => {
              if (res.cancel) {
                
              }
          
              if (res.confirm) {
                
              }
            }
          })
        }

      })


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.gettime()
  },
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
     time:dateStr,
     username:app.globalData.user,
     phone:app.globalData.phone

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