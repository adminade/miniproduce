// pages/infoUpkeep/infoUpkeep.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    brand:null,
    total_number:211,
    female:null,
    goods:null,
    male:null,
    homeList:null,
    pigCate:null
  },


  goto_info_query(){
    wx.navigateTo({
      url: '/pages/infoUpkeepQuery/infoUpkeepQuery',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      brand:app.globalData.brand
    })
    this.getdata()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
  },

  getdata(){
    utils.myRequest({
      url:`localserver/cateNumber`,
      method:'GET'
    }).then(res =>{
      if(res.data.message === "no"){
        wx.showToast({
          title: '无该编号信息',
          icon:'none'
        })
        return
      }
      else {
        // console.log(res.data.message)
        const houseCateCount = [];
        const cateCount = {};
        
        res.data.message.forEach(({ HouseCate, cate }) => {
          const houseCateIndex = houseCateCount.findIndex((item) => item[0] === HouseCate);
        
          if (houseCateIndex !== -1) {
            houseCateCount[houseCateIndex][1]++;
          } else {
            houseCateCount.push([HouseCate, 1]);
          }
        
          if (cateCount[cate]) {
            cateCount[cate]++;
          } else {
            cateCount[cate] = 1;
          }
        });
        
        const totalCount = res.data.message.length;
        console.log(houseCateCount)
        const results = houseCateCount;
        // 使用 reduce() 方法将查询结果拆分成一个二维数组
        const data = results.reduce((acc, cur) => {
          const house = cur[0].split('猪舍')[0] + '猪舍';
          const index = acc.findIndex(item => item[0] === house);
          if (index === -1) {
          console.log(cur)

            acc.push([house, cur]);
          } else {
            // acc[index][1] += [cur];
            acc[index].push(cur)
          }
          return acc;
        }, []);
        // console.log(data);


        this.setData({
          total_number:totalCount,
          homeList:data,
          pigCate:cateCount
        
        })
        app.globalData.homeList=data
        //先进行这个页面的展示，监控页面才有信息
        app.globalData.cateCount=cateCount

      }
     
    })
    
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