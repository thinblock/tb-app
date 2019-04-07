const appConfig = require('../config/main');

import * as e6p from 'es6-promise';
(e6p as any).polyfill();
import 'isomorphic-fetch';

import * as React from 'react';
import * as MobileDetect from 'mobile-detect';
import * as ReactDOMServer from 'react-dom/server';

import { Provider } from 'react-redux';
import { createMemoryHistory, match } from 'react-router';
import { IntlProvider } from 'react-intl';
import { syncHistoryWithStore } from 'react-router-redux';
const { ReduxAsyncConnect, loadOnServer } = require('redux-connect');
import { configureStore } from './app/redux/store';
import routes from './app/routes';
import { getLocaleMessages } from './app/locales';

import { Html } from './app/modules';
const manifest = require('../build/manifest.json');

const express = require('express');
const cookieParser = require('cookie-parser');
const requestLanguage = require('express-request-language');
const path = require('path');
const compression = require('compression');
const Chalk = require('chalk');
const favicon = require('serve-favicon');

const app = express();

app.use(cookieParser());
app.use(compression());
app.use(requestLanguage({
  languages: ['en', 'en-US', 'en-GB'],
  cookie: {
    name: 'language',
    options: { maxAge: 24 * 3600 * 1000 },
    url: '/languages/{language}',
  },
}));

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const webpackConfig = require('../config/webpack/dev');
  const webpackCompiler = webpack(webpackConfig);

  app.use(require('webpack-dev-middleware')(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    stats: { colors: true },
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    historyApiFallback: true,
    quiet: true,
  }));

  app.use(require('webpack-hot-middleware')(webpackCompiler));
}

app.use(favicon(path.join(__dirname, 'public/favicon.ico')));

app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/', express.static(__dirname));

app.get('/set-language/:lang', (req, res) => {
  const lang = req.params.lang;
  if (!lang) {
    res.status(404).send('Not Found?');
  }
  res.redirect(`/languages/${lang}`);
});

app.get('*', (req, res) => {
  const location = req.url;
  const memoryHistory = createMemoryHistory(req.originalUrl);
  const store = configureStore(memoryHistory);
  const history = syncHistoryWithStore(memoryHistory, store);

  match({ history, routes, location },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message);
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        const asyncRenderData = {...renderProps,  store};
        if (appConfig.ssr) {
          const md = new MobileDetect(req.headers['user-agent']);
          const globalTmp = global as any;
          const locale = req.language;
          globalTmp.isMobile = () => !!md.mobile();
          loadOnServer(asyncRenderData).then(() => {
            const markup = ReactDOMServer.renderToString(
              <IntlProvider locale={locale} messages={getLocaleMessages(locale)}>
                <Provider store={store} key="provider">
                  <ReduxAsyncConnect {...renderProps} />
                </Provider>
              </IntlProvider>,
            );
            res.status(200).send(renderHTML(markup, store, locale));
          });
        } else {
          res.sendFile(path.resolve('./build/index.html'), (err) => {console.error(err); });
        }
      } else {
        res.status(404).send('Not Found?');
      }
    });
});

app.listen(appConfig.port, appConfig.host, (err) => {
  if (err) {
    console.error(Chalk.bgRed(err));
  } else {
    console.info(Chalk.black.bgGreen(
      `\n\n💂  Listening at http://${appConfig.host}:${appConfig.port}\n`,
    ));
  }
});

function renderHTML(markup: string, store: any, locale: string) {
  const html = ReactDOMServer.renderToString(
    <Html markup={markup} locale={locale} manifest={manifest} store={store} />,
  );

  return `<!doctype html> ${html}`;
}
