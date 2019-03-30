import { withRouter } from 'react-router';

// Helpers here, reuseable code
export const withRouterDecorator = () => (component) => withRouter(component);
