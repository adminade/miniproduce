// pages/home/home.js
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:'黄磊',
    phone:'18325125535',
    brand:'瓦窑堡养殖场',
    date:'2023-3-14',
    tingsList:[{
      tag:1,
      text:'2号圈CO2浓度过高'
    },
    { tag:0,
      text:'11号猪圈疑似鬼上身'

    },
    { tag:1,
      text:'1号猪圈疑似咳嗽'

    }
  ],
  alarmTime:'2023-1-1:20:48',
  touchtime:0
  },
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
  console.log(location)
  wx.showModal({
    title: '',
    showCancel:true,
    content: '确认删除该消息吗',
    success:(res)=>{
      if(res.confirm === true){
        // var thingList =this.data.tingsList;
        // thingList.splice(location,1)
        /* thingsList 数组是被直接修改的，而没有使用 setData 方法来更新数据。在微信小程序中，如果需要更新数据，必须使用 setData 方法来触发页面重新渲染。*/
       
        //使用展开运算符号，删除数组中下标为i的元素
        this.setData({
          tingsList:[...this.data.tingsList.slice(0,location),...this.data.tingsList.slice(location+1)]
        })
        console.log('be done')
        // 判断紧急事件为0级时候，发送短信提醒用户  @!!!!!!!!!!!!!
        // utils.myRequest({
        //   url:'utils/localserver/requestSMS',
        //   method:'GET',
        //   data:{}
        // }).then(res =>{
        //   console.log(res.data)
        // })
      }
     console.log(res.confirm) 
    }
  })
 

},
//页面跳转路由
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

  /**
   * 生命周期函数--监听页面加载
   */
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