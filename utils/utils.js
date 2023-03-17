const baseUrl ='http://127.0.0.1/'
export const myRequest = (options) =>{
  let header ={

		// "Content-Type": "application/json",
		"Authorization": wx.getStorageSync('token')
		// "client_time_sign": new Date().setMonth(new Date().getMonth() - 6) / 1000 * 1.24,
		// "md": !wx.getStorageSync('loginUser') || wx.getStorageSync('loginUser')=="" ?
		// 	wx.getStorageSync('fy_password') : JSON.parse(wx.getStorageSync('fy_password')).password
  }
  return new Promise((resolve,reject) =>{
    wx.request({
      url: baseUrl + options.url,
      method: options.method || 'POST',
      header:header,
      data:options.data || {},

      success:(res) =>{
        resolve(res)
        if(res.data.message =='身份认证失败'){
          wx.showToast({
            title: 'token值错误,请重新登录',
            icon:'none'
          })
        }
      },
      fail:(err) =>{
        wx.showToast({
          title: '请求接口失败',
        })
        reject(err)
      }
    })
  })


}