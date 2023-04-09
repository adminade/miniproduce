import * as echarts from '../../ec-canvas/echarts';
const utils =require('../../utils/utils')
const app = getApp()
Page({
  onShareAppMessage: function (res) {
    return {
      title: 'ECharts 可以在微信小程序中使用啦！',
      path: '/pages/index/index',
      success: function () { },
      fail: function () { }
    }
  },
  data: {
    cateCount:null,
    cateSum:[],
    fitScore:null,
    fitCate:[],
    thingsList:[] ,
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        // barChart.setOption(getBarOption());
        getBarOption().then(option => {
          barChart.setOption(option);
        }).catch(err => {
          console.log(err);
        });

        return barChart;
      }
    },
    ecPie:{
      onInit:function(canvas,width,height,dpr){
        const pieChart = echarts.init(canvas,null,{
          width:width,
          height:height,
          devicePixelRatio:dpr
        });
        canvas.setChart(pieChart)
        pieChart.setOption(getPieoption(this))
      }
    },

    ecgauge:{
      onInit:function(canvas,width,height,dpr){
        const gaugeChart =echarts.init(canvas,null,{
          width:width,
          height:height,
          devicePixelRatio:dpr
        });
        canvas.setChart(gaugeChart)
        gaugeChart.setOption(getGaugeChart())
      }
    }
    


  },
  onShow(options){
        this.getdata()
  },
  onLoad(options) {
        app.globalData.pageInstance = this;
        this.getdata()
        this.getFitScore()
        this.getAralm()
        // this.getFitCate()
        // 将 Page 实例保存为全局变量 
        
      },

goto_deseasezhenduan(){
  wx.navigateTo({
    url: '/pages/deseasePredict/deseasePredict',
  })
},


getAralm(){
  utils.myRequest({
    url:'localserver/getAlarm',
    method:'GET'
  }).then(res =>{ 
    // this.gettag(res.data.message)
    console.log(res.data.message)
    this.setData({
      thingsList:[...this.data.thingsList,...res.data.message.slice(0, 3)]
    })
  })


},
//getFitscore
  getFitScore(){
    utils.myRequest({
      url:`localserver/getFitScore`,
      method:'GET'
    }).then(res =>{
      // console.log(res.data.message)
      this.setData({
        fitScore:100-res.data.message
      })
    })
  },
//getFitCate
  getFitCate(){
    const that =this 
    utils.myRequest({
      url:`localserver/getFitCate`,
      method:'GET'
    }).then(res =>{
      console.log(res.data.message)
      that.setData({
        fitCate:[...this.data.fitCate,res.data.message]
      })
    })
  },

  //  获取数据
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
        this.setData({

          cateCount:cateCount
        
        })
      }
     
    })
    
  },

  onReady() {
  }
});

function getGaugeChart(Page){
  const pageInstance = app.globalData.pageInstance;
  console.log(pageInstance.data.fitScore)
  return{
    title: {
      text: '健康度',
      // subtext: 'Fake Data',
      left: 'left'
    },
    series: [{
      name: '业务指标',
      type: 'gauge',
      radius:'50%',
      center:['20%','40%'],
      progress:{
        show:true,
        itemStyle:{
          color:'#1684fc'
        }
      },
      
    startAngle: 0,
    endAngle: 360,
      splitLine:{show:false},
      axisTick:{
        show:false
      },
      axisLabel:{
        show:false
      },
       pointer:{
         show:false
       },
      detail: {
        formatter: '{value}分',
        fontSize:14,
        offsetCenter:['0','50%']
      },
      axisLine: {
        show: true
      },
      data: [{
        value: pageInstance.data.fitScore,
        // name: '完成率',
        detail:{
          offsetCenter: ["0", "0%"]
        }
      }]

    }]
  }

}


function getPieoption(Page){
  const that =this 
  utils.myRequest({
    url:`localserver/getFitScore`,
    method:'GET'
  }).then(res =>{
    // console.log(res.data.message)
    // that.setData({
    //   fitScore:100-res.data.message
    // })
  })
  const pageInstance = app.globalData.pageInstance;
  console.log(pageInstance.data.cateCount['1'])
return{
  title: {
    text: '猪只统计',
    // subtext: 'Fake Data',
    left: 'left'
  },
  tooltip: {
    trigger: 'item'
  },
  // legend: {
  //   orient: 'vertical',
  //   left: 'left'
  // },
  series: [
    { 
      label:{
        show:true,
        position:'inside',
        formatter: '{b} : {c}'
      },
      name: 'Access From',
      type: 'pie',
      radius: ['20%', '50%'],
      center:['80%','30%'],
      data: [
        { value: pageInstance.data.cateCount['1'], name:'公猪', itemStyle: {
          color: '#5087ec'
        }},
        { value: pageInstance.data.cateCount['2'], name: '母猪',itemStyle: {
          color: '#68bbc4' 
        }},
        { value: pageInstance.data.cateCount['3'], name: '商品猪',itemStyle: {
          color: '#58a55c' 
        } },
      ],
      emphasis: {
        itemStyle: {
          shadowBlur: 10,
          shadowOffsetX: 0,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        }
      }
    }
  ]
}






}

function getBarOption(Page) {
  return new Promise((resolve, reject) => {
  const that =this
  utils.myRequest({
    url:`localserver/getFitCate`,
    method:'GET'
  }).then(res =>{
    console.log(res.data.message)
    // that.setData({
    //   fitCate:[...this.data.fitCate,res.data.message]
    // })
    const score = app.globalData.pageInstance;
    var pageInstance =res.data.message
    console.log("pageinstance:\n")
    console.log(pageInstance)
     for (let i = 0; i < pageInstance.length; i++) {
       // Add the second and third element of the current item and set it as the fourth element
       pageInstance[i][3] =0-(pageInstance[i][1] + pageInstance[i][2]) ;
     }
     const yAxisData = pageInstance.map(item => item[0]); // extract first element of each subarray
     const seriesData = pageInstance.map(item => [item[1], item[2], item[3]]); // extract second, third, and fourth elements of each subarray
     const option =  {
       tooltip: {
         trigger: 'axis',
         axisPointer: {
           type: 'shadow'
         }
       },
       legend: {
         data: ['监控项', '疾病诊断', '健康值']
       },
       grid: {
         left: 20,
         right: 20,
         bottom: 15,
         top: 40,
         containLabel: true
       },
       xAxis: [
         {
           type: 'value',
           axisLine: {
             lineStyle: {
               color: '#999'
             }
           },
           axisLabel: {
             color: '#666'
           }
         }
       ],
       yAxis: [
         {
           type: 'category',
           axisTick: { show: false },
           data: yAxisData,
           axisLine: {
             lineStyle: {
               color: '#999'
             }
           },
           axisLabel: {
             color: '#666'
           }
         }
       ],
       series: [
         {
           name: '监控项',
           type: 'bar',
           stack: '总量',
           label: {
             normal: {
               show: true,
               position: 'inside'
             }
           },
           data: seriesData.map(item => item[0])
         },
         {
           name: '疾病诊断',
           type: 'bar',
           label: {
             normal: {
               show: true
             }
           },
           data: seriesData.map(item => item[1])
         },
         {
           name: '健康值',
           type: 'bar',
           stack: '总量',
           label: {
             normal: {
               show: true,
               position: 'left'
             }
           },
           data: seriesData.map(item => item[2])
         }
       ]
     };
     resolve(option)
    })
  }).catch(err =>{
    console.log(err);
    reject(err);
  })

}

