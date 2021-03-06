import React from 'react';
import { render } from 'react-dom';
import { Router } from 'react-router-dom';
import { Provider } from 'mobx-react';
import { AppContainer } from 'react-hot-loader';
import { RouterStore, syncHistoryWithStore } from 'mobx-react-router';
import createBrowserHistory from 'history/createBrowserHistory';
//import babelPolyfill from 'babel-polyfill';
import stores from './stores'; //必须引入
import { isProduction } from './utils/constants';
import { dateFormat } from 'utils';
import ReactGA from 'react-ga';
import IntlProviderWrap from './components/IntlProviderWrap';
import App from './App';
import axios from 'axios';

import('./styles/main.scss');

ReactGA.initialize('UA-131353081-13');

//init prototype method
dateFormat();

const renderApp = Component => {
  const browserHistory = createBrowserHistory();
  const routeStore = new RouterStore();
  const history = syncHistoryWithStore(browserHistory, routeStore);

  if (typeof history.listen === 'function' && isProduction) {
    history.listen(location => {
      let firstLevel = location.pathname;
      let secondaryLevel = location.hash;
      let splitArr = location.hash.split('/');
      if (splitArr.length > 2) {
        secondaryLevel = splitArr[0] + '/' + splitArr[1];
      }
      let fullPath = firstLevel + secondaryLevel;
      // Google Analatics
      if (window.ga) {
        window.ga('set', 'page', fullPath);
        window.ga('send', 'pageview', fullPath);
      }

      // Baidu Tongji
      if (_hmt) {
        _hmt.push(['_trackPageview', fullPath]);
      }
    });
  }

  render(
    <AppContainer>
      <Provider store={stores} routing={routeStore}>
        <IntlProviderWrap>
          {/* react router key props for fixing dev bug it should remove when deployed */}
          <Router
            history={history}
            onUpdate={() => {
              window.scrollTo(0, 0);
            }}
          >
            <App />
          </Router>
        </IntlProviderWrap>
      </Provider>
    </AppContainer>,
    document.getElementById('root')
  );

  // function setInfo(s) {
  //   document.getElementById('errorInfo').innerText =
  //     document.getElementById('errorInfo').innerText + s;
  // }

  // axios
  //   .get(
  //     `https://fe.btc.com/wechat/token?url=http://fork-eth-dev.btc.com&name=ethFork&type=json&debug=true`
  //   )
  //   .then(res => {
  //     let errorInfo = '0';
  //     if (res && res.data) {
  //       let data = res.data;
  //       errorInfo = '999';
  //       setInfo(errorInfo);
  //       setInfo(JSON.stringify(data));
  //       console.log(data);
  //       wx.config = {
  //         debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert，参数信息会通过log打出。
  //         appId: 'wxc755b120860aea61', // 必填，公众号的唯一标识
  //         timestamp: data.wxToken.timestamp, // 必填，生成签名的时间戳
  //         nonceStr: 'pzkcwxklw82elvwarv0fp2y9zau0u2xaggrm0nvq0m', // 必填，生成签名的随机串
  //         signature: data.wxToken.signature, // 必填，签名，见附录1
  //         jsApiList: [
  //           'onMenuShareTimeline',
  //           'updateAppMessageShareData',
  //           'updateTimelineShareData'
  //         ]
  //       };
  //       setInfo(JSON.stringify(wx.config));
  //       wx.ready(() => {
  //         setInfo('wx ready');
  //       });

  //       wx.error(res => {
  //         setInfo('wx error');
  //       });

  //       console.log('wx', wx);
  //       wx.onMenuShareTimeline({
  //         title: '以太坊君士坦丁堡升级111 - BTC.com',
  //         link: 'http://fork-eth-dev.btc.com',
  //         imgUrl: 'http://fork-eth-dev.btc.com/static/images/favicon.ico',
  //         success: function() {
  //           errorInfo = '3';
  //           alert('share success');
  //           setInfo(errorInfo);
  //         },
  //         fail: function() {
  //           errorInfo = '4';
  //           alert('share fail');
  //           setInfo(errorInfo);
  //         }
  //       });

  //       wx.ready(function() {
  //         //需在用户可能点击分享按钮前就先调用
  //         wx.updateTimelineShareData({
  //           title: '以太坊君士坦丁堡升级 - BTC.com123', // 分享标题
  //           link: 'http://fork-eth-dev.btc.com', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
  //           imgUrl: 'http://fork-eth-dev.btc.com/static/images/favicon.ico', // 分享图标
  //           success: function() {
  //             errorInfo = '5';
  //             setInfo(errorInfo);
  //           },
  //           fail: function(res) {
  //             errorInfo = '6' + JSON.stringify(res);
  //             setInfo(errorInfo);
  //           }
  //         });
  //       });

  //       // wx.updateTimelineShareData({
  //       //   title: '以太坊君士坦丁堡升级 - BTC.com123',
  //       //   link: 'http://fork-eth-dev.btc.com/',
  //       //   imgUrl: 'http://fork-eth-dev.btc.com/static/images/favicon.ico',
  //       //   success: function() {
  //       //     errorInfo = '5';
  //       //     setInfo(errorInfo);
  //       //   },
  //       //   fail: function(res) {
  //       //     errorInfo = '6' + JSON.stringify(res);
  //       //     setInfo(errorInfo);
  //       //   }
  //       // });

  //       wx.checkJsApi({
  //         jsApiList: ['onMenuShareTimeline', 'updateTimelineShareData'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
  //         success: function(res) {
  //           setInfo('check api success');
  //           // 以键值对的形式返回，可用的api值true，不可用为false
  //           // 如：{"checkResult":{"chooseImage":true},"errMsg":"checkJsApi:ok"}
  //         },
  //         fail: function() {
  //           setInfo('check api fail');
  //         }
  //       });

  //       // wx.updateAppMessageShareData({
  //       //   title: '以太坊君士坦丁堡升级 - BTC.com',
  //       //   link: 'http://fork-eth-dev.btc.com/',
  //       //   imgUrl:
  //       //     'https://fork-eth.btc.com/a95436b65e6d6247f79d9acbe2eebf2f.png',
  //       //   success: function() {
  //       //     errorInfo = '9';
  //       //     setInfo(errorInfo);
  //       //   },
  //       //   fail: function(res) {
  //       //     errorInfo = '10' + JSON.stringify(res);
  //       //     setInfo(errorInfo);
  //       //   }
  //       // });
  //     }
  //   });
};

if (isProduction) {
  window.onload = () => {
    if (!global.Intl) {
      require.ensure(
        [
          'intl',
          'intl/locale-data/jsonp/en.js',
          'intl/locale-data/jsonp/zh.js'
        ],
        function(require) {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          require('intl/locale-data/jsonp/zh.js');
          renderApp(App);
        }
      );
    } else {
      renderApp(App);
    }
  };
} else {
  renderApp(App);
}

if (module.hot) {
  module.hot.accept(() => {
    renderApp(App);
  });
}
