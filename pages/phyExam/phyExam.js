// pages/phyExam/phyExam.js
const utils =require('../../utils/utils')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tag:0,
    histroyList:[],
    histroyListSearch:[],
    border:[0,0,0,0,0],
    showIndex:0,
    old:0
    },

move(e){
  console.log(e.currentTarget.dataset.move)
  const index =e.currentTarget.dataset.move
  const oldindex = this.data.old
if( oldindex != index)
{
  if(this.data.border[oldindex] !=0)
   {
     this.data.border[oldindex] =0
     this.setData({
      border: this.data.border,
    })
   }
   this.setData({
    old:index
  })

}
this.setData({
  ['border[' + index + ']']: 'border-bottom:2px solid green',
  showIndex:index
});

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
    //清空搜索列表
    that.setData({
      histroyListSearch:[]
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
   },1000)
   },
   getSearchNumber(number){
    //  console.log(number)
     const data = this.data.histroyList
     console.log(data)
     var i =0 ;
     for ( i = 0 ; i < data.length; i++){
      //  console.log(data[i].pigNumber)
        if(data[i].pigNumber == number){
          console.log('yes!!')
          this.setData({
            histroyListSearch:[...this.data.histroyListSearch,data[i]]
          })
          return
        }
     }
     console.log(this.data.histroyListSearch)
     if(i == data.length){
       wx.showToast({
         title: '没找到该耳号记录',
         icon:'error',
         duration:500
       })
       setTimeout(() => {
        this.setData({
          tag: 0,
          histroyListSearch:[]
        })
      }, 1200) // 延迟 500ms 执行 setData() 方法
     }
   },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getdata()
  },

  getdata(){
    utils.myRequest({
      url:`localserver/getPhyExam`,
      method:'GET'
    }).then(res =>{ 
      for (let i = 0 ; i < res.data.message.length;i++)
        for(let j = 0; j< res.data.message[i].length;j++)
        {this.transformTime(res.data.message[i][j])}
        console.log(res.data.message)
        this.setData({
        histroyList:res.data.message
      })

    })


  },

  transformTime(req){
      //时间转换
      // this.time(req[i].time)
      const date = new Date(req.time)
      const month = date.getMonth() + 1; 
      const day = date.getDate();
      const hour = date.getHours();
      const minute = date.getMinutes();
      const formattedString = `${month}月${day}日${hour}:${minute}`;
      req.time = formattedString
  
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