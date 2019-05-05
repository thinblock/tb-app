import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { Emoji } from 'emoji-mart';
import ReactTable from 'react-table';
import { getAllAddresses, removeAddress } from 'redux/reducers/address';
import { IAddressAction, IAddress } from 'models/address';
import { Button } from 'react-bootstrap';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IAddWalletProps {
  addressReducer?: IAddress;
  getAllAddresses?(): Promise<IAddressAction>;
  removeAddress?(address: string): Promise<IAddressAction>;
  changeRoute?(p: string): any;
}

const initialState = {
  active: false,
};

@connect(
  (state) => ({ authReducer: state.auth, addressReducer: state.address }),
  (dispatch) => ({
    getAllAddresses: () => dispatch(getAllAddresses()),
    removeAddress: (r: string) => dispatch(removeAddress(r)),
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class MonitoredWallets extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  private columns = [{
    Header: 'Network',
    accessor: 'network',
    width: 80,
  },
  {
    Header: '',
    accessor: 'emoji',
    Cell: (props) => <Emoji emoji={props.value} set="apple" size={22} />,
    width: 60,
    style: { textAlign: 'center' },
  }, {
    Header: 'Wallet',
    accessor: 'address',
  }, {
    Header: 'Balance',
    width: 100,
    accessor: 'balance',
  }, {
    Header: 'Actions',
    accessor: 'id',
    width: 120,
    Cell: (props) => (
      <Button block={true} onClick={() => this.removeAddress(props.value)}>
        Remove
      </Button>
    ),
    style: { textAlign: 'right' },
  }];

  public componentDidMount() {
    this.props.getAllAddresses();
  }

  public removeAddress = (address: string) => {
    this.props.removeAddress(address);
  }

  public render() {
    const { addressReducer: { addresses, loading } } = this.props;
    return (
      <React.Fragment>
        <div styleName="monitored_wallets__wrap">
          Monitored Wallets
        </div>
        <br />
        <ReactTable
          loading={loading}
          data={addresses}
          columns={this.columns}
          minRows={0}
          sortable={false}
          showPagination={false}
          showPageSizeOptions={false}
        />
      </React.Fragment>
    ) as React.ReactNode;
  }
}

export { MonitoredWallets };
