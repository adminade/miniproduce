// pages/deseasePredict/deseasePredict.js
const utils =require('../../utils/utils')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    items:[
      {
        // 导航名称
        text: '发病年龄',
        cname:'age',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '所有年龄段',
            cname:'a1',
            // id，作为匹配选中状态的标识
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '所有年龄段尤其是幼崽',
            cname:'a2',
            id: 2,
          },
          {
            // 名称
            text: '母猪',
            cname:'a3',
            // id，作为匹配选中状态的标识
            id: 3,
          },
          {
            // 名称
            text: '所有年龄段尤其是新生崽猪',
            // id，作为匹配选中状态的标识
            cname:'a4',
            id: 4,
          },
          {
            // 名称
            text: '所有年龄段，尤其是10日内仔猪',
            // id，作为匹配选中状态的标识
            cname:'a5',
            id: 5,
          },
          {
            // 名称
            text: '所有年龄段，尤其是2-5月内仔猪',
            // id，作为匹配选中状态的标识
            cname:'a6',
            id: 6,
          },
          {
            // 名称
            text: '所有年龄段尤其是1月龄',
            // id，作为匹配选中状态的标识
            cname:'a7',
            id: 7,
          },
          {
            // 名称
            text: '所有年龄段，尤其是5-6周龄',
            // id，作为匹配选中状态的标识
            cname:'a8',
            id: 8,
          },
          {
            // 名称
            text: '所有年龄段，尤其是 3-5月龄',
            // id，作为匹配选中状态的标识
            cname:'a9',
            id:9,
          },
        ],
      },
      {
        // 导航名称
        text: '呼吸方式',
        cname:'breath',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '呼吸急促',
            // id，作为匹配选中状态的标识
            cname:'b1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '腹式呼吸',
            cname:'b2',
            id: 2,
          },
          {
            // 名称
            text: '呼吸困难',
            // id，作为匹配选中状态的标识
            cname:'b3',
            id: 3,
          },
          {
            // 名称
            text: '浅表性呼吸',
            // id，作为匹配选中状态的标识
            cname:'b4',
            id: 4,
          }
        ],
      },
      {
        // 导航名称
        text: '皮肤',
        cname:'skin',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '紫红色出血斑点',
            // id，作为匹配选中状态的标识
            cname:'s1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '四肢皮肤紫斑或坏死痂',
            cname:'s2',
            id: 2,
          },
          {
            // 名称
            text: '皮肤和蹄子上出现水泡和溃疡、水泡',
            // id，作为匹配选中状态的标识
            cname:'s3',
            id: 3,
          },
          {
            // 名称
            text: '四肢皮肤出现短暂的“斑点”样充血或发绀',
            // id，作为匹配选中状态的标识
            cname:'s4',
            id: 4,
          },
          {
            // 名称
            text: '眼睑和嘴角水肿、腹部有粟粒大紫色斑点',
            // id，作为匹配选中状态的标识
            cname:'s5',
            id: 5,
          },
          {
            // 名称
            text: '耳根、颈部及腹下部等处皮肤变成蓝紫色',
            // id，作为匹配选中状态的标识
            cname:'s6',
            id: 6,
          },
          {
            // 名称
            text: '耳、四肢下端与腹下有紫红色或出血性红斑',
            // id，作为匹配选中状态的标识
            cname:'s7',
            id: 7,
          },
          {
            // 名称
            text: '关节炎或头颈部水肿',
            // id，作为匹配选中状态的标识
            cname:'s8',
            id: 8,
          },
          {
            // 名称
            text: '眼睑和脸部水肿',
            // id，作为匹配选中状态的标识
            cname:'s9',
            id: 9,
          },
          {
            // 名称
            text: '皮肤排出物增多，肤色呈红色或铜色。',
            // id，作为匹配选中状态的标识
            cname:'s10',
            id: 10,
          },
          {
            // 名称
            text: '出现红斑、丘疹',
            // id，作为匹配选中状态的标识
            cname:'s11',
            id: 11,
          }
        ],
      },
      {
        // 导航名称
        text: '口鼻分泌物',
        cname:'mouth',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '病猪口鼻流出泡沫样液体',
            // id，作为匹配选中状态的标识
            cname:'m1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '鼻炎',
            cname:'m2',
            id: 2,
          },
          {
            // 名称
            text: '持续性咳嗽',
            // id，作为匹配选中状态的标识
            cname:'m3',
            id: 3,
          },
          {
            // 名称
            text: '打喷嚏',
            // id，作为匹配选中状态的标识
            cname:'m4',
            id: 4,
          },
          {
            // 名称
            text: '鼻流浆液黏液脓性渗出物',
            // id，作为匹配选中状态的标识
            cname:'m5',
            id: 5,
          }
        ],
      },
      {
        // 导航名称
        text: '粪便次数',
        cname:'sheet',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '先便干后腹泻',
            // id，作为匹配选中状态的标识
            cname:'sh1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '大便干、腹泻交替出现',
            cname:'sh2',
            id: 2,
          },
          {
            // 名称
            text: '呕吐、腹泻',
            // id，作为匹配选中状态的标识
            cname:'sh3',
            id: 3,
          },
          {
            // 名称
            text: '便秘',
            // id，作为匹配选中状态的标识
            cname:'sh4',
            id: 4,
          },
          {
            // 名称
            text: '呕吐，接着急剧水样腹泻',
            // id，作为匹配选中状态的标识
            cname:'sh5',
            id: 5,
          },
          {
            // 名称
            text: '水样腹泻，并伴有呕吐现象',
            // id，作为匹配选中状态的标识
            cname:'sh6',
            id: 6,
          },
          {
            // 名称
            text: '腹泻',
            // id，作为匹配选中状态的标识
            cname:'sh7',
            id: 7,
          }
        ],
      },
      {
        // 导航名称
        text: '粪便颜色',
        cname:'sheetColor',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '灰黄色',
            // id，作为匹配选中状态的标识
            cname:'sc1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '黄绿色或灰色，或呈白色，含凝乳块',
            cname:'sc2',
            id: 2,
          },
          {
            // 名称
            text: '粪便稀且呈黄色或灰黄色',
            // id，作为匹配选中状态的标识
            cname:'sc3',
            id: 3,
          },
          {
            // 名称
            text: '粪便呈黄色糨糊状',
            // id，作为匹配选中状态的标识
            cname:'sc4',
            id: 4,
          },
          {
            // 名称
            text: '排出白色、灰白色或黄白色糨糊样粪便',
            // id，作为匹配选中状态的标识
            cname:'sc5',
            id: 5,
          },
          {
            // 名称
            text: '干燥',
            // id，作为匹配选中状态的标识
            cname:'sc6',
            id: 6,
          },
          {
            // 名称
            text: '黄色至灰色的软便',
            // id，作为匹配选中状态的标识
            cname:'sc7',
            id: 7,
          }
        ],
      },
      {
        // 导航名称
        text: '精神状态',
        cname:'nervious',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '精神沉郁',
            // id，作为匹配选中状态的标识
            cname:'n1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '昏睡、鸣叫',
            cname:'n2',
            id: 2,
          },
          {
            // 名称
            text: '精神萎靡，眼窝下陷',
            // id，作为匹配选中状态的标识
            cname:'n3',
            id: 3,
          },
          {
            // 名称
            text: '精神沉郁、四肢呈游泳状',
            // id，作为匹配选中状态的标识
            cname:'n4',
            id: 4,
          },
          {
            // 名称
            text: '脱水',
            // id，作为匹配选中状态的标识
            cname:'n5',
            id: 5,
          },
          {
            // 名称
            text: '拱背',
            // id，作为匹配选中状态的标识
            cname:'n6',
            id: 6,
          },
          {
            // 名称
            text: '长伏卧、步态缓慢无力',
            // id，作为匹配选中状态的标识
            cname:'n7',
            id: 7,
          },
          {
            // 名称
            text: '卧地不能站立',
            // id，作为匹配选中状态的标识
            cname:'n8',
            id: 8,
          },
          {
            // 名称
            text: '痉挛、抽搐',
            // id，作为匹配选中状态的标识
            cname:'n9',
            id: 9,
          }
        ],
      },
      {
        // 导航名称
        text: '眼结膜',
        cname:'eye',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '发炎',
            // id，作为匹配选中状态的标识
            cname:'ey1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '眼结膜潮红',
            cname:'ey2',
            id: 2,
          },
          {
            // 名称
            text: '膜发绀',
            // id，作为匹配选中状态的标识
            cname:'ey3',
            id: 3,
          },
          {
            // 名称
            text: '结膜充血',
            // id，作为匹配选中状态的标识
            cname:'ey4',
            id: 4,
          }
        ]
      },
      {
        // 导航名称
        text: '饮食',
        cname:'eat',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '食欲不振',
            // id，作为匹配选中状态的标识
            cname:'e1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '食欲废绝',
            cname:'e2',
            id: 2,
          }
        ]
      },
      {
        // 导航名称
        text: '体温',
        cname:'tempu',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '36-37度',
            // id，作为匹配选中状态的标识
            cname:'t1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '37-38度',
            cname:'t2',
            id: 2,
          },
          {
            // 名称
            text: '38-39度',
            // id，作为匹配选中状态的标识
            cname:'t3',
            id: 3,
          },
          {
            // 名称
            text: '39-40度',
            // id，作为匹配选中状态的标识
            cname:'t4',
            id: 4,
          },
          {
            // 名称
            text: '40-41度',
            // id，作为匹配选中状态的标识
            cname:'t5',
            id: 5,
          }
        ]
      },
      {
        // 导航名称
        text: '体重',
        cname:'weight',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '不变',
            // id，作为匹配选中状态的标识
            cname:'w1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '下降',
            cname:'w2',
            id: 2,
          }
        ]
      },
      {
        // 导航名称
        text: '运动量',
        cname:'exercise',
        // 导航名称右上角徽标，1.5.0 版本开始支持
        // badge: 3,
        // 是否在导航名称右上角显示小红点，1.5.0 版本开始支持
        dot: false,
        // 禁用选项
        disabled: false,
        // 该导航下所有的可选项
        children: [
          {
            // 名称
            text: '下降',
            // id，作为匹配选中状态的标识
            cname:'r1',
            id: 1,
            // 禁用选项
            // disabled: true,
          },
          {
            text: '断绝',
            cname:'r2',
            id: 2,
          },
          {
            // 名称
            text: '上升',
            // id，作为匹配选中状态的标识
            cname:'r3',
            id: 3,
          }
        ]
      },
      
    ],
    mainActiveIndex: 0,
    activeId: [],
    max: 2,
    innerIndex:0,
    cate:[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]],
    pigNumberList:[],
    pigindex:null,
    predict_resullt:null,
    tag:0,
    tag2:1
  },
  submit(){
    //每次点击的时候，清除状态
    this.setData({
      predict_resullt:null
    })
    const that =this
    if(this.data.pigindex ==null)
    {
      wx.showToast({
        title: '请输入耳号',
        icon:'error'
      })
      return
    }
    const pigNumber = this.data.pigNumberList[this.data.pigindex].pigNumber
    var resullt ={}
    var i = 0
    for (const cate of this.data.cate){
      // console.log(this.data.items[i])
      let key = this.data.items[i].cname
      for(const id of cate)
        for(const item of this.data.items[i].children)
        {
          if(item.id == id){
            if(resullt[key] ===undefined){
              resullt[key] = item.cname    
            }
            else 
            resullt[key] = item.cname+'|'+resullt[key]
          }
        }
      i++
    }
    let key='pigNumber'
    resullt[key] =pigNumber
   console.log(resullt)
   utils.myRequest({
    url:`localserver/zhenduan`,
    method:'POST',
    data:resullt
  }).then(res =>{ 
    console.log(res.data.message)
    //发送消息后，显示诊断结果框
    this.setData({
      tag:1
    })

    //再长轮询获取resullt，获取到message，就return,耗时1s左右
    that.longPolling()
  })



  },

  
    //长轮询
    longPolling() {
    const pigNumber = this.data.pigNumberList[this.data.pigindex].pigNumber
    const that =this
     let header ={
       "Authorization": wx.getStorageSync('token')
     }
     wx.request({
       url: `http://127.0.0.1/localserver/getPredictRes/?pigNumber=${pigNumber}`,
       method:'GET',
       header:header,
       success: (res) => {
          const data = res.data.message   
          console.log(data)           
          if (data == null) {
            // show loading 
            if(this.data.tag2 == 0){
              this.setData({
                tag2:1
              })
            }
          }
          else {
            //hidden loading 
            this.setData({
              tag2:0
            })            
            this.setData({
              predict_resullt:data
            })
          }
       },
       fail: (res) => {
         console.log('请求失败')
         console.log(res)
       },
       complete:() =>{
        if(this.data.predict_resullt != null){
          return
        } 
        else 
        setTimeout(()=>{
           // console.log('开始了')
           this.longPolling()
         }, 100);
       }
     })
   },









  onClickNav({ detail = {} }) {
    //切换类别的时候，更新innnerindex，mainActiveIndex,和类别下的acticeId,需要结构出来
    this.setData({
      mainActiveIndex: detail.index || 0,
      innerIndex:0,
      activeId:[...this.data.cate[detail.index]]
    });
    console.log('cateId',detail.index)
  },

  onClickItem({ detail = {} }) {
    const { activeId } = this.data;
    const {cate}  =this.data;


    const index = activeId.indexOf(detail.id);
    if (index > -1) {
      //删除
      activeId.splice(index, 1);
      let outindex = cate[this.data.mainActiveIndex].indexOf(detail.id)
      cate[this.data.mainActiveIndex].splice(outindex,1)
      // this.setData({
      //   innerIndex:this.data.innerIndex-1
      // })
    } else {
      //更新
      activeId.push(detail.id);
 
      console.log('done+',detail.id)
      cate[this.data.mainActiveIndex].push(detail.id)
       }

    this.setData({ activeId,cate });
    // this.setData({cate})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getpigNumber(); 
    this.watcher = this.watch(this.data, 'pigindex', this.onPigNumberChange)
  },

  getpigNumber(){
    utils.myRequest({
      //返回数据： [0]  housecat index就是housecate的类别 
  /*  若删除了某个housecate，在显示的时候有影响吗
  */ 
  
      url:`localserver/getPigNumber`,
      method:'GET'
    }).then(res =>{
    // console.log(res.data.message)
    var data = res.data.message
    var i = 0
    for( i = 0; i < data.length ; i++){
      this.setData({
        pigNumberList:[...this.data.pigNumberList,data[i]]
      })
    }
    const Range = this.data.pigNumberList.map(item => item.pigNumber)
    // console.log(Range)
    this.setData({
      range:Range
    })

    })
  },
  bindPickerChange(e){
    //设置选中耳标的下标
    this.setData({
      pigindex:e.detail.value
    })
  },

  onPigNumberChange: function (newVal, oldVal) {
    console.log(`pigNumber changed from ${oldVal} to ${newVal}`)
    // 在这里采取相应的行动
    this.setData({
      tag:0,
      predict_resullt:null,
      activeId:[],
      cate:[[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0],[0]]
    })
  },

  watch: function (obj, key, onChange) {
    let val = obj[key]
    Object.defineProperty(obj, key, {
      configurable: true,
      enumerable: true,
      set: function (value) {
        val = value
        onChange(value, val)
      },
      get: function () {
        return val
      }
    })
    return {
      dispose: function () {
        Object.defineProperty(obj, key, {
          value: val,
          writable: true
        })
      }
    }
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
    this.watcher.dispose()
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