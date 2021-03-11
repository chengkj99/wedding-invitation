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
innerAudioContext.autoplay = true
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
