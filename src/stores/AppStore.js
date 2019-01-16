import { observable, action } from 'mobx';
import ajax from 'ajax';

class AppStore {
  @observable
  lang;

  @observable
  appTheme;

  constructor() {
    //locale
    this.lang = this.getDefaultLang();
    // utilsSetting
    this.utilsSetting();

    // 微信分享设置
    this.wxSignature();
  }

  utilsSetting() {
    Array.prototype.max = function() {
      return Math.max.apply({}, this);
    };
    Array.prototype.min = function() {
      return Math.min.apply({}, this);
    };
  }

  getDefaultLang() {
    let browserLang = navigator.language || navigator.userLanguage;
    let userSettingLang = null;
    if (localStorage) {
      userSettingLang = localStorage.getItem('lang');
    }

    let defaultLang =
      userSettingLang ||
      (browserLang.substr(0, 2) === 'en' ? 'en-US' : 'zh-CN');
    return defaultLang;
    //return 'en-US';
  }

  @action
  setLocaleLang(lang) {
    this.lang = lang;
    if (localStorage) {
      localStorage.setItem('lang', lang);
    }
  }
  @action
  setAppLocale(appLocale) {
    this.appLocale = appLocale;
  }

  //
  @action
  wxSignature = async () => {
    //this.isFinishedQuery = false;

    const res = await ajax.get(
      `http://fe.btc.com/wechat/token?url=https://fork-eth.btc.com&name=ethFork&type=json&debug=true`
    );
    this.isFinishedQuery = true;
    if (res && res.data) {
      runInAction(() => {
        console.log('res', res);
        wx.config = {
          debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert，参数信息会通过log打出。
          appId: 'wxd5b42c7a0f3817bf', // 必填，公众号的唯一标识
          timestamp: res.timestamp, // 必填，生成签名的时间戳
          nonceStr: 'undefined', // 必填，生成签名的随机串
          signature: res.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'onMenuShareAppMessage',
            'onMenuShareQQ',
            'onMenuShareWeibo',
            'onMenuShareQZone',
            'scanQRCode'
          ]
        };

        wx.ready(function() {
          //需在用户可能点击分享按钮前就先调用
          wx.updateAppMessageShareData({
            title: '分享测试', // 分享标题
            desc: '这是微信分享测试', // 分享描述
            link: 'https://fork-eth.btc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://eth.btc.com/ec9cb9684dfff6ebdfb496989d224363.png', // 分享图标
            success: function() {
              // 设置成功
            }
          });

          wx.updateTimelineShareData({
            title: '分享测试2', // 分享标题
            link: 'https://fork-eth.btc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: 'https://eth.btc.com/ec9cb9684dfff6ebdfb496989d224363.png', // 分享图标
            success: function() {
              // 设置成功
            }
          });
        });
      });
    }
  };
  //
}

const appStore = new AppStore();

export { appStore };
