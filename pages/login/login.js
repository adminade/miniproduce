// pages/login/login.js
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
    var user = e.detail.value.user;
    var pwd =  e.detail.value.password;
    if(!user || !pwd){
      wx.showModal({
        title: '提示',
        content: '账号密码不能为空哦！',
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
      url: 'http://127.0.0.1/api/localserver/login',
      method:'POST',
      data:{
        user:user,
        pwd:pwd
      },
      success:function(res){
        if(res.data.message === '密码错误'){
          wx.showToast({
            title: '密码错误',
            icon:'error',
            duration:1000
          })
        }
        else if(res.data.message === '账户不存在'){
          wx.showToast({
            title: '账户不存在',
            icon:'error',
            duration:1000
          })
        }
        else if(res.data.token){
          console.log("zhixing")
            wx.switchTab({
              url: '/pages/home/home',
            }),
          console.log(res.data.token)  
          wx.setStorage({
            key:'token',
            data:res.data.token,
            success:() =>{
              console.log('storage success')
            }
          })
        }
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