// pages/transferHistory/transferHistory.js
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:0,
    histroyList:[],
    histroyListSearch:[]


  },
  goto_addHouse(){
    wx.navigateTo({
      url: '/todayDairy/pages/addHouse/addHouse',
    })
  },
  input(e){
    const that = this
    //清除对应的延时器
   console.log(this)
    clearTimeout(this.timer)
   //重新启动一个延时器
   that.timer = setTimeout( () =>{
     //如果500ms内没有触发新的输入事件，则为关键词赋值
    console.log(e.detail.value)
   //  console.log(that)
   if(e.detail.value != ""){
    that.setData({
      tag: 1
    }) 
     that.getSearchNumber(e.detail.value)
   }
   else {
     //返回初始状态
     this.setData({
       tag:0,
       histroyListSearch:[]
     })
   }
   },500)
   },
   getSearchNumber(number){
    //  console.log(number)
     const data = this.data.histroyList
     console.log(data)
     var i =0 ;
     for ( i = 0 ; i < data.length; i++){
       console.log(data[i].pigNumber)
        if(data[i].pigNumber == number){
          console.log('yes!!')
          this.setData({
            histroyListSearch:[...this.data.histroyListSearch,data[i]]
          })
        }
     }
     console.log(this.data.histroyListSearch)
     if(this.data.histroyListSearch == ''){
       wx.showToast({
         title: '没找到该耳标',
         icon:'error',
         duration:500
       })
       setTimeout(() => {
        this.setData({
          tag: 0
        })
      }, 1200) // 延迟 500ms 执行 setData() 方法
     }
   },
   goto_addTransfer(){
     wx.navigateTo({
       url: '/todayDairy/pages/addTransfer/addTransfer',
     })
   },





  /**
   * 生命周期函数--监听页面加载
   */



  onLoad(options) {
    this.getdata()
  },
  getdata(){
    utils.myRequest({
      url:`localserver/transferHistory`,
      method:'GET'
    }).then(res =>{
      console.log(res.data)
      var i = 0;
      for (i = 0; i< res.data.message.length; i++){
        res.data.message[i].time = res.data.message[i].time.slice(0,10)
      }
      this.setData({
        histroyList:[...this.data.histroyList,...res.data.message]
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