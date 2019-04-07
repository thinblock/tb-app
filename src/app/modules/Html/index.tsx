import { IStore } from 'redux/IStore';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import * as serialize from 'serialize-javascript';
import ReactModal = require('react-modal');

interface IHtmlProps {
  manifest?: any;
  markup?: string;
  locale?: string;
  store?: Redux.Store<IStore>;
}

ReactModal.setAppElement('#app');

class Html extends React.Component<IHtmlProps, {}> {
  private resolve(files) {
    return files.map((src) => {
      if (!this.props.manifest[src]) { return; }
      return '/public/' + this.props.manifest[src];
    }).filter((file) => file !== undefined);
  }

  public render() {
    const head = Helmet.rewind();
    const { markup, store, locale = '' } = this.props;
    const splittedLocale = locale.toLowerCase().split((/[_-]+/))[0];

    let styles = this.resolve(['vendor.css', 'app.css']);
    const fontsMap = {
      en: ['Montserrat:300,400,600,700', 'Quicksand:300,400,500,700'],
      th: ['Prompt:300,400,500,600,700'],
    };

    styles = fontsMap[splittedLocale].map((f) => `https://fonts.googleapis.com/css?family=${f}`).concat(styles);

    const renderStyles = styles.map((src, i) =>
      <link key={i} rel="stylesheet" type="text/css" href={src} />,
    );

    const scripts = this.resolve(['vendor.js', 'app.js']);
    const renderScripts = scripts.map((src, i) =>
      <script src={src} key={i} />,
    );

    // tslint:disable-next-line:max-line-length
    const initialState = (
      <script
        dangerouslySetInnerHTML={{
          __html: `window.__INITIAL_STATE__=${serialize(store.getState(), { isJSON: true })};`,
        }}
        charSet="UTF-8"
      />
    );

    return (
      <html lang={splittedLocale}>
        <head>
          <meta
            name="viewport"
            content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
          />
          {head.base.toComponent()}
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {head.script.toComponent()}

          {renderStyles}
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="manifest" href="/manifest.webmanifest" />
          {/* <link rel="apple-touch-icon" href="/public/lf-192.png" /> */}
        </head>
        <body>
          <main id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          {initialState}
          {renderScripts}
        </body>
      </html>
    );
  }
}

export { Html };
