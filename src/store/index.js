// index.js
import Vue from 'vue'
import Vuex from 'vuex'
import * as state from "./state"

import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Vuex);
Vue.use(Element, { size: 'small' });



import dialog_alert from './dialog.js'
import changeornot from './all_vue.js'
import mutations from './mutations.js'
import action from './action.js'
import getter from './getter.js'

export default new Vuex.Store({
  modules:{
    dialog : dialog_alert,
    change : changeornot,
  },
  mutations,
  action,
  getter

})
