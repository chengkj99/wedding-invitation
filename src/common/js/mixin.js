export default {
  data () {
    return {
      show: false
    }
  },
  methods: {
    showLoading () {
      wx.showLoading({
        title: '正在加载中...',
        mask: true
      })
      this.show = false
    },
    hideLoading (delay = 0) {
      wx.hideLoading()
      setTimeout(() => {
        this.show = true
      }, delay)
    }
  }
}
