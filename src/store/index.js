import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import auth from './modules/auth';
import document from './modules/document';
import user from './modules/user';
// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
    modules: {
        auth: auth,
        document: document,
        user: user
    },
    plugins: [createPersistedState()]
});