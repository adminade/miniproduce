// pages/countDetail/countDetail.js
const app = getApp()
const utils =require('../../utils/utils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:null,
    countName:null,
    phone:null,
    password:null,
    examcode:null
  },

  /**
   * 生命周期函数--监听页面加载
   */

   sendsms(){
     console.log('hi')
     utils.myRequest({
      url:'localserver/getExamCode',
      method:'GET'
    }).then(res =>{
      console.log(res.data.message)
      this.setData({
        examcode:res.data.message
      })
      console.log(typeof(res.data.message))
  })




   },
   submit(e){
    const data = e.detail.value
    let key = 'countName'
    data[key] = this.data.countName
    // data.smscode = parseInt(data.smscode)
    console.log(data)
    if(!data.smscode){
      wx.showToast({
        title: '请输入验证码',
        icon:'error'
      })
      return
    }
    if(data.smscode != this.data.examcode){
      wx.showToast({
        title: '错误验证码',
        icon:'error'
      })
      return
    }


    utils.myRequest({
        url:'localserver/updateUser',
        method:'POST',
        data:data
      }).then(res =>{
        console.log(res.data.message)
        if(res.data.message == 'ok')
        wx.showToast({
          title:'更新成功！',
          icon:'success'
        })
        else wx.showToast({
          title: '更新失败',
        })
    })




   },
  onLoad(options) {
    this.getdata()
  },

getdata(){
  this.setData({
    brand:app.globalData.brand,
    countName:app.globalData.countName,
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