// app.js
// const utils =require('../../utils/utils')

App({
  
  globalData: {
    pageInstance: null,
    userInfo: null,
    token:'',
    brand:'瓦窑堡养殖场',
    homeList:[['保育猪舍1栏','保育猪舍3栏'],['育肥猪舍1栏','育肥猪舍2栏']],
    user:'黄磊',
    phone:null,
    countName:null,
    cateCount:null,
    // SocketTask = wx.connectSocket({  url: 'wx://127.0.0.1:3000'})

  },

  appmethod(){
    console.log("aapp.js")
    this.loadGlobaleData()
  },

  requestSms(){

      }

})
