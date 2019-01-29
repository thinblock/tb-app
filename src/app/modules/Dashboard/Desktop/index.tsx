import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { FormattedMessage } from 'react-intl';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IDesktopDashboardProps {
  changeRoute(p: string): any;
}

const initialState = {
  active: false,
};

@connect(
  () => ({ }),
  (dispatch) => ({
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, {allowMultiple: true})
class DesktopDashboard extends React.Component<IDesktopDashboardProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public render() {
    return (
      <div>
        <h1><FormattedMessage id="dashboard.desktop.hello" /></h1>
      </div>
    ) as React.ReactNode;
  }
}

export {
  DesktopDashboard
}
