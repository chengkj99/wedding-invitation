const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  try {
    let res = ''
    res = await cloud.openapi.security.msgSecCheck({
      content: event.content
    })
    if (res.errCode === '87014') {
      throw new Error('含有违规内容，请重新输入')
    }
    console.log('secCheck res: ', res)
    return res
  } catch (err) {
    console.log('secCheck err', err)
    return err
  }
}
