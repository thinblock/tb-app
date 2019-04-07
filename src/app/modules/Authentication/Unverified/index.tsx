import * as React from 'react';
import * as CSSModules from 'react-css-modules';
const { connect } = require('react-redux');
import { PageHeader as Header, Section } from 'components';
import { logout } from 'redux/reducers/auth';
import { Container, Row, Col, Button } from 'react-bootstrap';
const style = require('./style.scss');

const UnverifiedScreen = ({ logout }: { [key: string]: any }) => (
  <div styleName="unverified__wrap">
    <Container className="container__wrap">
      <Header heading={'VERIFICATION REQUIRED'} onCloseRedirect="/" />
      <Section>
        <Row>
          <Col>
            <p>Please verify your account. A confirmation email has been sent to your email address.</p>
            <p>Once verified, please refresh this page or login again.</p>
            <br />
            <Button
              variant="outline-dark"
              onClick={() => {
                logout();
              }}>
              Back to login
          </Button>
          </Col>
        </Row>
      </Section>
    </Container>
  </div>
);

export const Unverified = connect(
  null,
  (dispatch) => ({ logout: () => dispatch(logout()) }),
)(CSSModules(UnverifiedScreen, style)) as React.SFC<{}>;
