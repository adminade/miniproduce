// pages/addDeseaseDairy/addDeseaseDairy.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housecate:[],
    houseindex:null,
    user:null,
    time:null
  },
  submit(e){
    console.log(e.detail.value)
    const data = e.detail.value
    //检查耳号是否存在
    utils.myRequest({
      url:'localserver/checkPigNumber',
      method:'POST',
      data:{pigNumber:data.pigNumber}
    }).then(res =>{
      // console.log(res.data)
      if(res.data.message == 'ok'){

            utils.myRequest({
              url:'localserver/adddeseaseDairy',
              method:'POST',
              data:{pigNumber:data.pigNumber,time:data.comeTime,user:data.user,detail:data.explain}
            }).then(resullt =>{
              console.log(resullt)
              if(resullt.data.message == 'all_ok'){
                wx.showToast({
                  title: '添加记录成功',
                  icon:'success'
                })
              }
              else wx.showToast({
                title: '添加失败',
                icon:'error'
              })
            })
      }
      else {
        wx.showToast({
          title: '没有该耳号',
          icon:'error'
        })
      }
    })

    
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user:app.globalData.user
    })
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