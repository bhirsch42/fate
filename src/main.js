import Vue from 'vue'
import './plugins/vuetify'
import router from '@/router'
import App from './App.vue'
import Vuetify from 'vuetify'
import { createProvider } from './vue-apollo'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faDiceD6, faEye, faEdit, faArchive, faPlus } from '@fortawesome/free-solid-svg-icons'
import { faGalacticSenate } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faDiceD6);
library.add(faGalacticSenate);
library.add(faEye);
library.add(faEdit);
library.add(faArchive);
library.add(faPlus);

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false;

Vue.use(Vuetify);

new Vue({
	router,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app');
