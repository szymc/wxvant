const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
// 手机号
const isCellphone = val => {
  let patt = /^1[345789]\d{9}$/
  return patt.test(val)
}
// 身份证号
const CheckIdCard = val => {
  var vcity = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  }
  return checkCard(val)
  function checkCard(card) {
    // 是否为空
    if (!card || !isCardNo(card) || !checkProvince(card) || !checkBirthday(card)) {
      // 基本规则校验错误
      return 0
    }
    if (!checkParity(card)) {
      // 校验位验证失败
      return 1
    }
    // 验证通过
    return 2
  }
  // 检查号码是否符合规范，包括长度，类型
  function isCardNo(card) {
    // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
    var reg = /^\d{17}(\d|[xX])$/
    if (reg.test(card) === false) {
      return false
    }
    return true
  };
  // 取身份证前两位,校验省份
  function checkProvince(card) {
    var province = card.substr(0, 2)
    if (vcity[province] === undefined) {
      return false
    }
    return true
  };
  // 检查生日是否正确
  function checkBirthday(card) {
    var len = card.length
    // 身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
    if (len === 15) {
      var refifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/
      var arrdata = card.match(refifteen)
      var year = arrdata[2]
      var month = arrdata[3]
      var day = arrdata[4]
      var birthday = new Date('19' + year + '/' + month + '/' + day)
      return verifyBirthday('19' + year, month, day, birthday)
    }
    // 身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
    if (len === 18) {
      var reeighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|[xX])$/
      var arrdata2 = card.match(reeighteen)
      var year2 = arrdata2[2]
      var month2 = arrdata2[3]
      var day2 = arrdata2[4]
      var birthday2 = new Date(year2 + '/' + month2 + '/' + day2)
      return verifyBirthday(year2, month2, day2, birthday2)
    }
    return false
  };
  // 校验日期
  function verifyBirthday(year, month, day, birthday) {
    var now = new Date()
    var nowyear = now.getFullYear()
    // 年月日是否合理
    if (birthday.getFullYear() === parseInt(year) && (birthday.getMonth() + 1) === parseInt(month) && birthday.getDate() === parseInt(day)) {
      // 判断年份的范围（0岁到100岁之间)
      var time = nowyear - year
      if (time >= 0 && time <= 100) {
        return true
      }
      return false
    }
    return false
  };
  // 校验位的检测
  function checkParity(card) {
    // let x = card.substr(17, 1)
    // return /\d|[xX]/.test(x)
    // 15位转18位
    card = changeFivteenToEighteen(card)
    var len = card.length
    if (len === 18) {
      var arrInt = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
      var arrCh = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
      var cardTemp = 0
      var i
      var valnum
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      valnum = arrCh[cardTemp % 11]
      if (valnum === 'X') {
        if (card.substr(17, 1) === 'x') {
          return true
        }
      }
      if (valnum === card.substr(17, 1)) {
        return true
      }
      return false
    }
    return false
  };
  // 15位转18位身份证号
  function changeFivteenToEighteen(card) {
    if (card.length === 15) {
      var arrInt = new window.Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2)
      var arrCh = new window.Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2')
      var cardTemp = 0
      var i
      card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6)
      for (i = 0; i < 17; i++) {
        cardTemp += card.substr(i, 1) * arrInt[i]
      }
      card += arrCh[cardTemp % 11]
      return card
    }
    return card
  };
}
module.exports = {
  formatTime: formatTime,
  isCellphone: isCellphone,
  CheckIdCard: CheckIdCard
}
