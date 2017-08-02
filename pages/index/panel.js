// pages/index/panel.js
Page({
  startDraw: function(e) {
    this.seaya.setStrokeStyle(this.panColor);
    this.seaya.setLineWidth(this.size);
    e = e || window.event;
    this.seaya.beginPath();
    this.seaya.moveTo(e.touches[0].x, e.touches[0].y);
    this.isDraw = true;
  },
  keepDraw: function(e) {
    var self = this;
    if(this.isDraw) {
      this.seaya.lineTo(e.touches[0].x, e.touches[0].y);
      this.seaya.stroke();
      self.seaya.draw(true);
      this.seaya.moveTo(e.touches[0].x, e.touches[0].y);
      // var pretime = wx.getStorageSync('drawtime');
      // var ntime = new Date().getTime();
      // if(pretime) {
      //   if(ntime - pretime >50) {
      //     self.seaya.draw(true);
      //     this.seaya.moveTo(e.touches[0].x, e.touches[0].y);
      //     wx.setStorageSync('drawtime', ntime);
      //   }
      // }
      // else {
      //   wx.setStorageSync('drawtime', ntime);
      // }
    }
  },
  stopDraw: function() {
    this.isDraw = false;
  },
  showErr:function(e) {
    console.error(e.detail.errMsg);
  },
  // 保存到本地相册
  saveToLocal: function() {
    wx.canvasToTempFilePath({
      x: 0,
      y: 0,
      // width: 50,
      // height: 50,
      // destWidth: 100,
      // destHeight: 100,
      canvasId: 'seaya',
      success: (res) => {
        this.nowImage = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: this.nowImage,
          success(result) {
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          }
        })
        console.log(this.nowImage);
      }
    })
  },
  //清空画布
  emptyPannel: function() {
    var _this = this;
    wx.showModal({
      title: '提示',
      content: '确定要清空画布？',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定');
          _this.seaya.clearRect(0, 0, _this.seaya.width, _this.seaya.height);
          _this.seaya.draw();
        } else if (res.cancel) {
          
        }
      }
    })
  },
  changePanColor: function(e) {
    var _this = this;
    this.panColor = e.target.dataset.color;
    this.size = 2;
    this.setData({
      style1: '',
      style2: '',
      style3: '',
      style4: '',
      style5: '',
      style6: '',
      style7: '',
      style8: ''
    })
    switch (e.target.id) {
      case 'color1':
        _this.setData({
          style1: '0 0 8px #000'
        });
        break;
      case 'color2':
        _this.setData({
          style2: '0 0 8px #000'
        }); 
        break;
      case 'color3':
        _this.setData({
          style3: '0 0 8px #000'
        }); 
        break;
      case 'color4':
        _this.setData({
          style4: '0 0 8px #000'
        }); 
        break;
      case 'color5':
        _this.setData({
          style5: '0 0 8px #000'
        }); 
        break;
      case 'color6':
        _this.setData({
          style6: '0 0 8px #000'
        }); 
        break;
      case 'color7':
        _this.setData({
          style7: '0 0 8px #000'
        }); 
        break;
      default:
        _this.setData({
          style1: '0 0 8px #000'
        }); 
    }
  },
  clearPannel: function(e) {
    this.setData({
      style1: '',
      style2: '',
      style3: '',
      style4: '',
      style5: '',
      style6: '',
      style7: '',
      style8: '0 0 8px #000'
    })
    this.panColor = '#ffffff';
    this.size = 5;
  },
  /**
   * 页面的初始数据
   */
  data: {
    seaya: null,
    isDraw: false,
    panColor: '',
    size: 2,
    style1: '0 0 8px #000',
    style2: '',
    style3: '',
    style4: '',
    style5: '',
    style6: '',
    style7: '',
    style8: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // wx.getSetting({
    //   success(res) {
    //     if (!res['scope.writePhotosAlbum']) {
    //       wx.authorize({
    //         scope: 'scope.writePhotosAlbum',
    //         success() {
    //           // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
    //           wx.saveImageToPhotosAlbum()
    //         }
    //       })
    //     }
    //   }
    // })
  
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.seaya = wx.createCanvasContext('seaya');
    this.panColor = '#333333';
    this.size = 2;
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