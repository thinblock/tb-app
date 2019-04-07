import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IAddWalletProps {
  changeRoute?(p: string): any;
}

const initialState = {
  active: false,
};

@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class MonitoredWallets extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public render() {
    return (
      <div styleName="monitored_wallets__wrap">
        Monitored Wallets
      </div>
    ) as React.ReactNode;
  }
}

export { MonitoredWallets };
