import * as React from 'react';
import { IState } from 'interfaces/components';
import * as CSSModules from 'react-css-modules';
import { push } from 'react-router-redux';
import { Input, InputTypes } from 'components';
import { Row, Col, Button } from 'react-bootstrap';
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
class AddWallet extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

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
              onChange={null}
            />
          </Col>
          <Col sm={12} md={3} >
            <Button
              block={true}
              style={{ margin: '15px 0px', height: '46px' }}
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
