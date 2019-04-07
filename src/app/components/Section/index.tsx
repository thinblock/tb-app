import * as React from 'react';
import * as CSSModules from 'react-css-modules';
import { Container } from 'react-bootstrap';

const style = require('./style.scss');

interface INavProps {
  children: any;
}

export const Section: React.SFC<INavProps> = CSSModules((props: INavProps) => (
  <div styleName="section__wrap">
    <div styleName="section__jumbotron">
      <Container fluid={true}>
        {props.children}
      </Container>
    </div>
  </div>
), style);
