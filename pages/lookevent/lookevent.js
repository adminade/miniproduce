// pages/lookevent/lookevent.js
const app = getApp()
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
     alarmList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAlarmList()
  },

getAlarmList(){
  utils.myRequest({
    url:'localserver/getAlarmList',
    method:'GET'
  }).then(res =>{ 
      const data = res.data.message 
      this.transfertime(data)
      console.log(data)
      this.setData({
        alarmList:data
      })
  })

},
 transfertime(req){
  for(var i = 0 ; i < req.length; i++){
    const date = new Date(req[i].time)
    const month = date.getMonth() + 1; 
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const formattedString = `${month}月${day}日${hour}:${minute}`;
    req[i].time = formattedString
  }

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