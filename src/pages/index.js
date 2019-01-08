import Home from './Home';
import ChartDetail from './ChartDetail';
const routes = [
  {
    path: '/',
    name: 'home',
    exact: true,
    component: Home
  },
  {
    path: '/chartdetail/:type',
    name: 'chartdetail',
    component: ChartDetail
  }
];

export default routes;
