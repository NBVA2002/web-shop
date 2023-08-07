import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/styles/style.css";

import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faCartShopping, faUserSecret, faFilter } from '@fortawesome/free-solid-svg-icons'

library.add(faUserSecret, faCartShopping, faFilter)

createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount("#app");
