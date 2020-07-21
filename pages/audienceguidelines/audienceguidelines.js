// pages/audienceguidelines/audienceguidelines.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmlSnip:"",
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    const htmlSnip =
    `
    <p>新冠肺炎疫情防控期间上海博物馆网络实名预约参观须知</p><p><br></p><p>春风吹拂花正艳，我馆将于3月13日起恢复对外开放。为切实做好疫情防控工作，我馆将实行网络实名制预约参观，具体办法如下:</p><p><br></p><p>1）开放时间9:00-17:00（16:00停止入场）；每周一闭馆(除国定假日外)。</p><p><br></p><p>2）目前仅接受散客（个人）预约，每日限额2000人。所有观众（包括儿童）必须通过网络实名制预约。</p><p><br></p><p>3）观众可提前3日（含当天）通过上海博物馆官网、微信公众号预约。</p><p><br></p><p>4）每个预约订单只能预约 1人，每张身份证件每天限约1次，请务必截屏保存预约二维码。</p><p><br></p><p>5）参观当日，须出示本人预约登记时使用的有效证件原件、本人预约二维码，同时须提供本人实时“随申码”，显示绿色方可入馆。儿童也必须获取“随申码”。70岁以上老人、残障人士以及现役军人、医务工作者等，在确保“两码一证”前提下，凭相关证件，由工作人员引导优先入馆。</p><p><br></p><p>6）请您务必按预约时间段到馆参观，如错过预约时间段将谢绝入馆。为避免排队时间过长或人员过于密集，建议勿早于预约时段前15分钟到达候场。</p><p><br></p><p>7）如不能按期参观，请至少提前2小时取消预约。未提前取消导致爽约两次以上者，账号将被列入诚信黑名单，将在7个开放日内冻结其预约资格。</p><p><br></p><p>8）观众须全程佩戴口罩，排队和观展时请保持1.5米以上距离，避免聚集；入馆前须接受体温测量，如有体温异常（≥37.3℃）,或有咳嗽、气促等异常现象的观众谢绝入馆。</p><p><br></p><p>9）疫情防控期间，建议观众参观时间控制在2小时内，以免造成封闭场所人员聚集。</p><p><br></p><p>10）疫情防控期间，我馆瞬时接待量不超过300人，当遇到馆内人员密度较大时，我馆将根据具体情况采取控制入馆速度等措施，敬请谅解。</p><p><br></p><p>11）如有疑问请拨打咨询电话：021—63723500转132分机。</p><p><br></p><p>我馆将全力落实防控措施，保障疫情防控期间对外开放的安全、有序，也期待全体观众、市民和我们一起做好防控工作，遵守规定，文明观展，让特殊时期的博物馆同样绽放智慧、文明之光</p>
    `
    this.setData({
      htmlSnip:htmlSnip
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})