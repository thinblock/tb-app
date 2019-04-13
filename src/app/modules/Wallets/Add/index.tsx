import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { Input, InputTypes } from 'components';
import { Row, Col, Button } from 'react-bootstrap';
import { createAddress } from 'redux/reducers/address';
import { IAddressAction } from 'models/address';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IAddWalletProps {
  createAddress?(address: string): Promise<IAddressAction>;
  changeRoute?(p: string): any;
}

const initialState = {
  active: false,
  address: '',
};

@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    createAddress: (r) => dispatch(createAddress(r)),
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class AddWallet extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public createAddress = () => {
    this.props.createAddress(this.state.address);
  }

  public render() {
    return (
      <div styleName="add_wallet__wrap">
        <p>Add Wallet</p>
        <Row>
          <Col sm={12} md={9}>
            <Input
              id="address"
              placeholder={'Enter address'}
              type={InputTypes.TEXT}
              block={true}
              onChange={(address) => this.setState({ address })}
            />
          </Col>
          <Col sm={12} md={3} >
            <Button
              block={true}
              style={{ margin: '15px 0px', height: '46px' }}
              onClick={this.createAddress}
            >
              Monitor
            </Button>
          </Col>
        </Row>
      </div>
    ) as React.ReactNode;
  }
}

export { AddWallet };
