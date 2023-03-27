// pages/infoUpkeepQuery/infoUpkeepQuery.js
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    input_value:null,
    pigHouse:null,
    cate:null,
    com_time:null,
    com_weight:null,
    now_weight:null,
    inject_record:null,
    desease_history:null,
    desease_record_time:null

  },
  input(e){
    // console.log(e.detail.value)
    this.setData({
      input_value:e.detail.value
    })  //有数据只是控制台没更新
  },
  query(){
    const that =this 
        utils.myRequest({
          url:`utils/localserver/upkeepQuery?value=${that.data.input_value}`,
          method:'GET'
        }).then(res =>{
          if(res.data.message === "no"){
            wx.showToast({
              title: '无该编号信息',
              icon:'none'
            })
            return
          }
          console.log(res)
          this.setData({
            // pigHouse:res.data.message.pigHouse,
            // cate:res.data.message.cate,
            // com_time:res.data.message.comeTime,
            // com_weight:res.data.message.comWeight,
            // now_weight:res.data.message.last_tizhong,
            // inject_record:res.data.message.inject_record,
            // desease_history:res.data.message.deseaseHistory,
            // desease_record_time:res.data.message.last_deseaseHistory_time
            pigHouse: res.data.message.pigHouse,
            cate: res.data.message.cate,
            com_time: res.data.message.comeTime.substring(0, 10), // 只显示日期部分
            com_weight: res.data.message.comeWeight,
            now_weight: res.data.message.last_tizhong,
            inject_record: res.data.message.injectRecord,
            desease_history: res.data.message.deseaseHistory,
            desease_record_time: res.data.message.last_deseaseHistory_time // 只显示日期部分

          })
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