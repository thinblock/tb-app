# ThinBlock APP
This app is based on ReactJS 16 with the principles of Progressive Web App (PWA) and Server Side Rendering (SSR). The NodeJS version required for this project is >= v8.0.0 . We're using TypeScript 2.4 in this project so be sure you know some fundamentals of TypeScript before starting with this. Following are the steps to start developing:

## Installation & Starting
We're using `yarn` in this project so please install any package you want with yarn.
```
yarn install
yarn start
```
This will start the development server without Server Side Rendering. If you want to start with SSR you need to make SSR environment variable true. (Following example is for Unix based OS)

`export SSR=true && yarn start`

If you want to build for MOBILE platform, than please also do:

`export MOBILE=true && yarn start`

## Project Structure
We have the following project structure (other files not related to ReactJS omitted):
```
---- src
	---- app
		---- components (all the components which are used in more than 2 modules goes here)
			---- index.ts (one unified way of exporting all the components)
		---- helpers (helper functions used throughout the app goes here)
		---- interfaces (Typescript goodies and validation interfaces goes here)
		---- modules (ReactJS modules goes here, we group them by their Domain, like Authentication etc)
			---- Authentication
			---- Dashboard
		---- models (models for Redux reducers)
			---- counter.ts
		---- pwa (PWA stuff goes here)
		---- redux
			---- reducers (reducers goes here)
			---- reducers.ts (combine reducers from above folder here)
		---- routes
			---- index.ts (all routes goes here)
	---- vendor (all other vendor related exports goes here)
		---- styles
			---- index.scss (global css goes here like importing stuff from node_modules)
```

### 1. Adding New Components
A Component here is basically whatever that we can reuse across modules. You need to add new folder in `src/app/components/MyComponent` along with its `scss`  styles file. Every component has its own `scss` file and it can't contain styles from other components unless those styles are global ones `src/vendor/styles`
After finishing up with your component, you need to export it in `src/app/components/index.ts` file so we have one unified way of exporting our styles.

### 2. Adding Helpers
Helpers are reuseable peices of code which we can reuse throughout the app. You can add helpers in `src/app/helpers` folder.

### 3. Adding Interfaces
This is related to TypeScript. This is for strict type checking of TypeScript if you think something related to typescript interfaces needs to be global you can add it here.

### 4. Adding Modules
This is where all of ReactJS modules go, you can also call them Pages. Everything here in this folder will have its own Route. Defined in `src/app/routes/index.ts`. When adding a module, you need to add its `scss` file in the module folder too.
The modules are grouped by their Domain of work. So for example, `Login` and `Signup` pages can be grouped in `Authentication` folder.

> We have both Mobile and Desktop platform related code in the same project. But sometimes the designs for Mobile and Desktop are gonna be very different.
 
 To Tackle that, we define 3 files when there is need to separate mobile and desktop code.
 - index.ts (this is file where we do conditional based exporting)
 - /Mobile/index.ts (all moblie related stuff goes here)
 - /Desktop/index.ts (all desktop related code goes here)
 
 index.ts e.g

```javascript
let Dashboard: any = null;

if (process.env.MOBILE) {
  const {MobileDashboard} = require('./Mobile');
  Dashboard = MobileDashboard as any;
} else {
  const {DesktopDashboard} = require('./Desktop');
  Dashboard = DesktopDashboard as any;
}

export {
  Dashboard
}
```

### 5. Adding Reducers
The reducers goes into `src/app/redux/reducers` folder. After adding, we combine the reducers in `src/app/redux/reducers.ts`

### 7. Adding Config
If you want to add any API keys or API URLs that are gonna depend on the environment we're in (like development or production) than you can add that in `src/app/config.ts`

### 8. Internationalization

We're using `react-intl` library to manage the translation. Whatever page you want to translate, you need to add `i18n.json` file along with your module files (i.e `index.tsx`) in this json file. You'll add translations according to the following format:
- Underscores instead of camel casing
- Prefix your module's name before your translation like `module_name.label`
```javascript
{
  "en": {
  	"signup_page.heading": "Signup",
    "signup_page.forgot_tip": "Forgot your password?"
  }
}
```
Currenlty we're supporting only `en`. After creating your i18n file. You need to require it in `app/locales.ts` file. e.g
```javascript
const locales = [
  require('./modules/Dashboard/Desktop/i18n.json'),
];
```
And then you're all setup to use the locales in your module like this:
```javascript
import * as React from 'react';
import {FormattedMessage} from 'react-intl';
const style = require('./style.scss');

class SignupPage extends React.Component<any, any> {
  public render() {
    return (
      <div>
        <img src={require('./logo.png')} />
        <p><FormattedMessage id="signup_page.heading" /></p>
      </div>
    );
  }
}

export { Home }
```

For more information about `react-intl` please see [this link](https://github.com/yahoo/react-intl/wiki/API)