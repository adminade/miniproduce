// pages/deviceManage/deviceManage.js
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filter:1,
    tag:0,
    deviceList:[],
    deviceName:{tempu:'温度',eat:'饮食',drink:'饮水',run:'运动',intimeWeight:'重量'},
    filterShow:{tempu:1,eat:1,drink:1,run:1,intimeWeight:1},
    histroyListSearch:[]
  },
  goto_addDevice(){
    wx.navigateTo({
      url: '/pages/addDevice/addDevice',
    })
  },

  //搜索功能
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
     const data = this.data.deviceList
     console.log(data)
     var i =0 ;
     for ( i = 0 ; i < data.length; i++){
       console.log(data[i].deviceId)
        if(data[i].deviceId == number){
          console.log('yes!!')
          this.setData({
            histroyListSearch:[...this.data.histroyListSearch,data[i]]
          })
          return  // 修正BUG
        }
     }
     console.log(this.data.histroyListSearch)
     if(i == data.length){
       wx.showToast({
         title: '没找到该编号',
         icon:'error',
         duration:500
       })
       setTimeout(() => {
        this.setData({
          tag: 0,
          histroyListSearch:[]   //修正BUG
        })
      }, 1200) // 延迟 500ms 执行 setData() 方法
     }
   },




  // 点击按钮放下过滤框
  pulldown(){
    this.setData({
      filter:1
    })
  },

  //收起过滤框
  pullup(e ){
    const data = e.currentTarget.dataset.type 
    console.log(e.currentTarget.dataset.type)
    if(data == 'all'){
      this.setData({
        filterShow:{tempu:1,eat:1,drink:1,run:1,intimeWeight:1}
      })
    }
    else if(data == 'eat') {
      this.setData({
        filterShow:{tempu:0,eat:1,drink:0,run:0,intimeWeight:0}   
      })

    }
    else if(data == 'drink') {
      this.setData({
        filterShow:{tempu:0,eat:0,drink:1,run:0,intimeWeight:0}   
      })

    }
    else if(data == 'run') {
      this.setData({
        filterShow:{tempu:0,eat:0,drink:0,run:1,intimeWeight:0}   
      })

    }

    else if(data == 'intimeWeight') {
      this.setData({
        filterShow:{tempu:0,eat:0,drink:0,run:0,intimeWeight:1}   
      })

    }
    else if(data == 'tempu') {
      this.setData({
        filterShow:{tempu:1,eat:0,drink:0,run:0,intimeWeight:0}   
      })

    }


      console.log(this.data.filterShow)


    this.setData({
      filter:0
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
      url:`localserver/getDeviceStatus`,
      method:'GET'
    }).then(res =>{
    console.log(res.data.message)
    this.setData({
      deviceList:[...this.data.deviceList,...res.data.message]
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