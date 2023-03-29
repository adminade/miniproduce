// pages/addpig/addpig.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    housecate:[],
    houseindex:null,
    range:null,
    cate:['饮食','饮水','体温','运动量','重量'],
    cateEn:['eat','drink','tempu','run','intimeWeight'],
    cateindex:null,
    user:null,
    time:null
  },
  bindPickerChange(e){
    // console.log(e.detail.value)
    this.setData({
      houseindex:e.detail.value
    })
  },
  bindPickerChange_cate(e){
    this.setData({
      cateindex:e.detail.value
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
this.getcate();
  },

//获取时间  
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
submit(e){
//检验数据
var data = e.detail.value
console.log(data)
if (!data.number) {
  wx.showToast({
    title: '设备号为空',
    icon: 'none'
  })
  return
}
if (!this.data.houseindex) {
  wx.showToast({
    title: '请选择栏舍',
    icon: 'none'
  })
  return
}
if (!this.data.cateindex) {
  wx.showToast({
    title: '请选择类别',
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

// Check if age, weight, and number are numbers


// 生成对象


// console.log(this.data.housecate[this.data.houseindex].id)
var houseCateId = this.data.housecate[this.data.houseindex].HouseCate
var houseCate = {houseCateId}
var deviceCate = this.data.cateEn[this.data.cateindex]
var pigCateId ={deviceCate}
// console.log(pigCateId)
// console.log(houseCateId)
const Data = {...data,...pigCateId,...houseCate}
console.log(Data)

//发起请求，提交数据
utils.myRequest({
  url:`localserver/addDevice`,
  method:'POST',
  data:Data
}).then(res =>{
  if(res.data.message =='not unique'){
    wx.showModal({
      title: '',
      content: '已有该编号，请检查',
      complete: (res) => {
        if (res.cancel) {
          
        }
        if (res.confirm) {
              }
      }
    })
  }
  else if(res.data.message == 'ok'){
    wx.showToast({
      title: '添加成功',
      icon:'success'
    })
  }
  else wx.showToast({
    title: '添加失败',
    icon:'error'
  })
  console.log(res)

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