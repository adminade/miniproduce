// pages/addTransfer/addTransfer.js
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
  bindPickerChange(e){
    // console.log(e.detail.value)
    this.setData({
      houseindex:e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
submit(e){
  console.log(e.detail.value)
  const data = e.detail.value
  //判断错误
  if (!this.data.houseindex) {
    wx.showToast({
      title: '请选择栏舍',
      icon: 'none'
    })
    return
  }
  if (!data.number) {
    wx.showToast({
      title: '耳号为空',
      icon: 'none'
    })
    return
  }
  if (!data.user) {
    wx.showToast({
      title: '操作人为空',
      icon: 'none'
    })
    return
  }
  if (isNaN(data.number)) {
    wx.showToast({
      title: '耳号必须是数字',
      icon: 'none'
    })
    return
  }
  
  //检查是否有该耳号
  utils.myRequest({
    url:`localserver/checkPigNumber`,
    method:'POST',
    data:{pigNumber:e.detail.value.number}
  }).then(res =>{
    console.log(res.data)
    if(res.data.message == 'nopigNumber'){
      wx.showToast({
        title: '无该耳号',
        icon:'error'
      })
      return
    }
  })
  //提交数据
  utils.myRequest({
    url:`localserver/addTransfer`,
    method:'POST',
    data:{pigNumber:data.number,housecate:this.data.housecate[this.data.houseindex].HouseCate,time:data.comeTime,user:data.user,reason:data.reason}
  }).then(res =>{
    console.log(res.data)
    if(res.data.message =='ok'){
      wx.showToast({
        title: '添加成功',
        icon:'success'
      })
    }
  })
},

  onLoad(options) {
    this.setData({
      user:app.globalData.user
    })
    this.gettime();    
    this.getcate();
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
   getcate(){

    utils.myRequest({
      //返回数据： [0]  housecat index就是housecate的类别 
  /*  若删除了某个housecate，在显示的时候有影响吗
  */ 
  
      url:`localserver/getCate`,
      method:'GET'
    }).then(res =>{
      // console.log(res.data.message[0])
      var data =res.data.message[0]
      var i = 0,j = 0;
      for( i = 0; i < data.length ; i++){
        this.setData({
          housecate:[...this.data.housecate,data[i]]
        })
      }
      const Range = this.data.housecate.map(item => item.HouseCate)
      // console.log(Range)
      this.setData({
        range:Range
      })
  
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