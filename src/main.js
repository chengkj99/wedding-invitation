import './animate.wxss'
// import './index.css'
import Vue from 'vue'
import App from './App'
import share from './share'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'ckj-wgw-wedding-1gzc32fv0fb3d8bc'
})

const app = new Vue(App)
app.$mount()

Vue.prototype.globalData = getApp().globalData
let innerAudioContext = wx.createInnerAudioContext()
innerAudioContext.loop = true
app.globalData.innerAudioContext = innerAudioContext
app.globalData.musics = []
app.globalData.index = 1
app.globalData.animations = [
  `bounce`,
  `flash`,
  `pulse`,
  `rubberBand`,
  `shake`,
  `headShake`,
  `swing`,
  `tada`,
  `wobble`,
  `jello`,
  `bounceIn`,
  `bounceInDown`,
  `bounceInLeft`,
  `bounceInRight`,
  `bounceInUp`,
  `fadeIn`,
  `fadeInDown`,
  `fadeInDownBig`,
  `fadeInLeft`,
  `fadeInLeftBig`,
  `fadeInRight`,
  `fadeInRightBig`,
  `fadeInUp`,
  `fadeInUpBig`,
  `flipInX`,
  `flipInY`,
  `lightSpeedIn`,
  `rotateIn`,
  `rotateInDownLeft`,
  `rotateInDownRight`,
  `rotateInUpLeft`,
  `rotateInUpRight`,
  `jackInTheBox`,
  `rollIn`,
  `zoomIn`,
  `zoomInDown`,
  `zoomInLeft`,
  `zoomInRight`,
  `zoomInUp`,
  `slideInDown`,
  `slideInLeft`,
  `slideInRight`,
  `slideInUp`,
  `heartBeat`
]
app.globalData.showShareMenu = function () {
  wx.showShareMenu({
    withShareTicket: true,
    menus: ['shareAppMessage', 'shareTimeline']
  })
}
Vue.use(share)

const db = wx.cloud.database()
const music = db.collection('music')
music.get().then(res => {
  app.globalData.musics = res.data
  innerAudioContext.src = app.globalData.musics[0].musicUrl
})

// 相册数据提前加载？
// const banner = db.collection('banner')
// banner.get().then(res => {
//   const bannerList = res.data[0].bannerList
//   let list = []
//   for (let i = 0; i < bannerList.length; i++) {
//     let show = i === 0
//     list.push({
//       url: bannerList[i],
//       show: show
//     })
//   }
//   app.globalData.bannerlist = list
// })

app.globalData.getOpenId = function () {
  return wx.cloud
    .callFunction({
      name: 'user',
      data: {}
    })
    .then(res => {
      console.log('### getOpenId:', res)
      let openId = res.result.openid
      app.globalData.openId = res.result.openid
      return openId
    })
}
// app.globalData.hasUserInfo = async function () {
//   // let openId = ''
//   // if (this.globalData['openId']) {
//   //   openId = this.globalData['openId']
//   // }
//   let openId = await app.globalData.getOpenId()
//   console.log('### openId::', openId)
//   let res = await wx.cloud
//     .database()
//     .collection('visitor')
//     .where({
//       _openid: openId
//     })
//     .get()
//     .catch(err => console.log(err))

//   console.log('### visitor::', res, res.data.length)
//   if (res && res.data.length > 0) {
//     console.log('switchTab pages/index/')

//     this.globalData.userInfo = res.data[0].userInfo
//     wx.switchTab({
//       url: '/pages/index/main',
//       success: res => {
//         console.log('success', res)
//       },
//       fail: err => {
//         console.log('fail', err)
//       }
//     })
//     return true
//   } else {
//     wx.redirectTo({ url: '/pages/auth/main' })
//     return false
//   }
// }
