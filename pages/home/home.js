// pages/home/home.js
const app = getApp()
const utils =require('../../utils/utils')

// 创建app.js的应用实例
// const app = getApp();
// Page({//xxx//xxxxonLoad(options) {// 将SocketTask对象解构出来const { globalData: { SocketTask } } = app;// 监听服务端消息SocketTask.onMessage((data)=> {console.log("websocket服务端发来的消息",data);})}
// })


Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'黄磊',
    phone:'18325125535',
    brand:'瓦窑堡养殖场',
    date:'2023-3-14',
    thingsList:[],
  alarmTime:'2023-1-1:20:48',
  touchtime:0
  },
//websocket
//xxx//xxxxonLoad(options) {// 将SocketTask对象解构出来const { globalData: { SocketTask } } = app;// 监听服务端消息SocketTask.onMessage((data)=> {console.log("websocket服务端发来的消息",data);})}


  addone(){
    console.log('be done')
    this.setData({
      tingsList: [...this.data.tingsList,{tag:0,text:'12猪圈疑似换狂犬'}]
    })
  },
touchstart(event){
this.setData({
  touchtime:event.timeStamp
})

},
touchend(event){
  var that = this
  var index = event.currentTarget.dataset.index;
  const touchEndTime = event.timeStamp;
  console.log('end'+touchEndTime)
  const touchstartTime = this.data.touchtime;
  if(touchEndTime - touchstartTime > 500){
    that.longPress(index)
  }
},

longPress(location){
  const that = this
  console.log(location)
  wx.showModal({
    title: '',
    showCancel:true,
    content: '确认删除该消息吗',
    success:(res)=>{
      if(res.confirm === true){
        //使用展开运算符号，删除数组中下标为i的元素
        that.setData({
          thingsList:[...that.data.thingsList.slice(0,location),...that.data.thingsList.slice(location+1)]
        })
        console.log('be done')
      }
     console.log(res.confirm) 
    }
  })
 

},
//页面跳转路由

goto_phyExam(){
  wx.navigateTo({
    url: '/pages/phyExam/phyExam',
  })
},

goto_envMoniter(){
  wx.navigateTo({
    url: '/pages/envMoniter/envMoniter',
  })

},
goto_deviceManage(){
  wx.navigateTo({
    url: '/pages/deviceManage/deviceManage',
  })
},

goto_desase_resoure(){
  wx.navigateTo({
    url: '/pages/desease_resourse/desease_resourse',
  })
},
goto_infoUpkeep(){
  wx.navigateTo({
    url: '/pages/infoUpkeep/infoUpkeep',
  })

},

goto_dairy(){
  wx.navigateTo({
    url: '/todayDairy/pages/dairy/dairy',
  })
},

goto_deseasePredict(){
  wx.navigateTo({
    url: '/pages/deseasePredict/deseasePredict',
  })
},
goto_lookevent(){
  wx.navigateTo({
    url: '/pages/lookevent/lookevent',
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getAralm()
  this.getGlobalData()
  this.longPolling()
  },

  //获取aralm列表----- and监听数据库列表 ,
  getAralm(){
    utils.myRequest({
      url:'localserver/getAlarm',
      method:'GET'
    }).then(res =>{ 
      this.gettag(res.data.message)
      console.log(res.data.message)
      this.setData({
        thingsList:[...this.data.thingsList,...res.data.message]
      })
    })


  },



  //计算tag等级 +时间转换
  gettag(req){
    // console.log("req"+req)
    for(var i = 0 ; i < req.length; i++){
      if(req[i].bz1 <=20) req[i].bz2 = 1
      else if (req[i].bz1 > 20 && req[i].bz1 <= 40) req[i].bz2 = 2
      else if (req[i].bz1 > 40 && req[i].bz1 <= 60) req[i].bz2 = 3
      else  req[i].bz2 = 4 
      //时间转换
      // this.time(req[i].time)
      const date = new Date(req[i].time)
      const month = date.getMonth() + 1; 
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedString = `${month}月${day}日${hour}:${minute}`;
      req[i].time = formattedString
  
    }
  },



    //长轮询
   longPolling() {
     const that =this
    let header ={
      "Authorization": wx.getStorageSync('token')
    }
    wx.request({
      url: 'http://127.0.0.1/localserver/getAlarm',
      method:'GET',
      header:header,
      success: (res) => {
        // 处理接收到的数据
        // console.log('收到服务器数据：', res.data)
        // 对比最新的数据检查id是否相同
        // const index = res.data.message.length-1
        const index =0
        console.log('长度'+res.data.message.length)
        const data = res.data.message[index]
        console.log('data:')
        console.log(data)
        //如果id不同，更新消息
        if(data.id != that.data.thingsList[index].id){
          console.log('更新了最新数据')
          //计算tag
          // var liststr = []
          // liststr[0]=res.data.message[index]
          // console.log('list'+liststr)
          this.gettag(res.data.message)
          // console.log(res.data.message[index])
          // that.setData({
          //   thingsList:[res.data.message[index],...that.data.thingsList.slice(0,this.data.thingsList.length-1)]
          // })
          that.setData({
            thingsList:res.data.message
          })
        }
        else {console.log('数据相同，未更新')}
      },
      fail: (res) => {
        console.log('请求失败')
        console.log(res)
      },
      complete:() =>{
        setTimeout(()=>{
          // console.log('开始了')
          this.longPolling()
        }, 120000);
      }
    })
  },

  
  //获取全局变量  
  getGlobalData(){
    utils.myRequest({
      url:'localserver/getUserInfo',
      method:'GET'
    }).then(res =>{
    console.log(res.data.message)    
    const data =res.data.message
    app.globalData.user=data.userName
    app.globalData.brand = data.brand
    app.globalData.phone = data.phone
    app.globalData.countName=data.countName

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