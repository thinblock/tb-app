import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SignInForm } from './SignInForm';
import { PageHeader as Header } from 'components';
const style = require('./style.scss');

const Login = CSSModules(({ history }: { [key: string]: any }) => (
  <React.Fragment>
    <Header heading={'THINBLOCK'} />
    <div className="container" styleName="container__wrap">
      <div className="row">
        <div className="col-lg-6">
          <SignInForm history={history} />
        </div>
      </div>
    </div>
  </React.Fragment>
), style);

export { Login };
