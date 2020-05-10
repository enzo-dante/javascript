import Vue from 'vue';
import Router from 'vue-router';
import Index from './components/Index';
import AddTrip from './components/AddTrip';
import EditTrip from './components/EditTrip';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/add-trip',
      name: 'AddTrip',
      component: AddTrip
    },
    {
      path: '/edit-trip/:trip_slug',
      name: 'EditTrip',
      component: EditTrip
    }
  ]
});
