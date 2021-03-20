<template>
  <div class="auth">
    <div class="auth-wrapper" v-if="show">
      <image class="image" src="../../static/images/wechat.png" />
      <p class="title">微信授权页面</p>
      <p class="tips">此页面是微信授权页面，点击下方按钮弹出授权或跳转页面</p>
      <button
        class="auth-button"
        type="primary"
        size="mini"
        open-type="getUserInfo"
        @getuserinfo="doGetUserInfo"
      >
        授权微信头像和昵称
      </button>
    </div>
  </div>
</template>

<script>
import mixin from '../../common/js/mixin'
export default {
  name: 'Auth',
  mixins: [mixin],
  data() {
    return {}
  },
  onShow() {
    this.showLoading()
    this.hasUserInfo()
  },
  methods: {
    hasUserInfo: async function () {
      let that = this
      let openId = ''
      if (this.globalData['openId']) {
        openId = this.globalData['openId']
      } else {
        openId = await this.globalData.getOpenId()
      }

      let res = await wx.cloud
        .database()
        .collection('visitor')
        .where({
          _openid: openId
        })
        .get()
        .catch(err => console.log(err))

      if (res && res.data.length > 0) {
        wx.switchTab({ url: '/pages/index/main' })
        return true
      } else {
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success: function (res) {
                  that.onSaveUserInfo(res.userInfo)
                }
              })
            } else {
              this.hideLoading()
            }
          },
          fail: err => {
            console.log('getSetting err', err)
            this.hideLoading()
          }
        })
        return false
      }
    },
    doGetUserInfo(e) {
      let that = this
      if (e.target.errMsg === 'getUserInfo:ok') {
        wx.getUserInfo({
          success: function (res) {
            that.onSaveUserInfo(res.userInfo)
          }
        })
      }
    },
    onSaveUserInfo(userInfo) {
      const db = wx.cloud.database()
      const visitor = db.collection('visitor')
      visitor
        .add({
          data: {
            user: userInfo
          }
        })
        .then(() => {
          wx.switchTab({ url: '/pages/index/main' })
        })
    }
  }
}
</script>

<style scoped lang="stylus">
.auth {
  position: relative;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  height: 100%;

  .auth-wrapper {
    margin-top: -15%;
    height: 60%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
    align-items: center;
  }

  .title, .tips {
    font-size: 15px;
  }

  .tips {
    width: 78%;
    text-align: center;
    color: gray;
  }

  .image {
    width: 100px;
    height: 100px;
  }

  .auth-button {
    margin: 20px 15px;
    font-size: 16px;
    padding: 2px 16px;
  }
}
</style>
