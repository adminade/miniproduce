// component/menu.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    image:{
      type:String,
      value:''
    },
    text:{
      type:String,
      value:''
    }

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

  },
  lifetimes: {
    created() {
      console.log('组件被创建')
    },
    attached() {
      console.log('组件被添加到页面')
      
    }
  }
})
