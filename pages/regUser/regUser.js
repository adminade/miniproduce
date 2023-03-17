// pages/regUser/regUser.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    load:false
  },  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },
  formSubmit:function(e){
    var that = this;
    var countName = e.detail.value.countName;
    var pwd =  e.detail.value.password;
    var userName = e.detail.value.userName;
    var phone = e.detail.value.phone;
    var brand = e.detail.value.brand;
    if(!countName || !pwd || !userName || !phone || !brand){
      wx.showModal({
        title: '提示',
        content: ' 信息不能为空,请检查！',
        showCancel:false,
        confirmColor:'#338FFc',
        success:function(res){
          if(res.confirm)
          console.log('用户点击确认');
        },
      })
    }
    //更改绑定按钮loading状态
    that.setData({
      load:true
    })
    wx.request({
      url: 'http://127.0.0.1/api/localserver/regUser',
      method:'POST',
      data:{
        countName:countName,
        pwd:pwd,
        userName:userName,
        phone:phone,
        brand:brand
      },
      success:function(res){
        console.log(res.data);
      }
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