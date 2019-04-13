import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { getAllAddresses } from 'redux/reducers/address';
import { IAddressAction, IAddress } from 'models/address';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IAddWalletProps {
  addressReducer?: IAddress;
  getAllAddresses?(): Promise<IAddressAction>;
  changeRoute?(p: string): any;
}

const initialState = {
  active: false,
};

@connect(
  (state) => ({ authReducer: state.auth, addressReducer: state.address }),
  (dispatch) => ({
    getAllAddresses: () => dispatch(getAllAddresses()),
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class MonitoredWallets extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public componentDidMount() {
    this.props.getAllAddresses();
  }

  public render() {
    const { addressReducer: { addresses, loading } } = this.props;
    return (
      <React.Fragment>
        <div styleName="monitored_wallets__wrap">
          Monitored Wallets
        </div>
        <br />
        {
          loading ? (
            <div>Loading...</div>
          ) : (
              addresses.map((addressData, i) => {
                return (
                  <div key={i}>
                    {addressData.address}
                  </div>
                );
              })
            )
        }
      </React.Fragment>
    ) as React.ReactNode;
  }
}

export { MonitoredWallets };
