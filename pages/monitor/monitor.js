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
    ecBar: {
      onInit: function (canvas, width, height, dpr) {
        const barChart = echarts.init(canvas, null, {
          width: width,
          height: height,
          devicePixelRatio: dpr // new
        });
        canvas.setChart(barChart);
        barChart.setOption(getBarOption());

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
        // 将 Page 实例保存为全局变量 
        app.globalData.pageInstance = this;
        this.getdata()
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


function getGaugeChart(){
  return{
    title: {
      text: '健康模型',
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
        value: 88,
        // name: '完成率',
        detail:{
          offsetCenter: ["0", "0%"]
        }
      }]

    }]
  }

}


function getPieoption(Page){
  const pageInstance = app.globalData.pageInstance;
  console.log(pageInstance.data.cateCount['1'])
const that = this
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


function getBarOption() {
  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: {            // 坐标轴指示器，坐标轴触发有效
        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
      }
    },
    legend: {
      data: ['热度', '正面', '负面']
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
        data: ['汽车之家', '今日头条', '百度贴吧', '一点资讯', '微信', '微博', '知乎'],
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
        name: '热度',
        type: 'bar',
        label: {
          normal: {
            show: true,
            position: 'inside'
          }
        },
        data: [300, 270, 340, 344, 300, 320, 310]
      },
      {
        name: '正面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true
          }
        },
        data: [120, 102, 141, 174, 190, 250, 220]
      },
      {
        name: '负面',
        type: 'bar',
        stack: '总量',
        label: {
          normal: {
            show: true,
            position: 'left'
          }
        },
        data: [-20, -32, -21, -34, -90, -130, -110]
      }
    ]
  };
}

function getScatterOption() {

  var data = [];
  var data2 = [];

  for (var i = 0; i < 10; i++) {
    data.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 40)
      ]
    );
    data2.push(
      [
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100),
        Math.round(Math.random() * 100)
      ]
    );
  }

  var axisCommon = {
    axisLabel: {
      textStyle: {
        color: '#C8C8C8'
      }
    },
    axisTick: {
      lineStyle: {
        color: '#fff'
      }
    },
    axisLine: {
      lineStyle: {
        color: '#C8C8C8'
      }
    },
    splitLine: {
      lineStyle: {
        color: '#C8C8C8',
        type: 'solid'
      }
    }
  };

  return {
    backgroundColor: '#eee',
    xAxis: axisCommon,
    yAxis: axisCommon,
    legend: {
      data: ['aaaa', 'bbbb']
    },
    visualMap: {
      show: false,
      max: 100,
      inRange: {
        symbolSize: [20, 70]
      }
    },
    series: [{
      type: 'scatter',
      name: 'aaaa',
      data: data
    },
    {
      name: 'bbbb',
      type: 'scatter',
      data: data2
    }
    ],
    animationDelay: function (idx) {
      return idx * 50;
    },
    animationEasing: 'elasticOut'
  };
}
