export default function register() {
  if ( 'serviceWorker' in navigator ) {
    // The URL constructor is available in all browsers that support SW.
    const publicUrl = new URL(
      process.env.PUBLIC_URL!,
      window.location.toString(),
    );
    if ( publicUrl.origin !== window.location.origin ) {
      // Our service worker won't work if PUBLIC_URL is on a different origin
      // from what our page is served on. This might happen if a CDN is used to
      // serve assets; see https://github.com/facebookincubator/create-react-app/issues/2374
      return;
    }

    window.addEventListener('load', () => {
      registerValidSW();
    });
  }
}

function registerValidSW() {
  navigator.serviceWorker
    .register('/serviceWorker.js', {scope: '.'})
    .then(() => {
      if ( process.env.NODE_ENV === 'development' ) {
        console.log('Service Worker registered');
      }
    })
    .catch((error) => {
      if ( process.env.NODE_ENV === 'development' ) {
        console.error('Error during service worker registration:', error);
      }
    });
}

export function unregister() {
  if ( 'serviceWorker' in navigator ) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister();
    });
  }
}
