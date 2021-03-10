<template>
    <div class="photo">
      <image class="bg-image" :src="background"/>
      <h-swiper :list="list" :isGif="isGif"></h-swiper>
      <!-- <IndexSwiper :list="list" :info="{}"></IndexSwiper> -->
    </div>
</template>

<script>
import HSwiper from 'components/swiper'
// import IndexSwiper from 'components/indexSwiper'
// import imgData from 'common/json/imgData.json'
export default {
  name: 'Photo',
  components: {
    HSwiper
    // IndexSwiper
  },
  onLoad () {
    this.getList()
    const db = wx.cloud.database()
    const common = db.collection('common')
    common.get().then(res => {
      this.background = res.data[0].background
    })
  },
  onShow () {
    // const that = this
    // that.isGif = !that.isGif
    // that.getList()
  },
  data () {
    return {
      list: [],
      isGif: false,
      background: ''
    }
  },
  methods: {
    getList () {
      const that = this
      const db = wx.cloud.database()
      const banner = db.collection('banner')
      banner.get().then(res => {
        const bannerList = res.data[0].bannerList
        let list = []
        for (let i = 0; i < bannerList.length; i++) {
          let show = i === 0
          list.push({
            url: bannerList[i],
            show: show
          })
        }
        that.list = list
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.photo
    height 100%
</style>
