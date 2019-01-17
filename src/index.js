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

ReactGA.initialize('UA-66176065-33');

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
        window.ga('set', 'page', fullPath + '(fork)');
        window.ga('send', 'pageview', fullPath + '(fork)');
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

  axios
    .get(
      `http://fe.btc.com/wechat/token?url=http://fork-eth-dev.btc.com&name=ethFork&type=json&debug=false`
    )
    .then(res => {
      let errorInfo = 'not error';
      if (res && res.data) {
        let data = res.data;
        errorInfo = JSON.stringify(data);
        console.log(data);
        wx.config = {
          debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert，参数信息会通过log打出。
          appId: 'wxc755b120860aea61', // 必填，公众号的唯一标识
          timestamp: data.wxToken.timestamp, // 必填，生成签名的时间戳
          nonceStr: 'undefined', // 必填，生成签名的随机串
          signature: data.wxToken.signature, // 必填，签名，见附录1
          jsApiList: [
            'onMenuShareTimeline',
            'updateAppMessageShareData',
            'updateTimelineShareData'
          ]
        };
        console.log(wx.config);
        wx.ready(() => {
          errorInfo = 'config ready';
        });

        wx.error(res => {
          errorInfo = JSON.stringify(res);
        });

        wx.onMenuShareTimeline({
          title: '分享测试',
          link: 'https://fork-eth.btc.com',
          imgUrl: 'https://eth.btc.com/ec9cb9684dfff6ebdfb496989d224363.png',
          success: function() {
            errorInfo = 'onMenuShareTimeline success';
            // alert(3);
          },
          cancel: function() {
            errorInfo = 'onMenuShareTimeline cancel';
            // alert(5);
          }
        });
      }
      //document.getElementById('errorInfo').innerText = errorInfo;
    });
  //
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
