// pages/addHouse/addHouse.js
const utils =require('../../utils/utils')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    houseList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  submit(e){
    // console.log(e.detail.value.houseName)
    const houseName = e.detail.value.houseName
    if(houseName == '')
    return
    utils.myRequest({
      url:`localserver/addHouse`,
      method:'POST',
      data:{HouseCate:houseName}
    }).then(res =>{
      console.log(res)
      if(res.data.message === 'exited'){
        wx.showToast({
          title: '已存在该栏舍',
          icon:'error'
        })
      }
      else if(res.data.message == 'add success'){
        wx.showToast({
          title: '添加成功',
          icon:'success'
        })
        //再次更新数据
        this.getdata()
      }
    })
  },


  deleteHouse(e){
    const index = e.target.dataset.index 
    // console.log(e.target.dataset.index)
    if(this.data.houseList[index].totalCount != 0 ){
      wx.showToast({
        title: '该栏舍还有猪',
        icon:'error'
      })
    }
    else{
      wx.showModal({
        title: '',
        content: '确认删除吗？',
        complete: (res) => {
          if (res.cancel) {
            return
          }  
          if (res.confirm) {
            utils.myRequest({
              url:`localserver/deleteHouse`,
              method:'POST',
              data:{index:this.data.houseList[index].id}
            }).then(res =>{
              console.log(res)
              this.setData({
                houseList:[...this.data.houseList.slice(0,index),...this.data.houseList.slice(index+1)]
              })  
              if(res.data.message === 'del success')
                    {wx.showToast({
                      title: '删除成功',
                      icon:'success',
                      duration:500
                    })
                  }
              else{
                console.log(res.data.message)
                wx.showToast({
                  title: '删除失败',
                  icon:'error'
                })
              }
                })
          }
        }
      })


    }
  },

  onLoad(options) {
  this.getdata()
  },

getdata(){
  utils.myRequest({
    url:`localserver/getCatepigSum`,
    method:'GET'
  }).then(res =>{
  // console.log(res.data.message)
  this.setData({
    houseList:[...this.data.houseList,...res.data.message]
  })
  console.log(this.data.houseList)
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