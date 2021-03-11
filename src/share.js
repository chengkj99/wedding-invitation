
import Vue from 'vue'

const share = {
  install: function () {
    Vue.mixin({
      onShareAppMessage: function (res) {
        console.log('##onShareAppMessage:', res)
        return {
          title: '程康健和王国微的婚礼邀请函',
          path: '/pages/index/main'
        }
      },
      onShareTimeline(res) {
        console.log('##onShareTimeline:', res)
        return {
          title: '程康健 & 王国微：我们结婚啦~',
          path: '/pages/index/main'
        }
      }
    })
  }
}

export default share
