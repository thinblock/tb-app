import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { SignInForm } from './SignInForm';
import { PageHeader as Header } from 'components';
import { Container, Row, Col } from 'react-bootstrap';
const style = require('./style.scss');

const Login = CSSModules(({ history }: { [key: string]: any }) => (
  <div styleName="login__wrap">
    <Container className="container__wrap">
      <Header heading={'THINBLOCK LOGIN'} onCloseRedirect="/" />
      <Row>
        <Col>
          <SignInForm history={history} />
        </Col>
      </Row>
    </Container>
  </div>
), style);

export { Login };
