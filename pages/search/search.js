// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timer:null, 
    kw:'',
    searchResullt:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */

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
     that.setData({
       kw: e.detail.value
     }) 
      that.getSearchList(e.detail.value)
    },500)
    },
  getSearchList(kw){
    const that =this
    if(kw == ''){
      that.setData({
        searchResullt:[]
      })
      return 
    }
    console.log(`kw:${kw}`)
     wx.request({
      
      url: `http://127.0.0.1/localserver/keywordSearch/?kw=${kw}`,
      method:'GET',
      success:function(res){
        console.log("send success")
        // console.log(res)
        if(res.data ==''){
         wx.showToast({
           title: '未找到该猪病',
           icon:'error'
         })
        }
        else{
          // console.log(res.data)
          that.setData({
            searchResullt:res.data
          })
          console.log(`kwyyy:${that.data.kw}`)
        }
      },
      fail:(res) =>{
        console.log(res)
      }
    })

  },
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