import { observable, action } from 'mobx';

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
}

const appStore = new AppStore();

export { appStore };
