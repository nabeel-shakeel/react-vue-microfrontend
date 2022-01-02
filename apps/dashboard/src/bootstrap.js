import { createApp } from 'vue';
import Dashboard from './app/components/Dashboard';

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(Dashboard);
  app.mount(el);
};

if (process.env.NODE_ENV === 'development') {
  const devRoot = document.querySelector('#_dashboard');
  if (devRoot) {
    mount(devRoot);
  }
}

export { mount };
