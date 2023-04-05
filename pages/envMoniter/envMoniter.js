// pages/envMoniter/envMoniter.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  /*
  housecate  存储 id housecate  数据表数据
  housePigSum 存储  每个house的pig总数
  houseName 存储 猪舍类别

  */
  data: {
      housecate:[],
      houseindex:null,
      housePigSum:[],
      houseName:[],
      tempu:'--',
      weat:'--',
      NH3:'--',
      CO2:'--',
      homeList:[],
      homePig:[],
      env:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  bindPickerChange(e){
    // console.log(e.detail.value)
    this.setData({
      houseindex:e.detail.value
    })
    //发请求获取参数数据
    const house = this.data.houseName[this.data.houseindex]
    // console.log(house)
    utils.myRequest({
      url:`localserver/getenv`,
      method:'POST',
      data:{house:house}
    }).then(res =>{ 
        const data = res.data.message
        if(data  == '')
        {
          this.setData({
            tempu:'--',
            CO2:'--',
            NH3:'--',
            weat:'--'
          })
          wx.showModal({
            title: '',
            content: '无该舍设备信息',
            complete: (res) => {
              if (res.cancel) {
                
              }
          
              if (res.confirm) {
                
              }
            }
          })  
        }
       else {
        var i = 0;
         for (i = 0; i < data.length ;i ++)
          {
            if(data[i].device == 1)
              this.setData({
                weat:data[i].value
              })
            if(data[i].device == 2)
            this.setData({
              tempu:data[i].value
            }) 
            if(data[i].device == 4)
            this.setData({
              CO2:data[i].value
            })
            if(data[i].device == 5)
            this.setData({
              NH3:data[i].value
            })
            }


        this.setData({
          env:[...this.data.env,...data]
        })
       }

    })

  },
  onLoad(options) {
    this.gethousecate(),
    this.getPigSum()
  },
  gethousecate(){
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
      console.log(this.data.housecate)
      const houseCateList = this.data.housecate
      // console.log(houseCateList)
      // 定义分类规则及计数器
    const categoryRules = {}; // 使用对象来存储分类规则和计数器

// 遍历 houseCateList，根据分类规则统计数量 
    houseCateList.forEach((item) => {
      const houseCate = item.HouseCate;
      const pattern = /(.*猪舍)(\d+)/; // 匹配以 XX猪舍 开头的字符串和数字部分
      const match = pattern.exec(houseCate);
      if (match) { // 如果匹配成功
        const name = match[1];
        const num = parseInt(match[2]);
        if (!isNaN(num)) { // 如果能成功解析数字
          if (!categoryRules[name]) { // 如果该分类规则不存在
            categoryRules[name] = num; // 添加新的分类规则
          } else {
            categoryRules[name] += num; // 累加数量
          }
        }
      }
      else console.log('no match')
    });

    // 生成分类结果数组
    const result = Object.keys(categoryRules)
      .map((name) => ({[name]: categoryRules[name]}));

    console.log(result); // 输出结果
    this.setData({
      housePigSum:[...this.data.housePigSum,...result]
    })
    //添加到range
    var i =0;
    const keys = result.map(obj => Object.keys(obj)[0]);
    const values = result.map(obj => Object.values(obj)[0]);
    this.setData({
      houseName:[...this.data.houseName,...keys]
    })

    })


    utils.myRequest({
      url:`localserver/cateNumber`,
      method:'GET'
    }).then(res =>{
        console.log(res.data.message)
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
        // console.log(cateCount);
        const results = houseCateCount;
        // 使用 reduce() 方法将查询结果拆分成一个二维数组
        const data = results.reduce((acc, cur) => {
          const house = cur[0].split('猪舍')[0] + '猪舍';
          const index = acc.findIndex(item => item[0] === house);
          if (index === -1) {
          console.log(cur)

            acc.push([house, cur]);
          } else {
            acc[index].push(cur)
          }
          return acc;
        }, []);
        console.log(data)
        this.setData({
          homeList:data
        })
        //栏数 猪总数
        const resu = data.map(([name, ...columns]) => [name, columns.length, columns.reduce((acc, [, count]) => acc + count, 0)]);

        console.log(resu); // 输出 [[猪舍名字, 栏数, 猪头数], [猪舍名字, 栏数, 猪头数], ...]
        this.setData({
          homePig:[...this.data.homePig,...resu]
        })
        console.log('over')



    })
  },

  getPigSum(){
  //   const data =this.data.homeList
  //   console.log('hi')
  //   console.log(data)
  // //   var i = 0 ,j = 0;
  // //   var resullt =[]
  // //   for( i = 0; i< data.length ; i++){
  // //       resullt[i][0]=data[i][0]
  // //   }
  // //   console.log(resullt)
  // const result = data.map(([name, ...columns]) => [name, columns.length, columns.reduce((acc, [, count]) => acc + count, 0)]);

  // console.log(result); // 输出 [[猪舍名字, 栏数, 猪头数], [猪舍名字, 栏数, 猪头数], ...]
  // console.log('over')


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