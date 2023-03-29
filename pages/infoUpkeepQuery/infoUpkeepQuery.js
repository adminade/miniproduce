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
    desease_record_time:null,
    housecate:[]

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
            this.setData({
              input_value:null,
              pigHouse:null,
              cate:null,
              com_time:null,
              com_weight:null,
              now_weight:null,
              inject_record:null,
              desease_history:null,
              desease_record_time:null,
              housecate:[]
            })
            return
          }
          console.log(res)
          var i = 0;
          for(i = 0;i <this.data.housecate.length;i++)
            {
              if(this.data.input_value == this.data.housecate[i].id)
                this.setData({
                pigHouse:this.data.housecate[i].HouseCate     
                })
            }
          var cate =['公猪','母猪','商品猪']  

          this.setData({
            cate: cate[this.data.input_value-1],
            com_time: res.data.message.comeTime.substring(0, 10), // 只显示日期部分
            com_weight: res.data.message.comeWeight,
            now_weight: res.data.message.last_tizhong,
            inject_record: res.data.message.injectRecord,
            desease_history: res.data.message.deseaseHistory,
            desease_record_time: res.data.message.last_deseaseHistory_time // 只显示日期部分

          })
        })
  },
getHousecate(){
  utils.myRequest({
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
    // const Range = this.data.housecate.map(item => item.HouseCate)
    // // console.log(Range)
    // this.setData({
    //   range:Range
    // })
console.log(this.data.housecate)

  })


},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
this.getHousecate()
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