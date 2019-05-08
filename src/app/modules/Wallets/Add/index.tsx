import * as React from 'react';
import { IState } from 'interfaces/components';
import { Picker, Emoji } from 'emoji-mart';
import * as CSSModules from 'react-css-modules';
import styled from 'styled-components';
import { push } from 'react-router-redux';
import { Row, Col, Button, Dropdown, FormControl, InputGroup } from 'react-bootstrap';
import { createAddress } from 'redux/reducers/address';
import { IAddressAction } from 'models/address';
const { connect } = require('react-redux');
const style = require('./style.scss');

interface IAddWalletProps {
  createAddress?(address: string, emoji: string): Promise<IAddressAction>;
  changeRoute?(p: string): any;
}

const initialState = {
  active: false,
  address: '',
  showEmojiPicker: false,
  selectedEmoji: {
    id: 'grinning',
  } as any,
};

const ColWrap = styled(Col)`
  &&& {
    margin-top: 10px;
    padding: 0px 8px;
  }
`;

const pickerStyle = {
  width: '338px',
  position: 'absolute',
  top: '100%',
  left: '0px',
  zIndex: '99',
};

@connect(
  (state) => ({ authReducer: state.auth }),
  (dispatch) => ({
    createAddress: (r, s) => dispatch(createAddress(r, s)),
    changeRoute: (r) => dispatch(push(r)),
  }),
)
@CSSModules(style, { allowMultiple: true })
class AddWallet extends React.Component<IAddWalletProps, typeof initialState> {
  public state: IState<typeof initialState> = initialState;

  public createAddress = () => {
    this.props.createAddress(this.state.address, this.state.selectedEmoji.id);
  }

  public render() {
    const { showEmojiPicker, selectedEmoji } = this.state;

    return (
      <div styleName="add_wallet__wrap">
        <p>Add Wallet</p>
        <Row className="justify-content-md-center">
          <ColWrap sm={12} md={'auto'}>
            <Dropdown className="mb-3">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                ETH
              </Dropdown.Toggle>
              <Dropdown.Menu alightRight={true}>
                <Dropdown.Item href="#/action-1">ETH</Dropdown.Item>
                <Dropdown.Item href="#/action-2">BTC</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </ColWrap>
          <ColWrap sm={12} md={8}>
            <InputGroup className="mb-3">
              <InputGroup.Prepend
                onMouseEnter={() => this.setState({showEmojiPicker: true })}
                onMouseLeave={() => this.setState({showEmojiPicker: false })}
                onClick={() => this.setState({showEmojiPicker: !this.state.showEmojiPicker})}
              >
                <InputGroup.Text id="basic-addon1">
                  <Emoji emoji={selectedEmoji.id} set="apple" size={22} />
                </InputGroup.Text>
                {
                  showEmojiPicker && (
                    <Picker set="apple" style={pickerStyle}
                    onSelect={(emoji: any) => this.setState({ selectedEmoji: emoji })} />
                  )
                }
              </InputGroup.Prepend>
              <FormControl
                required={true}
                placeholder="Enter address"
                aria-label="Username"
                aria-describedby="basic-addon1"
                onChange={(e: any) => this.setState({ address: e.target.value })}
              />
              <FormControl.Feedback type="invalid">
                Please choose a valid address.
              </FormControl.Feedback>
            </InputGroup>
          </ColWrap>
          <ColWrap sm={12} md={'auto'} >
            <Button
              className="mb-3"
              block={true}
              disabled={!this.state.address || !/^0x[a-fA-F0-9]{40}$/g.test(this.state.address)}
              onClick={this.createAddress}
            >
              Monitor
            </Button>
          </ColWrap>
        </Row>
      </div>
    ) as React.ReactNode;
  }
}

export { AddWallet };
