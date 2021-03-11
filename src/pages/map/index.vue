<template>
  <div class="map">
    <image
      mode="aspectFit"
      class="head-img"
      src="../../static/images/t1.png"
      @tap="toNav"
      @click="toNav"
    />
    <map
      class="content"
      id="map"
      title="山东临沂郯城经济开发区维也纳酒店"
      :longitude="markers[0].longitude"
      :latitude="markers[0].latitude"
      :markers="markers"
      scale="18"
      :enable-3D="true"
      :enable-building="true"
      @tap="toNav"
    >
    </map>
    <div class="call">
      <div class="left" @tap="linkHe">
        <image src="../../static/images/he.png" />
        <span>呼叫新郎</span>
      </div>
      <div class="right" @tap="linkShe">
        <image src="../../static/images/she.png" />
        <span>呼叫新娘</span>
      </div>
    </div>
    <image class="footer" src="../../static/images/grren-flower-line.png" />
  </div>
</template>

<script>
// import QQMap from 'common/js/qqmap-wx-jssdk.js'
export default {
  name: 'Map',
  data() {
    return {
      // qqSdk: '',
      markers: [
        {
          iconPath: '../../static/images/position4.png',
          id: 0,
          width: 20,
          height: 20,
          latitude: '34.630501',
          longitude: '118.306248',
          name: '山东郯城经济开发区维也纳酒店贵宾厅',
          callout: {
            content: '山东郯城经济开发区维也纳酒店贵宾厅',
            color: '#333333',
            fontSize: 13,
            borderRadius: 20,
            bgColor: '#ffffff',
            textAlign: 'center',
            padding: 10,
            display: 'ALWAYS'
          }
        }
      ]
    }
  },
  onLoad() {
    const that = this
    const db = wx.cloud.database()
    const common = db.collection('common')
    this.globalData.showShareMenu()
    common.get().then(res => {
      that.heNumber = res.data[0].heNumber
      that.sheNumber = res.data[0].sheNumber
      that.markers[0].latitude = res.data[0].location.latitude
      that.markers[0].longitude = res.data[0].location.longitude
    })
  },
  methods: {
    toNav() {
      wx.openLocation({
        latitude: Number(this.markers[0].latitude),
        longitude: Number(this.markers[0].longitude),
        scale: 18
      })
    },
    linkHe() {
      wx.makePhoneCall({
        phoneNumber: this.heNumber
      })
    },
    linkShe() {
      wx.makePhoneCall({
        phoneNumber: this.sheNumber
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.map {
  height: 100%;
  background: #fff;

  .head-img {
    width: 100%;
    height: 180rpx;
    margin-bottom: 50rpx;
  }

  .content {
    width: 690rpx;
    margin-left: 30rpx;
    height: 600rpx;
    margin-bottom: 30rpx;
    border-radius: 16rpx;
  }

  .call {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin-bottom: 20rpx;

    .left, .right {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      image {
        height: 64rpx;
        width: 64rpx;
      }

      span {
        height: 50rpx;
        line-height: 50rpx;
        font-size: 24rpx;
        color: #6B4F4E;
      }
    }
  }

  .footer {
    height: 80rpx;
    width: 716rpx;
    margin-left: 17rpx;
  }
}
</style>
