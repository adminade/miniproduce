// pages/aticleDetail/aticleDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    query:[],
    aticleList:[],
    imageList :[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      query:options
    })
this.getAticleList()
// this.setImageList()  
},
  getAticleList(){
    const that = this
      wx.request({
        url: `http://127.0.0.1/api/localserverManage/aticleList/?name=${this.data.query.title}`,
        method:'GET',
        success:function(res){
          console.log(res.data)
          that.setData({
            articleList:res.data
          })
          that.setImageList()
        }
      })

  },

  setImageList(){
    const that = this 
      var str =[]
      str[0] = 'https://www.likeastar.top/image/' + this.data.articleList.bz +'1.png'  //服务器存放图片地址
      str[1] = 'https://www.likeastar.top/image/' + this.data.articleList.bz +'2.png'  //服务器存放图片地址
      str[2] = 'https://www.likeastar.top/image/' + this.data.articleList.bz +'3.png'  //服务器存放图片地址
      console.log('str地址'+str)
      that.setData({
        imageList: [...this.data.imageList,...str]
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