const cloud = require('wx-server-sdk')
cloud.init()

exports.main = async (event, context) => {
  const { content } = event;
  try {
    let res = ''
    //一次传多个文本，如果有一个不过审，返回审核不通过
    for (let i = 0; i < event.content.length; i++) {

      res = await cloud.openapi.security.msgSecCheck({
        content: event.content[i]
      })

      if (res.errCode == '87014') {
        // 含有违规内容
        return res;
      }
    }
    return res;
  } catch (err) {
    return err;
  }
}
