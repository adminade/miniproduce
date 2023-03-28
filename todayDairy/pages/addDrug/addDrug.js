// todayDairy/pages/addDrug/addDrug.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    drugcate:[],
    drugindex:null,
    pigNumberList:[],
    pigindex:null,
    user:null,
    time:null
  },
  submit(e){
    // console.log(e)
    //检查输入
    var data =e.detail.value 
    if (!this.data.pigindex) {
      wx.showToast({
        title: '请选择耳号',
        icon: 'none'
      })
      return
    }
    if (!this.data.drugindex) {
      wx.showToast({
        title: '请选择疫苗类型',
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
    var pigId = this.data.pigNumberList[this.data.pigindex].pigNumber
    var drugcate = this.data.drugcate[this.data.drugindex]
    pigId = {pigId}
    drugcate = {drugcate}
    const Data ={...data,...pigId,...drugcate}
    console.log(Data) 
    utils.myRequest({
      url:`localserver/addDrugDairy`,
      method:'POST',
      data:Data
    }).then(res =>{
    console.log(res.data.message) 
      if(res.data.message =='ok')
      wx.showToast({
        title: '添加记录成功',
        icon:'success'
      })
      else{
        wx.showToast({
          title: '添加记录失败',
        })
      }
  })


  },

  bindPickerChange(e){
    //设置选中耳标的下标
    this.setData({
      pigindex:e.detail.value
    })
  },
  bindOutPickerChange(e){
    //设置选中类型下标
    this.setData({
      drugindex:e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      user:app.globalData.user
    })
    this.gettime();   
    this.getpigNumber(); 
    this.getDrugs();
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
  getpigNumber(){
    utils.myRequest({
      //返回数据： [0]  housecat index就是housecate的类别 
  /*  若删除了某个housecate，在显示的时候有影响吗
  */ 
  
      url:`localserver/getPigNumber`,
      method:'GET'
    }).then(res =>{
    console.log(res.data.message)
    var data = res.data.message
    var i = 0
    for( i = 0; i < data.length ; i++){
      this.setData({
        pigNumberList:[...this.data.pigNumberList,data[i]]
      })
    }
    const Range = this.data.pigNumberList.map(item => item.pigNumber)
    // console.log(Range)
    this.setData({
      range:Range
    })

    })
  },
  getDrugs(){

    utils.myRequest({
      //返回数据： [0]  housecat index就是housecate的类别 
  /*  若删除了某个housecate，在显示的时候有影响吗
  */ 
  
      url:`localserver/getDrugs`,
      method:'GET'
    }).then(res =>{
    console.log(res.data.message)
    var data = res.data.message
    var i = 0
    for( i = 0; i < data.length ; i++){
      this.setData({
        drugcate:[...this.data.drugcate,data[i]]
      })
    }
    const RangedrugCate = this.data.drugcate.map(item => item.drugs)
    // console.log(Range)
    this.setData({
      RangedrugCate:RangedrugCate
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