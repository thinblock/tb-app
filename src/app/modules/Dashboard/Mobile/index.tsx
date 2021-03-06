import { IState } from 'interfaces/components';
import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { injectIntl } from 'locales';
const { connect } = require('react-redux');
const style = require('./style.scss');
import { FormattedMessage, InjectedIntlProps } from 'react-intl';

interface IMobileDashboardProps extends Partial<InjectedIntlProps> {
  changeRoute?(p: string): any;
}

const initialState = {
  test: false,
};

@injectIntl()
@connect(
  ({weather}) => ({ weather }),
  (dispatch) => ({
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, {allowMultiple: true})
class MobileDashboard extends React.Component<IMobileDashboardProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public render() {
    return (
      <div>
        <h2><FormattedMessage id="dashboard.mobile.hello" /></h2>
      </div>
    ) as React.ReactNode;
  }
}

export { MobileDashboard };
